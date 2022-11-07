import { applicationDto, IApplicationRepository } from "src/modules/inventory/repositories/IApplicationRepository";
import { getRepository, Repository } from "typeorm";
import { Application } from "../entities/Application";

class ApplicationRepository implements IApplicationRepository {
    private repository: Repository<Application>;

    constructor(){
        this.repository = getRepository(Application);
    }

    async create(application: applicationDto): Promise<Application> {
        const create = this.repository.create(application);
        return this.repository.save(create)
    }

    async save(application: Application): Promise<Application> {
        return this.repository.save(application);
    }

    async index(skip?: number | undefined, take?: number | undefined): Promise<Application[]> {
        return this.repository.find({
            skip,
            take
        })
    }
    
    async count(): Promise<number> {
        return this.repository.count();
    }
    
    async findProductByProductId(id: string): Promise<Application[]> {
        return this.repository.find({where: {productId: id}})
    }

    async findProductByTalhaoId(id: string): Promise<Application[]> {
        return this.repository.find({where: {talhaoId: id}})
    }

    async findById(id: string): Promise<Application | undefined> {
        return this.repository.findOne(id)
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export default ApplicationRepository;