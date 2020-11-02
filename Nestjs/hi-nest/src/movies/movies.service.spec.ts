
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
    let service: MoviesService;
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [MoviesService],
      }).compile();
      service = module.get<MoviesService>(MoviesService);
    });
    // beforeAll(async () => {});
    // afterEach(async () => {});
    // afterAll(async () => {});

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    describe('getAll', () => {
        it("should return an array", () => {
            const result = service.getAll();

            expect(result).toBeInstanceOf(Array);
        });
    });

    describe('getOne', () => {
        it("should return a movie", () => {
            service.create({
                title: "Tenet", 
                year: 2020, 
                genres: ["action"]}
            );
            const movie = service.getOne(1);
            expect(movie).toBeDefined();
            expect(movie.id).toEqual(1);
        });

        it("should throw 404 error", () => {
            try {
                service.getOne(999);
            } catch(e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toEqual('Movie with ID 999 not found');
            }
        });
    });

    describe('deleteOne', () => {
        it('delete a movie', () => {
            service.create({
                title: "Tenet", 
                year: 2020, 
                genres: ["action"]}
            );
            const beforeDelete = service.getAll().length;
            service.deleteOne(1);
            const afterDelete = service.getAll().length;
    
            expect(afterDelete).toBeLessThan(beforeDelete);
        });
        
        it('should return 404', () => {
            try{
                service.deleteOne(999);
            } catch(e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toEqual('Movie with ID 999 not found');
            }
        });
    });

    describe('create', () => {
        it('should create a movie', () => {
            const beforeCreate = service.getAll().length;
            service.create({
                title: "Tenet", 
                year: 2020, 
                genres: ["action"]}
            );
            const afterCreate = service.getAll().length;
            expect(afterCreate).toBeGreaterThan(beforeCreate);
        });
    });

    describe('update', () => {
        it('should update a movie', () => {
            service.create({
                title: "Tenet", 
                year: 2020, 
                genres: ["action"]}
            );
            service.update(1, {title:'Tenet:renewal'});
            const movie = service.getOne(1);
            expect(movie.title).toEqual('Tenet:renewal');
        });

        it('should throw a NotFoundException', () => {
            try{
                service.update(999, {title:'Tenet:renewal'});
            } catch(e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toEqual('Movie with ID 999 not found');
            }
        });
    });
});