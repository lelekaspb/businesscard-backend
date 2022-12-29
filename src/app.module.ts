import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessCardModule } from './business-card/business-card.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    //MongooseModule.forRoot('mongodb://localhost/businesscards'),
    // MongooseModule.forRoot(process.env.LOCAL_DB_URL),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.LOCAL_DB_URL,
      }),
    }),
    BusinessCardModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
