import { ApiProperty } from '@nestjs/swagger';

export class ShortLinkResponseDto {
  @ApiProperty({
    example: 'a1b2c3d',
    description: 'The generated short URL code',
  })
  shortUrl: string;

  @ApiProperty({
    example: 'https://guru-learner.com/some/very/long/path',
    description: 'The original long URL',
  })
  longUrl: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Creation timestamp',
  })
  createdAt: Date;
}
