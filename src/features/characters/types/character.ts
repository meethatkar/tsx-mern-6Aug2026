export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string; // URL
  films: string[];    // Array of URLs
  species: string[];  // Array of URLs
  vehicles: string[];
  starships: string[];
  created: string;    // ISO Date string
  edited: string;
  url: string;
}

export interface Homeworld {
  name: string;
  terrain: string;
  climate: string;
  residents: string[] | number;
}

export interface FormattedCharacterModalData {
  name: string;
  heightInMeters: string;
  massInKg: string;
  dateAdded: string; // dd-MM-yyyy format
  filmsCount: number;
  birthYear: string;
}