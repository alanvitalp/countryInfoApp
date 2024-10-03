import { Controller, Get, Param } from '@nestjs/common';
import { CountryInfoService } from './country-info.service';

@Controller('api/countries')
export class CountryController {
  constructor(private readonly countryInfoService: CountryInfoService) {}

  @Get('available')
  async getAvailableCountries() {
    return this.countryInfoService.getAvailableCountries();
  }

  @Get(':name/:code')
  async getCountryInfo(
    @Param('name') countryName: string,
    @Param('code') countryCode: string,
  ) {
    return this.countryInfoService.getCountryInfo(countryName, countryCode);
  }
}
