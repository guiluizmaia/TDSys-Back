import { ITalhaoRepository, TalhaoDtos } from "src/modules/talhao/repositories/ITalhaoRepository";
import { getRepository, Repository } from "typeorm";
import { Talhao } from "../entities/Talhao";

class TalhaoRepository implements ITalhaoRepository{
    private repository: Repository<Talhao>;

    constructor(){
        this.repository = getRepository(Talhao);
    }    

    async searchByName(name: String): Promise<Talhao[]> {
        return this.repository.createQueryBuilder()
        .select()
        .where('name ILIKE :searchTerm', {searchTerm: `%${name}%`})
        .getMany()
    }

    async findById(id: String): Promise<Talhao | undefined> {
        return this.repository.findOne({where: {id}})
    }

    async create(talhao: TalhaoDtos): Promise<Talhao> {
        talhao.name = talhao.name.trim();
        const create = this.repository.create(talhao);
        return this.repository.save(create);
    }

    async save(talhao: Talhao): Promise<Talhao> {
        if(talhao.name)
            talhao.name = talhao.name.trim();
        return this.repository.save(talhao);
    }

    async index(skip?: number | undefined, take?: number | undefined): Promise<Talhao[]> {
        return this.repository.find({
            skip,
            take,
        })
    }

    async count(): Promise<number> {
        return this.repository.count();
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export default TalhaoRepository