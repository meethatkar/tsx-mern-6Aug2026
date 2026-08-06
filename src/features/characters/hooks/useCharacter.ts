import { useCallback, useMemo, useContext } from 'react';
import { getAllCharacters, getFilterData } from '../services/Character.api';
import { CharacterContext } from '../character.context';

const ITEMS_PER_PAGE = 10;

const getRelativePath = (url: string) => {
  if (!url) return '';
  const match = url.match(/(planets|species|films)\/\d+/);
  return match ? match[0] : url;
};

export const useCharacter = () => {
  const {
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
    planets,
    species,
    films,
    setPlanets,
    setSpecies,
    setFilms,
  } = useContext(CharacterContext);

  const getCharacters = useCallback(async (page: number = 1) => {
    setCurrentPage(page);
    console.log("PG ", page);

    if (allCharacters.length === 0) {
      setLoading(true);
      setError(null);
      try {
        const [charactersData, filterDataRes] = await Promise.all([
          getAllCharacters(),
          getFilterData()
        ]);

        setAllCharacters(charactersData);
        setPlanets(filterDataRes.planets);
        setSpecies(filterDataRes.species);
        setFilms(filterDataRes.films);
      } catch (err: unknown) {
        setError(err || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    }
  }, [allCharacters.length, setCurrentPage, setLoading, setError, setAllCharacters, setPlanets, setSpecies, setFilms]);

  // Synchronously compute the filtered character list
  const filteredCharacters = useMemo(() => {
    let filtered = [...allCharacters];

    // 1. Search term filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(char => char.name.toLowerCase().includes(query));
    }

    // 2. Homeworld filter
    if (selectedPlanets.length > 0 && planets.length > 0) {
      filtered = filtered.filter(char => {
        if (!char.homeworld) return false;
        return selectedPlanets.some(planetName => {
          const planetObj = planets.find(p => p.name === planetName);
          //PlanetName = filter dropdown slected option, p.name = backend api call list of planets
          return planetObj && getRelativePath(char.homeworld) === getRelativePath(planetObj.url);
        });
      });
    }

    // 3. Species filter
    if (selectedSpecies.length > 0 && species.length > 0) {
      filtered = filtered.filter(char => {
        const charSpecies = char.species;
        if (charSpecies.length === 0) {
          return selectedSpecies.includes('Human');
        }
        return charSpecies.some(s =>
          selectedSpecies.some(specName => {
            const specObj = species.find(sp => sp.name === specName);
            //specName = filter dropdown selected option, sp.name = backend api call list of planets
            return specObj && getRelativePath(s) === getRelativePath(specObj.url);
          })
        );
      });
    }

    // 4. Films filter
    if (selectedFilms.length > 0 && films.length > 0) {
      filtered = filtered.filter(char =>
        char.films && char.films.some(f =>
          selectedFilms.some(filmTitle => {
            const filmObj = films.find(fl => fl.name === filmTitle);
            return filmObj && getRelativePath(f) === getRelativePath(filmObj.url);
          })
        )
      );
    }

    return filtered;
  }, [allCharacters, searchTerm, selectedPlanets, selectedSpecies, selectedFilms, planets, species, films]);

  // Calculate total pages from the filtered result
  const totalPages = useMemo(() => {
    console.log("RAN PAGE");

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
    /*
    * eg: (1-1)*10 = 0*10 = 0 ;; (2-1)*10 = 1*10 = 10 ;; (3-1)*10 = 2*10 = 20 ;;
    * explanation: from data 1st item's index is 0 for that page ;; from data 1st item's index is 10 for that page  ;; from data 1st item's index is 20 for that page
    */
    return filteredCharacters.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCharacters, safePage]);

  // Helper setters that also reset the page to 1
  const changeSearchTerm = useCallback((val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  }, [setSearchTerm, setCurrentPage]);

  const changeSelectedPlanets = useCallback((val: string[]) => {
    setSelectedPlanets(val);
    setCurrentPage(1);
  }, [setSelectedPlanets, setCurrentPage]);

  const changeSelectedSpecies = useCallback((val: string[]) => {
    setSelectedSpecies(val);
    setCurrentPage(1);
  }, [setSelectedSpecies, setCurrentPage]);

  const changeSelectedFilms = useCallback((val: string[]) => {
    setSelectedFilms(val);
    setCurrentPage(1);
  }, [setSelectedFilms, setCurrentPage]);

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
    isMenuOpen,
    setIsMenuOpen,
    planets,
    species,
    films,
  };
};