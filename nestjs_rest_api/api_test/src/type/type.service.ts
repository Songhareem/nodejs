import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudReq } from "src/common/enums/crud-req.enum";
import { User } from "src/users/entities/user.entity";
import { Connection, Repository } from "typeorm";
import { ConfirmTypeReqDto, ConfirmTypeReqResultDto } from "./dtos/confitm-type-req.dto";
import { CreateTypeReqDto, CreateTypeReqResultDto } from "./dtos/create-type-req.dto";
import { CreateTypeDto, CreateTypeResultDto } from "./dtos/create-type.dto";
import { DeleteTypeReqDto, DeleteTypeReqResultDto } from "./dtos/delete-type-req.dto";
import { DeleteTypeDto, DeleteTypeResultDto } from "./dtos/delete-type.dto";
import { GetTypeReqsResultDto } from "./dtos/get-types-req.dto";
import { GetTypesResultDto } from "./dtos/get-types.dto";
import { UpdateTypeDto, UpdateTypeResultDto } from "./dtos/update-type.dto";
import { getTypekindNum, getTypekindString, Type, TypeKind, TypeReq } from "./entities/type.entity";

@Injectable()
export class TypeService {

    constructor(
        private readonly connection: Connection,

        @InjectRepository(Type)
        private readonly typeRepository: Repository<Type>,

        @InjectRepository(TypeReq)
        private readonly typeReqRepository: Repository<TypeReq>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createType(
        { name, kind }: CreateTypeDto
    ): Promise<CreateTypeResultDto> {
        try {
            const type = await this.typeRepository.save(
                this.typeRepository.create({ name, kind })
            );
            return {
                ok: true,
                type
            };
        } catch (error) {
            return {ok: false, error}
        }
    }

    async getTypes(
        kind: string,
    ): Promise<GetTypesResultDto> {
        try {
            const kindNum = getTypekindNum(kind);
            const types = await this.typeRepository.find({
                where: {kind: kindNum}
            });
            if(types.length <= 0) {
                return { ok: false, error: "Types not found" }
            }
            return {
                ok: true,
                types
            }
        } catch(error) {
            return { ok: false, error: "Couldn't get types" }
        }
    }

    async updateType(
        { id, name }: UpdateTypeDto,
    ): Promise<UpdateTypeResultDto> {
        try {
            const exist = await this.typeRepository.findOne(id);
            if(!exist) {
                return { ok: false, error: "Type not found" }
            }
            await this.typeRepository.update(id, {
                name: name? name : exist.name
            });
            return { ok: true }
        } catch(error) {
            return { ok: false, error: "Couldn't update type" }
        }
    }

    async deleteType(
        { id }: DeleteTypeDto
    ): Promise<DeleteTypeResultDto> {
        try {
            const exist = await this.typeRepository.findOne(id);
            if(!exist) {
                return { ok: false, error: "Type not found" }
            }
            await this.typeRepository.delete(id);
        } catch(error) {
            return { ok:false, error:"Couldn't delete type" }
        }
    }

    // request
    async createTypeReq(
        userId: number, 
        createTypeReqDto: CreateTypeReqDto
    ): Promise<CreateTypeReqResultDto> {
        try {
            const exist = await this.typeReqRepository.findOne({
                where: { ...createTypeReqDto }
            });
            if(exist) {
                return { ok: false, error: "Request already exist"}
            }
            const user = await this.userRepository.findOne(userId);
            if(!user) {
                return { ok: false, error: "User not found"}
            }
            const typeReq = await this.typeReqRepository.save(
                this.typeReqRepository.create({
                    ...createTypeReqDto,
                    user
                })
            )
            return {
                ok: true,
                typeReq
            }
        } catch(error) {
            return { ok: false, error: "Couldn't create type request" }
        }
    }

    async getTypeReqs(
        kind: string, 
        crud: string, 
    ): Promise<GetTypeReqsResultDto> {
        try {
            const typeReqs = await this.typeReqRepository.find({
                where:{ kind, crud }
            })
            if(typeReqs.length <= 0) {
                return { ok: false, error: "Type requests not found"}
            }
            return {
                ok: true,
                typeReqs
            }
        } catch(error) {
            return { ok: false, error: "Couldn't get type requsets"}
        }
    }

    async deleteTypeReq(
        { id }: DeleteTypeReqDto
    ): Promise<DeleteTypeReqResultDto> {
        try {
            const typeReq = await this.typeReqRepository.findOne(id);
            if(!typeReq) {
                return { ok: false, error: "Type request not found" }
            }
            await this.typeReqRepository.delete(typeReq);
            return {
                ok: true
            }
        } catch(error) {
            return { ok: false, error: "Couldn't delete type requset" }
        }
    }

    // 트랜젝션 사용
    async confirmTypeReq(
        { id }: ConfirmTypeReqDto
    ): Promise<ConfirmTypeReqResultDto> {

        const queryRunner = this.connection.createQueryRunner();
        
        const typeReq = await this.typeReqRepository.findOne(id);
        if(!typeReq) {
            return { ok: false, error: "Type request not found" }
        }
        const { id: typeReqId , name, kind, crud } = typeReq;

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            switch(crud) {
                case CrudReq.Create: { 
                    await queryRunner.manager.save(Type,
                        queryRunner.manager.create(Type, { name, kind })
                    );    
                } break;
                case CrudReq.Update: {
                    const [oldName, newName] = name.split(',');
                    const type = await this.typeRepository.findOne({name: oldName});
                    if(!type) {
                        throw new Error();
                    }
                    await queryRunner.manager.update(Type, type.id, {name: newName});
                } break;
                case CrudReq.Delete: {
                    const type = await this.typeRepository.findOne({name});
                    await queryRunner.manager.delete(Type, type.id);
                } break;
                default: 
                    throw new Error();
            }

            await queryRunner.manager.delete(TypeReq, { id: typeReqId });

            await queryRunner.commitTransaction();
            return { ok: true }
        } catch(error) {
            await queryRunner.rollbackTransaction();
            return { ok: false, error: "Couldn't confirm type request" }
        } finally {
            await queryRunner.release();
        }
    }

    // 내부 함수
    async getTypeById(id: number) {
        try {
            const type = await this.typeRepository.findOne(id);
            if(!type) {
                return { ok:false, error: "Type not found" }   
            }
            return { ok:true, type }
        } catch {
            return {ok: false, error: "Couldn't get type"}
        }    
    }
}