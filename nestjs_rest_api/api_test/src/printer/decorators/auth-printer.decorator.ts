import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const AuthPrinter = createParamDecorator(
    (date: unknown, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        return req.printer;
    }
)