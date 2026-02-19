import { IsUrl } from 'class-validator';

export class CreateShortLinkDto {
  @IsUrl(
    {},
    {
      message:
        'please, provide a valid url / Veuillez svp soumettre une url valide : https://guru-learner.com',
    },
  )
  longUrl: string;
}
