import { createContext, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";
import type { Character } from "./types/character";
import type { FilterItem } from "./services/Character.api";

interface CharacterContextType {
  allCharacters: Character[];
  setAllCharacters: Dispatch<SetStateAction<Character[]>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  error: string | null | unknown;
  setError: Dispatch<SetStateAction<string | null | unknown>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedPlanets: string[];
  setSelectedPlanets: Dispatch<SetStateAction<string[]>>;
  selectedSpecies: string[];
  setSelectedSpecies: Dispatch<SetStateAction<string[]>>;
  selectedFilms: string[];
  setSelectedFilms: Dispatch<SetStateAction<string[]>>;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  planets: FilterItem[];
  species: FilterItem[];
  films: FilterItem[];
  setPlanets: (planets: FilterItem[]) => void;
  setSpecies: (species: FilterItem[]) => void;
  setFilms: (films: FilterItem[]) => void;
}

export const CharacterContext = createContext<CharacterContextType>({} as CharacterContextType);

// Static data stored at module level (no useState)
let staticPlanets: FilterItem[] = [];
let staticSpecies: FilterItem[] = [];
let staticFilms: FilterItem[] = [];

// Static setters defined outside the component to prevent recreating them on every render
const setPlanets = (data: FilterItem[]) => {
  staticPlanets = data;
};

const setSpecies = (data: FilterItem[]) => {
  staticSpecies = data;
};

const setFilms = (data: FilterItem[]) => {
  staticFilms = data;
};

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | unknown>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPlanets, setSelectedPlanets] = useState<string[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [selectedFilms, setSelectedFilms] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <CharacterContext.Provider
      value={{
        allCharacters,
        setAllCharacters,
        currentPage,
        setCurrentPage,
        loading,
        setLoading,
        error,
        setError,
        searchTerm,
        setSearchTerm,
        selectedPlanets,
        setSelectedPlanets,
        selectedSpecies,
        setSelectedSpecies,
        selectedFilms,
        setSelectedFilms,
        isMenuOpen,
        setIsMenuOpen,
        planets: staticPlanets,
        species: staticSpecies,
        films: staticFilms,
        setPlanets,
        setSpecies,
        setFilms,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}