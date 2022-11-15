import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TestModule } from './../src/test.module';
import { BusinessCardDto } from './../src/business-card/business-card.dto';
import { BusinessCardService } from './../src/business-card/business-card.service';

describe('Business Card Controller (e2e)', () => {
  let app: INestApplication;
  let bcService: BusinessCardService;

  beforeEach(async () => {
    await bcService.deleteMany({}); // delete all businesscards.
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    bcService = moduleFixture.get(BusinessCardService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('Post BusinessCard controller', () => {
    it('should create a new valid business card', async () => {
      // Arrange
      const bc = new BusinessCardDto(
        'Mathias',
        'Adjunkt',
        'mathias.website',
        'fkdasælf@fjæak.dk',
        'Hello',
        'Caring for little animals',
      );
      // Act
      const result = await request(app.getHttpServer())
        .post('/businesscards')
        .send(bc)
        .expect(201);
      // Assert
      const res = result.body;
      expect(res._id).toBeDefined();
      expect(res.__v).toEqual(0);
    });

    it('should return error when invalid data is passed on create', async () => {
      // Arrange
      const bc = new BusinessCardDto(
        'Mathias',
        'Adjunkt',
        'mathias.website',
        'a',
        'Hello',
        'Caring for little animals',
      );
      // Act
      const result = await request(app.getHttpServer())
        .post('/businesscards')
        .send(bc)
        .expect(400);

      // Assert
      const res = result.body;
      expect(res.message[0]).toEqual('email must be an email');
    });
  });

  describe('Get Businesscard controller', () => {
    it('should get all businesscards', async () => {
      // Arrange
      const bc1 = new BusinessCardDto(
        '1',
        'f',
        'laurasmith.website',
        'fkdasælf@fjæak.dk',
        'fkjaæsfd',
        'akfjæd',
      );
      const bc2 = new BusinessCardDto(
        '2',
        'f',
        'johndoe.website',
        'f@f.dk',
        'f',
        'f',
      );
      await bcService.createBusinessCard(bc1);
      await bcService.createBusinessCard(bc2);

      //Act
      // call the endpoint to get all business cards
      const result = await request(app.getHttpServer())
        .get('/businesscards')
        .expect(200);

      //Assert (expect)
      const res = result.body;
      console.log(res);
      expect(res.length).toEqual(2);
      expect(res).toStrictEqual([
        expect.objectContaining({
          name: '1',
          title: 'f',
          website: 'laurasmith.website',
          email: 'fkdasælf@fjæak.dk',
          about: 'fkjaæsfd',
          interests: 'akfjæd',
        }),
        expect.objectContaining({
          name: '2',
          title: 'f',
          website: 'johndoe.website',
          email: 'f@f.dk',
          about: 'f',
          interests: 'f',
        }),
      ]);
    });
  });

  //Closing app after all tests => not hanging.
  afterAll(() => {
    app.close();
  });
});
