import { flatten, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePrinterCountDto, CreatePrinterCountResultDto } from "../dtos/printer-count/create-printer-count.dto";
import { DeletePrinterCountDto, DeletePrinterCountResultDto } from "../dtos/printer-count/delete-printer-count.dto";
import { GetPrinterCountResultDto } from "../dtos/printer-count/get-printer-count.dto";
import { GetPrinterCountsResultDto } from "../dtos/printer-count/get-printer-counts.dto";
import { UpdatePrinterCountDto, UpdatePrinterCountResultDto } from "../dtos/printer-count/update-printer-count.dto";
import { PrinterCount } from "../entities/printer-count.entity";
import { Printer } from "../entities/printer.entity";
import { PrinterService } from "./printer.service";

@Injectable()
export class PrinterCountService {
    constructor(
        @InjectRepository(PrinterCount)
        private readonly printerCountRepository: Repository<PrinterCount>,

        @InjectRepository(Printer)
        private readonly printerRepository: Repository<Printer>,
    ) {}

    async createPrinterCount(
        { printerId, count }: CreatePrinterCountDto
    ): Promise<CreatePrinterCountResultDto> {
        try {
            const printer = await this.printerRepository.findOne(printerId);
            if(!printer) {
                return { ok: false, error: "Printer not found" }
            }
            const printerCount = await this.printerCountRepository.findOne(printerId);
            if(printerCount) {
                return { ok: false, error: "Printer count already exist" }
            }
            await this.printerCountRepository.save(
                this.printerCountRepository.create({ count, printer })
            );
            return {
                ok: true
            }
        } catch(error) {
            return { ok: false, error: "Couldn't create printer count" }
        }
    }

    async getPrinterCounts(): Promise<GetPrinterCountsResultDto> {
        try {
            console.log("아브라카다브라")
            const printerCounts = await this.printerCountRepository.find();
            console.log(printerCounts);
            if(printerCounts.length <= 0) {
                return { ok:false, error:"Printer counts not found" }
            }
            return {
                ok: true,
                printerCounts
            }
        } catch(error) {
            return { ok:false, error: "Couldn't get printer counts" }
        }
    }

    async getPrinterCount(
        printerId: number
    ): Promise<GetPrinterCountResultDto> {
        try {
            const printerCount = await this.printerCountRepository.findOne(printerId,{
                relations: ["printer"],
                select: ["id","printer","count","createAt","updateAt"],
            });
            if(!printerCount) {
                return { ok: false, error: "Printer count not found" }
            }
            return {
                ok: true,
                printerCount
            }
        } catch(error) {
            return { ok:false, error: "Couldn't get printer count" }
        }
    }

    async updatePrinterCount(
        { id, count }: UpdatePrinterCountDto
    ): Promise<UpdatePrinterCountResultDto> {
        try {
            const printerCount = await this.printerCountRepository.findOne(id, {
                relations: ["printer"],
                select: ["id", "createAt", "updateAt", "count", "printer"],
            });
            console.log(printerCount);
            if(!printerCount) {
                return { ok: false, error: "Printer count not found" }
            }
            await this.printerCountRepository.update(printerCount.id,{
                ...printerCount,
                count
            });
            return {
                ok: true
            }
        } catch(error) {
            console.log(error);
            return { ok:false, error: "Couldn't update printer count" }
        }
    }

    async deletePrinterCount(
        { id }: DeletePrinterCountDto
    ): Promise<DeletePrinterCountResultDto> {
        try {
            const printerCount = await this.printerCountRepository.findOne(id);
            if(!printerCount) {
                return { ok: false, error: "Printer count not found" }
            }
            await this.printerCountRepository.delete(id);
            return { 
                ok: true
            }
        } catch(error) {
            return { ok:false, error: "Couldn't delete printer count" }
        }
    }
}