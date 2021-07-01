import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PrinterService } from "src/printer/services/printer.service";
import { Repository } from "typeorm";
import { CreateErrCodeDto, CreateErrCodeResultDto } from "./dtos/create-err-code.dto";
import { CreateErrDto, CreateErrResultDto } from "./dtos/create-err.dto";
import { DeleteErrCodeDto, DeleteErrCodeResultDto } from "./dtos/delete-err-code.dto";
import { DeleteErrDto, DeleteErrResultDto } from "./dtos/delete-err.dto";
import { GetErrCodesResultDto } from "./dtos/get-err-codes.dto";
import { GetErrsResultDto } from "./dtos/get-errs.dto";
import { UpdateErrCodeDto, UpdateErrCodeResultDto } from "./dtos/update-err-code.dto";
import { ErrCode } from "./entities/err-code.entity";
import { Err } from "./entities/err.entity";

@Injectable()
export class ErrService {
    
    constructor(
        @InjectRepository(Err) 
        private readonly errRepository: Repository<Err>,

        @InjectRepository(ErrCode) 
        private readonly errCodeRepository: Repository<ErrCode>,

        private readonly printerService: PrinterService,
    ) {}

    async createErrCode(
        { code, name }: CreateErrCodeDto
    ): Promise<CreateErrCodeResultDto> {
        try {
            console.log("inininiinin");
            const exist = await this.errCodeRepository.findOne({
                where: [
                    {code}, {name}
                ]
            });
            if(exist) {
                return { ok:false, error: "Err code already exist" }
            }
            await this.errCodeRepository.save(
                this.errCodeRepository.create({ code, name })
            );
            return {
                ok: true
            }
        } catch(error) {
            return { ok:false, error: "Couldn't create err code" };
        }
    }

    async getErrCodes(): Promise<GetErrCodesResultDto> {
        try {
            const errCodes = await this.errCodeRepository.find();
            if(errCodes.length <= 0) {
                return { ok: false, error: "Err code not found" }
            }
            return {
                ok: true,
                errCodes
            }
        } catch(error) {
            return { ok: false, error: "Couldn't get err codes" };
        }
    }

    async updateErrCode(
        updateErrCodeDto: UpdateErrCodeDto
    ): Promise<UpdateErrCodeResultDto> {
        try {
            const errCode = await this.errCodeRepository.findOne(
                updateErrCodeDto.id
            );
            if(!errCode) {
                return { ok:false, error: "Err code not found" }
            }
            await this.errCodeRepository.update(errCode.id, {
                ...errCode,
                ...updateErrCodeDto,
            });
            return {
                ok: true
            }
        } catch(error) {
            return { ok:false, error: "Couldn't update err code" }
        }
    }

    async deleteErrCode(
        { id }: DeleteErrCodeDto
    ): Promise<DeleteErrCodeResultDto> {
        try {
            const errCode = await this.errCodeRepository.findOne(id);
            if(!errCode) {
                return { ok:false, error: "Err code not found" }
            }
            await this.errCodeRepository.delete(id);
            return {
                ok: true
            }
        } catch(error) {
            return { ok:false, error: "Couldn't delete err code" }
        }
    }

    async createErr(
        { printerId, errCodeId }: CreateErrDto
    ): Promise<CreateErrResultDto> {
        try {
            const result = await this.printerService.getPrinter(printerId);
            if(!result.ok) {
                return result;
            }
            const { printer } = result;

            const errCode = await this.errCodeRepository.findOne(errCodeId);
            if(!errCode) {
                return { ok: false, error: "Err code not found" }
            }
            await this.errRepository.save(
                this.errRepository.create({ printer, errCode })
            );
            return {
                ok: true,
            }
        } catch(error) {
            return { ok: false, error: "Couldn't create err" }
        }
    }

    async getErrs(
        printerId: number
    ): Promise<GetErrsResultDto> {
        try {
            const result = await this.printerService.getPrinter(printerId);
            if(!result.ok) {
                return result;
            }
            const { printer } = result;
            const errs = await this.errRepository.find({
                relations: ["printer", "errCode"],
                where: { printer },
                select: ["id", "datetime", "errCode", "printer"],
            });
            if(errs.length <= 0) {
                return { ok:false, error: 'Errs not found'}
            }
            return {
                ok: true,
                errs
            }
        } catch(error) {
            return { ok:false, error: "Couldn't get errs" }
        }
    }

    async deleteErr(
        { id }: DeleteErrDto
    ): Promise<DeleteErrResultDto> {
        try {
            const err = await this.errRepository.findOne(id);
            if(!err) {
                return { ok: false, error: "Err not found" }
            }
            await this.errRepository.delete(id);
            return {
                ok: true
            }
        } catch(error) {
            return { ok: false, error: "Couldn't delete err" };
        }
    }
}