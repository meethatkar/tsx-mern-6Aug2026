import { useState, useCallback, useMemo } from 'react';
import { getAllCharacters } from '../services/Character.api';
import type { Character } from '../types/character';

const ITEMS_PER_PAGE = 10;

const PLANET_MAP: Record<string, string> = {
  'Tatooine': 'planets/1',
  'Alderaan': 'planets/2',
  'Naboo': 'planets/8',
  'Coruscant': 'planets/9'
};

const SPECIES_MAP: Record<string, string> = {
  'Human': 'species/1',
  'Droid': 'species/2',
  'Wookiee': 'species/3',
  "Yoda's species": 'species/6'
};

const FILM_MAP: Record<string, string> = {
  'A New Hope': 'films/1',
  'The Empire Strikes Back': 'films/2',
  'Return of the Jedi': 'films/3',
  'The Phantom Menace': 'films/4'
};

export const useCharacter = () => {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | unknown>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPlanets, setSelectedPlanets] = useState<string[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [selectedFilms, setSelectedFilms] = useState<string[]>([]);

  const getCharacters = useCallback(async (page: number = 1) => {
    setCurrentPage(page);

    if (allCharacters.length === 0) {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllCharacters(1);
        setAllCharacters(data);
      } catch (err: unknown) {
        setError(err || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    }
  }, [allCharacters.length]);

  // Synchronously compute the filtered character list
  const filteredCharacters = useMemo(() => {
    let filtered = [...allCharacters];

    // 1. Search term filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(char => char.name.toLowerCase().includes(query));
    }

    // 2. Homeworld filter
    if (selectedPlanets.length > 0) {
      filtered = filtered.filter(char =>
        char.homeworld && selectedPlanets.some(planet => {
          const planetPath = PLANET_MAP[planet];
          return planetPath && char.homeworld.includes(planetPath);
        })
      );
    }

    // 3. Species filter
    if (selectedSpecies.length > 0) {
      filtered = filtered.filter(char =>
        char.species && char.species.some(s =>
          selectedSpecies.some(spec => {
            const speciesPath = SPECIES_MAP[spec];
            return speciesPath && s.includes(speciesPath);
          })
        )
      );
    }

    // 4. Films filter
    if (selectedFilms.length > 0) {
      filtered = filtered.filter(char =>
        char.films && char.films.some(f =>
          selectedFilms.some(film => {
            const filmPath = FILM_MAP[film];
            return filmPath && f.includes(filmPath);
          })
        )
      );
    }

    return filtered;
  }, [allCharacters, searchTerm, selectedPlanets, selectedSpecies, selectedFilms]);

  // Calculate total pages from the filtered result
  const totalPages = useMemo(() => {
    return Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE) || 1;
  }, [filteredCharacters.length]);

  // Ensure current page is within safe bounds (e.g. if filters shrink the results list)
  const safePage = useMemo(() => {
    if (currentPage > totalPages) {
      return 1;
    }
    return currentPage;
  }, [currentPage, totalPages]);

  // Slice the filtered results for the current page
  const characters = useMemo(() => {
    const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredCharacters.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCharacters, safePage]);

  // Helper setters that also reset the page to 1
  const changeSearchTerm = useCallback((val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  }, []);

  const changeSelectedPlanets = useCallback((val: string[]) => {
    setSelectedPlanets(val);
    setCurrentPage(1);
  }, []);

  const changeSelectedSpecies = useCallback((val: string[]) => {
    setSelectedSpecies(val);
    setCurrentPage(1);
  }, []);

  const changeSelectedFilms = useCallback((val: string[]) => {
    setSelectedFilms(val);
    setCurrentPage(1);
  }, []);

  return {
    characters,
    currentPage: safePage,
    totalPages,
    loading,
    error,
    getCharacters,
    searchTerm,
    setSearchTerm: changeSearchTerm,
    selectedPlanets,
    setSelectedPlanets: changeSelectedPlanets,
    selectedSpecies,
    setSelectedSpecies: changeSelectedSpecies,
    selectedFilms,
    setSelectedFilms: changeSelectedFilms,
  };
};