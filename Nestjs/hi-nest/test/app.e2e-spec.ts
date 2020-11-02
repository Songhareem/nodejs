import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule],
  //   }).compile();

  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,            // 등록되지 않은 식별자가 오면 error
        forbidNonWhitelisted: true, // 등록되지 않은 식별자를 아예 걸러냄
        transform: true             // url을 통해 오는 값을 @Param에 연결된 변수의 형으로 바꿔줌
      })
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get("/movies")
        .expect(200)
        .expect([]);
    });
    it('POST 201', () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: 'Tenet',
          year: 2020,
          genres: ['action']
        })
        .expect(201)
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: 'Tenet',
          year: 2020,
          genres: ['action'],
          other: 'thing'
        })
        .expect(400);
    });
    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete("/movies")
        .expect(404 || 405);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
        return request(app.getHttpServer())
          .get('/movies/1')
          .expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer())
        .get('/movies/999')
        .expect(404);
    });
    it('PATCH', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({title:'Tenet:renewal'})
        .expect(200);
    });
    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200);
    });
  });
});
