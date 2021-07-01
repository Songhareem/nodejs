import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrinterService } from "../services/printer.service";

@Injectable()
export class PrinterAuthenticationGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService,
        private readonly printerService: PrinterService,
    ) {}

    async canActivate(context: ExecutionContext) {
        
        const req = context.switchToHttp().getRequest();
        const printerToken = req.cookies?.Printer;
        if(!printerToken) {
            return false;
        }

        const decoded = this.jwtService.verify(printerToken);
        if(typeof decoded !== "object" || !decoded['printerId']) {
            return false;
        }
        
        const printerId = decoded['printerId'];
        const printer = await this.printerService.getById(printerId);
        if(!printer) {
            return false;
        }

        req.printer = printer;
        return true;
    }
}