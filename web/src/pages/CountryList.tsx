import { ICountry } from "@/@types/country";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from "react-router-dom";
import React from "react"

const fetchCountries = async () => {
  const response = await api.get('/countries/available');
  return response.data;
};

export const CountryList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: countries = [], isLoading, isError } = useQuery<ICountry[], Error>({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p>Loading countries...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p>Error loading countries. Please try again later.</p>
      </div>
    );
  }

  return (
    <Card className="flex flex-col items-center w-full max-w-screen-lg h-[720px]">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle className="text-2xl font-bold">
          Choose Your Country
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col w-full h-full overflow-y-auto">
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="grid flex-grow grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <Link 
                key={country.countryCode} 
                to={`/${country.name}/${country.countryCode}`} 
                className="flex items-center justify-center h-12 p-2 text-center border border-gray-300 rounded hover:bg-gray-100"
              >
                {country.name}
              </Link>
            ))
          ) : (
            <p>No countries found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
