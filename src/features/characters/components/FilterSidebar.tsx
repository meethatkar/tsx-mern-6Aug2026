import React, { useState, useMemo } from 'react';
import FilterAccordion from './FilterAccordion';
import { debounce } from '../../../shared/utils/debounce';

const MOCK_OPTIONS = {
  planets: ['Tatooine', 'Alderaan', 'Naboo', 'Coruscant'],
  species: ['Human', 'Droid', 'Wookiee', "Yoda's species"],
  films: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi', 'The Phantom Menace']
};

interface FilterSidebarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedPlanets: string[];
  onPlanetsChange: (value: string[]) => void;
  selectedSpecies: string[];
  onSpeciesChange: (value: string[]) => void;
  selectedFilms: string[];
  onFilmsChange: (value: string[]) => void;
  onClose?: () => void;
  planets?: { url: string; name: string }[];
  species?: { url: string; name: string }[];
  films?: { url: string; name: string }[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  searchTerm,
  onSearchChange,
  selectedPlanets,
  onPlanetsChange,
  selectedSpecies,
  onSpeciesChange,
  selectedFilms,
  onFilmsChange,
  onClose,
  planets,
  species,
  films,
}) => {
  // Local immediate state for search input text
  const [prevSearchTerm, setPrevSearchTerm] = useState(searchTerm);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  if (searchTerm !== prevSearchTerm) {
    setPrevSearchTerm(searchTerm);
    setLocalSearchTerm(searchTerm);
  }

  // Create a debounced handler for parent search updates
  const debouncedSearchChange = useMemo(
    () => debounce((val: string) => onSearchChange(val), 500),
    [onSearchChange]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalSearchTerm(val);
    debouncedSearchChange(val);
  };

  // Accordion open/close states
  const [expanded, setExpanded] = useState({
    homeworld: false,
    species: false,
    films: false,
  });

  const toggleAccordion = (key: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const planetOptions = useMemo(() => {
    return planets && planets.length > 0 ? planets.map((p) => p.name) : MOCK_OPTIONS.planets;
  }, [planets]);

  const speciesOptions = useMemo(() => {
    return species && species.length > 0 ? species.map((s) => s.name) : MOCK_OPTIONS.species;
  }, [species]);

  const filmOptions = useMemo(() => {
    return films && films.length > 0 ? films.map((f) => f.name) : MOCK_OPTIONS.films;
  }, [films]);

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
      {/* Mobile Top Header */}
      {onClose && (
        <div className="flex items-center justify-between mb-4 md:hidden">
          <h2 className="text-lg font-bold text-white">Filters & Search</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl p-1 focus:outline-none"
            aria-label="Close filters"
          >
            ✕
          </button>
        </div>
      )}

      {/* 1. Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          value={localSearchTerm}
          onChange={handleSearchChange}
          placeholder="Search characters..."
          className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 pl-4 pr-10 text-sm text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
        />
        <img
          src="/search.svg"
          alt="Search"
          className="absolute right-3 top-3 h-4 w-4 opacity-75"
        />
      </div>

      {/* 2. Homeworld / Planets Accordion */}
      <FilterAccordion
        title="Homeworld/planets"
        isOpen={expanded.homeworld}
        onToggle={() => toggleAccordion('homeworld')}
        options={planetOptions}
        selectedValues={selectedPlanets}
        onChange={onPlanetsChange}
      />

      {/* 3. Species Accordion */}
      <FilterAccordion
        title="Species"
        isOpen={expanded.species}
        onToggle={() => toggleAccordion('species')}
        options={speciesOptions}
        selectedValues={selectedSpecies}
        onChange={onSpeciesChange}
      />

      {/* 4. Films Accordion */}
      <FilterAccordion
        title="Films"
        isOpen={expanded.films}
        onToggle={() => toggleAccordion('films')}
        options={filmOptions}
        selectedValues={selectedFilms}
        onChange={onFilmsChange}
      />

      {/* Mobile Search Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-cyan-500 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-cyan-400 active:bg-cyan-600 transition-colors md:hidden focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          Search
        </button>
      )}
    </div>
  );
};

export default FilterSidebar;
