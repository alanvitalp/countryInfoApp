import { ICountryInfo } from "@/@types/country";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, type ChartConfig } from "@/components/ui/chart";
import { LoadingSpinner } from '@/components/ui/spinner';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfig = {
  value: {
    label: "Population",
    color: "#2563eb",
  },
  year: {
    label: "Year",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const fetchCountryInfo = async (country: string | undefined, code: string | undefined) => {
  const response = await api.get(`countries/${country}/${code}`);
  return response.data;
};

const CountryInfo = () => {
  const navigate = useNavigate(); 
  const { country, code } = useParams();

  const { data: countryInfo, isLoading, isError } = useQuery<ICountryInfo, Error>({
    queryKey: ['countryInfo', country, code], 
    queryFn: () => fetchCountryInfo(country, code), 
    ...{ 
      enabled: !!country && !!code, 
      refetchOnMount: true 
    } 
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <LoadingSpinner className="w-10 h-10"/>
      </div>
    );
  }

  if (isError) {
    setTimeout(() => {
      navigate('/');
    }, 3000);

    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p>Error loading country information. Redirecting...</p>
      </div>
    );
  }

  if (!countryInfo) return;

  const { borders, population, flag } = countryInfo;

  return (
    <Card className="w-full max-w-screen-lg">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle className="text-3xl font-bold">
          {country} {flag && <img src={flag} alt={`${country} flag`} width={50} className="inline ml-2" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <h2 className="mb-2 text-2xl font-semibold">Border Countries:</h2>
        <ul className="mb-4">
          {borders.length > 0 ? (
            borders.map((borderCountry) => (
              <li key={borderCountry.commonName} className="mb-1">
                <Link to={`/${borderCountry.commonName}/${borderCountry.countryCode}`} className="text-blue-600 hover:underline">
                  {borderCountry.commonName}
                </Link>
              </li>
            ))
          ) : (
            <p>No bordering countries.</p>
          )}
        </ul>
        <h2 className="mb-2 text-2xl font-semibold">Population Over Time:</h2>
        <ChartContainer config={chartConfig} className="max-h-[400px] w-full">
          <BarChart data={population} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid vertical={false} />
            <ChartLegend content={<ChartLegendContent />} />
            <XAxis dataKey="year" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis />
            <ChartTooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="p-2 bg-white border rounded">
                      <h4>Year: <strong>{payload[0].payload.year}</strong></h4>
                      <p>Population: <strong>{payload[0].payload.value}</strong></p>
                    </div>
                  );
                }
                return null;
              }} 
            />
            <Bar dataKey="value" fill={chartConfig.value.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CountryInfo;
