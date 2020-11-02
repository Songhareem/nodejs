import { Controller, Get, Req, Res } from '@nestjs/common';

@Controller('')
export class AppController {

    @Get()
    home(): string{
        return "Welcome to my movie API";
    }

    // @Req / @Res = express의 res / req 사용 방법
    // home(@Req() req, @Res() res): string{
    //     console.log(req);
    //     console.log(res);
    //     return "Welcome to my movie API";
    // }
}
