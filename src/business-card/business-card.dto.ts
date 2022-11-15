import { IsEmail, IsNotEmpty } from 'class-validator';

export class BusinessCardDto {
  @IsNotEmpty()
  name: string;

  title: string;

  website: string;

  // @IsNotEmpty()
  @IsEmail()
  email: string;

  about: string;

  interests: string;

  constructor(
    name: string,
    title: string,
    website: string,
    email: string,
    about: string,
    interests: string,
  ) {
    this.name = name;
    this.title = title;
    this.website = website;
    this.email = email;
    this.about = about;
    this.interests = interests;
  }
}
