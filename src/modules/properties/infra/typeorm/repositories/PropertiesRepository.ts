import { IPropertiesRepository, PropertiesDtos } from "src/modules/properties/repositories/IPropertiesRepository";
import { getRepository, Repository } from "typeorm";
import { Properties } from "../entities/Properties";

class PropertiesRepository implements IPropertiesRepository {
    private repository: Repository<Properties>;

    constructor(){
        this.repository = getRepository(Properties);
    }
    
    async searchByName(name: String): Promise<Properties[]> {
        return this.repository.createQueryBuilder()
        .select()
        .where('name ILIKE :searchTerm', {searchTerm: `%${name}%`})
        .getMany()
    }

    async findById(id: String): Promise<Properties | undefined> {
        return this.repository.findOne({where: {id}})
    }

    async create(Properties: PropertiesDtos): Promise<Properties> {
        Properties.name = Properties.name.trim();
        const create = this.repository.create(Properties);
        return this.repository.save(create);
    }

    async save(properties: Properties): Promise<Properties> {
        if(properties.name)
            properties.name = properties.name.trim();
        
        return this.repository.save(properties);
    }

    async index(skip?: number | undefined, take?: number | undefined): Promise<Properties[]> {
        return this.repository.find({
            skip,
            take,
        })
    }

    async count(): Promise<number> {
        return this.repository.count();
    }
    
    async delete(id: string): Promise<void> {
        await this.repository.query(`
            DELETE FROM property_addresses p
            WHERE p."propertyId" = '${id}'
        `)

        
        await this.repository.delete(id);
    }
}

export default PropertiesRepository;