import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get("regacySearch")
    regacySearch(@Query("year") searchingYear: string) {
        return `movie year` + searchingYear;
    }

    @Get(":id")
    getOne(@Param('id') movieId: number) :Movie {
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto) {
        return this.moviesService.create(movieData);
    }

    @Delete(":id")
    delete(@Param("id") movieId: number) {
        return this.moviesService.deleteOne(movieId);
    }

    @Patch(':id')
    patch(@Param('id') movieId: number, @Body() movieData: UpdateMovieDto) {
        return this.moviesService.update(movieId, movieData);
    }

    @Get("restApiSearch/:title/:director")
    search(@Param('title') title: string, @Param('director') director:string) {
        return title + `made by ` + director;
    }
}
