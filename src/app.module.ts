import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessCardModule } from './business-card/business-card.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/businesscards'),
    // MongooseModule.forRoot(
    //   process.env.DATABASE_URL ||
    //     'mongodb+srv://dragon:<dragon>@travel-destinations.kjlf6mx.mongodb.net/test',
    // ),
    BusinessCardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
