import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePrinterErrorCodeDto, CreatePrinterErrorCodeResultDto } from "../dtos/printer-error-code/create-printer-error-code.dto";
import { DeletePrinterErrorCodeDto, DeletePrinterErrorCodeResultDto } from "../dtos/printer-error-code/delete-printer-error-code.dto";
import { GetPrinterErrorCodesResultDto } from "../dtos/printer-error-code/get-printer-error-codes.dto";
import { UpdatePrinterErrorCodeDto, UpdatePrinterErrorCodeResultDto } from "../dtos/printer-error-code/update-printer-error-code.dto";
import { PrinterErrorCode } from "../entities/printer-error-code.entity";

@Injectable()
export class PrinterErrorCodeService {

    constructor(
        @InjectRepository(PrinterErrorCode)
        private readonly printerErrorCodeRepository: Repository<PrinterErrorCode>,
    ) {}

    async createPrinterErrorCode(
        { code, detail }: CreatePrinterErrorCodeDto
    ): Promise<CreatePrinterErrorCodeResultDto> { 
        try {
            const errorCode = await this.printerErrorCodeRepository.findOne({ 
                where: {code}
            });
            if(errorCode) {
                return { ok: false, error: "The Code already exist" }
            }
            await this.printerErrorCodeRepository.save(
                this.printerErrorCodeRepository.create({
                    code,
                    detail
                })
            );
            return {
                ok: true
            }
        } catch(error) {
            return { ok: false, error: "Couldn't create printer error code" }
        }
    }

    async getPrinterErrorCodes(): Promise<GetPrinterErrorCodesResultDto> {
        try {
            const errorCodes = await this.printerErrorCodeRepository.find();
            if(errorCodes.length <= 0) {
                return { ok: false, error: "Printer error codes not found" }
            }
            return { 
                ok: true,
                errorCodes
            }
        } catch(error) {
            return { ok: false, error: "Couldn't get printer error codes" }
        }
    }

    async updatePrinterErrorCode(
        updatePrinterErrorCodeDto: UpdatePrinterErrorCodeDto
    ): Promise<UpdatePrinterErrorCodeResultDto> {
        try {   
            const errorCode = await this.printerErrorCodeRepository.findOne(
                updatePrinterErrorCodeDto.id
            );
            if(!errorCode) {
                return { ok: false, error: "Printer error code not found" }
            }
            await this.printerErrorCodeRepository.update(
                updatePrinterErrorCodeDto.id, 
                { ...updatePrinterErrorCodeDto }
            );
            return { 
                ok: true
            }
        } catch(error) {
            return { ok: false, error: "Couldn't update printer error code" }
        }
    }

    async deletePrinterErrorCode(
        { id }: DeletePrinterErrorCodeDto
    ): Promise<DeletePrinterErrorCodeResultDto> {
        try {
            const errorCode = await this.printerErrorCodeRepository.findOne(
                id
            );
            if(!errorCode) {
                return { ok: false, error: "Printer error code not found" }
            }
            await this.printerErrorCodeRepository.delete(id);
            return {
                ok: true
            }
        } catch(error) {
            return { ok: false, error: "Couldn't delete printer error code" }
        }
    }
}