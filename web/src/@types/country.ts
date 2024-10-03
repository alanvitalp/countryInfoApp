export type ICountry = {
  countryCode: string;
  name: string;
}

export type IBorder = {
  commonName: string;      
  officialName: string;        
  countryCode: string;        
  region: string;                
};

export interface ICountryInfo {
  borders: IBorder[];     
  population: { year: number; value: number }[]; 
  flag: string;               
}
