import { createContext, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";
import type { Character } from "./types/character";

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
}

export const CharacterContext = createContext<CharacterContextType>({} as CharacterContextType);

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
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}