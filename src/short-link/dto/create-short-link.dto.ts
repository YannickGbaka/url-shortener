import { IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShortLinkDto {
  @ApiProperty({
    description: 'The original long URL to shorten',
    example: 'https://guru-learner.com/some/very/long/path',
  })
  @IsUrl(
    {},
    {
      message:
        'please, provide a valid url / Veuillez svp soumettre une url valide : https://guru-learner.com',
    },
  )
  longUrl: string;
}
