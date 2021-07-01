import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudReq as Crud } from "src/common/enums/crud-req.enum";
import { Type, TypeKind } from "src/type/entities/type.entity";
import { TypeService } from "src/type/type.service";
import { UsersService } from "src/users/users.service";
import { Connection, getRepository, Repository } from "typeorm";
import { ConfirmPrinterReqDto, ConfirmPrinterReqResultDto } from "../dtos/printer/confirm-printer-req.dto";
import { CreatePrinterReqDto, CreatePrinterReqResultDto } from "../dtos/printer/create-printer-req.dto";
import { CreatePrinterDto, CreatePrinterResultDto } from "../dtos/printer/create-printer.dto";
import { DeletePrinterReqDto } from "../dtos/printer/delete-printer-req.dto";
import { DeletePrinterDto, DeletePrinterResultDto } from "../dtos/printer/delete-printer.dto";
import { GetPrinterReqsResultDto } from "../dtos/printer/get-printer-req.dto";
import { GetPrinterResultDto } from "../dtos/printer/get-printer.dto";
import { GetPrintersResultDto } from "../dtos/printer/get-printers.dto";
import { UpdatePrinterDto, UpdatePrinterResultDto } from "../dtos/printer/update-printer.dto";
import { Printer, PrinterKind, PrinterReq } from "../entities/printer.entity";
import { PrinterCountService } from "./printer-count.service";
import * as bcrypt from 'bcrypt';
import { Response } from "express";
import { PrinterTokenPayload } from "../interfaces/printer-token-payload.interface";
import { JwtService } from "@nestjs/jwt";
import { PrinterLoginDto, PrinterLoginResultDto } from "../dtos/printer/printer-login.dto";

@Injectable()
export class PrinterService {
    
    constructor(
        private readonly connection: Connection,

        @InjectRepository(Printer)
        private readonly printerRepository: Repository<Printer>, 

        @InjectRepository(PrinterReq)
        private readonly printerReqRepository: Repository<PrinterReq>,

        private readonly typeService: TypeService,

        private readonly userService: UsersService,

        private readonly printerCountService: PrinterCountService,

        private readonly configService: ConfigService,

        private readonly jwtService: JwtService,
    ) {}

    async createPrinter(
        { serialNo, typeId }: CreatePrinterDto
    ): Promise<CreatePrinterResultDto> {
        // 트랜젝션;
        // 생성시, count 0 생성
        try {
            const result = await this.typeService.getTypeById(typeId);
            if(!result.ok) {
                return result;
            }
            const { type } = result;
            const passwordElementsSelector = this.configService.get("PRINTER_PASSWORD_ELEMENT_SELECTOR").split("");
            const serialElements = serialNo.split("");
            const password = passwordElementsSelector.map(selector => (serialElements[selector-1])).join("");
            const hashedPassword = await bcrypt.hash(password, 10);
            const printer = await this.printerRepository.save(
                this.printerRepository.create({ 
                    serialNo, 
                    password: hashedPassword, 
                    type
                })
            );
            printer.password = undefined;
            return {
                ok: true,
                printer
            };
        } catch {
            return { ok: false, error: "Couldn't create printer" }
        }
    }

    // 차후 페이징 처리?
    // 쿼리 빌더 사용
    async getPrinters(
        kind: PrinterKind
    ): Promise<GetPrintersResultDto> {
        try {
            const types = await getRepository(Type)
                .createQueryBuilder('type')
                //.select(['type.id', 'type.name', 'type.kind'])
                .select(['type.id'])
                .where('type.kind = :kind', {kind: TypeKind.Printer})
                .andWhere('type.name like :name', {name: kind})
                .getMany();
            const typeIds = types.map(type => type['id']);
            const printers = await getRepository(Printer)
                .createQueryBuilder('printer')
                .leftJoinAndSelect('printer.type', 'type')
                .select(['printer.id', 'printer.serialNo', 'type.id', 'type.kind'])
                .where("type.id IN (:id)", { id: typeIds })
                .getMany();
            if(printers.length <= 0) {
                return { ok: false, error: "Printers not found"}
            }
            return {
                ok: true,
                printers
            }
        } catch(error) {
            return { ok: false, error: "Couldn't get printers" }
        }
    }

    async getPrinter(
        printerId: number,
    ): Promise<GetPrinterResultDto> {
        try {
            const printer = await this.printerRepository.findOne(printerId, {
                relations: ["type"]
            });
            if(!printer) {
                return { ok: false, error: "Printer not found"}
            }
            return {
                ok: true,
                printer
            }
        } catch(error) {
            return { ok: false, error: "Couldn't get printer"}
        }
    }

    async updatePrinter(
        updatePrinterDto: UpdatePrinterDto
    ): Promise<UpdatePrinterResultDto> {
        try {
            const printer = await this.printerRepository.findOne(updatePrinterDto.id);
            if(!printer) {
                return { ok: false, error: "Printer not found" }
            }

            const result = await this.typeService.getTypeById(updatePrinterDto.typeId);
            if(!result.ok) {
                return result;
            }
            const { type } = result;

            await this.printerRepository.update(printer.id, {
                type
            })

            return { ok: true }
        } catch(error) {
            return { ok: false, error: "Couldn't update printer" }
        }
    }

