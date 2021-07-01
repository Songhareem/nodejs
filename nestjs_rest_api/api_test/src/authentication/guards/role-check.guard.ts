import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AllowedRoles } from "../decorators/role.decorator";

@Injectable()
export class RoleCheckGaurd implements CanActivate{

    constructor(
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext) {

        const roles = this.reflector.get<AllowedRoles>(
            'roles',
            context.getHandler()
        );
        console.log(roles);
        // role == Any라면 true
        if(roles.includes("Any")) {
            return true;
        }

        const req = context.switchToHttp().getRequest();        
        const { user } = req;
        if(!user) {
            // 유저가 req에 없으면 false,
            // But, JwtAuth에서 걸러질 듯
            return false;   
        }

        // 유저 role이 허용된게 아니라면 false
        if(!(roles.includes(user.role))) {
            return false;
        }

        return true;
    }
}