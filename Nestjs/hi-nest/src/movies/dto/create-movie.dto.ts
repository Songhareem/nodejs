
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {

    @IsString()
    readonly title: string;

    @IsNumber()
    readonly year: number;

    @IsOptional()   // 필수값이 아님
    @IsString({ each: true })
    readonly genres: string[];
}