    async deletePrinter(
        { id }: DeletePrinterDto
    ): Promise<DeletePrinterResultDto> {
        try {
            const printer = await this.printerRepository.findOne(id);
            if(!printer) {
                return { ok: false, error: "Printer not found" }
            }

            await this.printerRepository.delete(printer.id);
            return { ok: true }
        } catch {
            return { ok: false, error: "Couldn't delete printer" }
        }
    }

    // request
    async createPrinterReq(
        userId: number,
        { serialNo, crud, typeId }: CreatePrinterReqDto,
    ): Promise<CreatePrinterReqResultDto> {
        try {
            const user = await this.userService.getById(userId);
            if(!user) {
                return { ok: false, error: "User not found"}
            }
            
            const result = await this.typeService.getTypeById(typeId);
            if(!result.ok) {
                return result;
            }
            const { type } = result;
            if((crud !== Crud.Delete) && (type.kind !== TypeKind.Printer)) {
                return { ok: false, error: 'Type is not "Printer"'}
            }
            await this.printerReqRepository.save(
                this.printerReqRepository.create({ serialNo, crud, user, typeId })
            )
            return { ok: true }
        } catch(error) {
            return { ok:false, error:"Couldn't create printer request" }
        }
    }

    async getPrinterReqs(
        crud: string,
    ): Promise<GetPrinterReqsResultDto> {
        try {
            const printerReqs = await this.printerReqRepository.find({
                where: { crud }
            });
            if(printerReqs.length <= 0) {
                return { ok: false, error: "Printer reqeusts not found" };
            }
            return {
                ok: true,
                printerReqs
            }
        } catch(error) {
            return { ok: false, error: "Couldn't get printer requests" }
        }
    }

    async deletePrinterReq(
        { id }: DeletePrinterReqDto
    ): Promise<DeletePrinterResultDto> {
        try {
            const printerReq = await this.printerReqRepository.findOne({ id });
            if(!printerReq) {
                return { ok: false, error: "Printer request not found" }
            }
            await this.printerReqRepository.delete(printerReq.id);
            return { ok: true }
        } catch(error) {
            return { ok: false, error: "Couldn't delete printer request" }
        }
    }

    async confirmPrinterReq(
        { id: printerReqId }: ConfirmPrinterReqDto
    ): Promise<ConfirmPrinterReqResultDto> {
        
        // printer request 가져오기 및 확인
        const printerReq = await this.printerReqRepository.findOne(printerReqId);
        if(!printerReq) {
            return { ok: false, error: "Printer request not found" }
        }
        const { id, serialNo: reqSerialNo, crud, typeId } = printerReq;

        // type 가져오기 및 확인
        const result = await this.typeService.getTypeById(typeId);
        if(!result.ok) {
            return result;
        }
        const { type } = result;

        // serialNo 생성
        const [serialNo, newSerialNo] = crud === Crud.Update
            ? reqSerialNo.split(',')
            : [reqSerialNo, null];

        // printer 가져오기 및 확인
        const printer = await this.printerRepository.findOne({ serialNo });

        // DB 작업
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            switch(crud) {
                case Crud.Create: {
                    if(printer) {
                        return { ok: false, error: "Printer already exist"}
                    }
                    await queryRunner.manager.save(Printer, 
                        queryRunner.manager.create(Printer, { serialNo, type })
                    );
                } break;
                case Crud.Update: {
                    if(!printer) {
                        return { ok: false, error: "Printer not found"}
                    }
                    if(!newSerialNo) {
                        return { ok: false, error: "New serialNo should be string, not null | undefined "}
                    }
                    await queryRunner.manager.update(Printer, printer, { serialNo: newSerialNo, type });
                } break;
                case Crud.Delete: {
                    if(!printer) {
                        return { ok: false, error: "Printer not found"}
                    }
                    await queryRunner.manager.delete(Printer, printer.id);
                } break;
                default:
                    return { ok: false, error: "Crud is wrong" };
            }

            await queryRunner.manager.delete(PrinterReq, { id });
            await queryRunner.commitTransaction();
            return { ok: true }
        } catch(error) {
            await queryRunner.rollbackTransaction();
            return { ok: false, error: "Couldn't confirm printer request"}
        } finally {
            await queryRunner.release();
        }
    }

    //===========================
    // auth 관련
    //===========================
    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
          plainTextPassword,
          hashedPassword
        );
        if (!isPasswordMatching) {
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    async printerLogin({ serialNo, password }: PrinterLoginDto, res: Response): Promise<PrinterLoginResultDto> {
        try {
            const printer = await this.printerRepository.findOne({ 
                where: { serialNo },
                select: ["id", "serialNo", "password"],
            });
            if(!printer) {
                return null;
            }
            await this.verifyPassword(password, printer.password);
            const {
                token,
                ...tokenOption
            } = this.getCookieWithToken(printer.id);

            res.cookie('Printer', token, tokenOption);
            printer.password = undefined;
            return {
                printer
            };
        } catch(error) {
            throw new HttpException('Printer login failure', HttpStatus.BAD_REQUEST);
        }
    }

    private getCookieWithToken(printerId: number) {
        const payload: PrinterTokenPayload = { printerId };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_PRINTER_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_PRINTER_TOKEN_EXPIRATION_TIME')}s`
        })
        return {
            token,
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            maxAge: Number(this.configService.get('JWT_PRINTER_TOKEN_EXPIRATION_TIME')) * 1000,
        }
    }

    async getById(id: number) {
        const printer = await this.printerRepository.findOne({ id });
        if(printer) {
            return printer;
        }
        throw new HttpException('Printer not found', HttpStatus.NOT_FOUND);
    }
}