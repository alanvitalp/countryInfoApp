import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CountryInfoService {
  async getAvailableCountries() {
    try {
      const response = await axios.get(
        'https://date.nager.at/api/v3/AvailableCountries',
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: 'Failed to fetch available countries',
        },
        HttpStatus.BAD_GATEWAY,
        {
          cause: error,
        },
      );
    }
  }

  async getCountryInfo(countryName: string, countryCode: string) {
    try {
      const borderCountriesResponse = await axios.get(
        `https://date.nager.at/api/v3/CountryInfo/${countryCode}`,
      );

      const borderCountries = borderCountriesResponse.data?.borders || [];

      const populationResponse = await axios.post(
        'https://countriesnow.space/api/v0.1/countries/population',
        {
          country: countryName,
        },
      );

      const populationCounts =
        populationResponse.data.data?.populationCounts || [];

      const flagResponse = await axios.post(
        'https://countriesnow.space/api/v0.1/countries/flag/images',
        {
          iso2: countryCode,
        },
      );

      const countryFlag = flagResponse.data.data?.flag || null;

      return {
        borders: borderCountries,
        population: populationCounts,
        flag: countryFlag,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: 'Failed to fetch country info',
        },
        HttpStatus.BAD_GATEWAY,
        {
          cause: error,
        },
      );
    }
  }
}
