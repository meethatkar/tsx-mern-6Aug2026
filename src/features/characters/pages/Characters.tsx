import React, { useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import Pagination from '../components/Pagination';
import FilterSidebar from '../components/FilterSidebar';
import { useCharacter } from '../hooks/useCharacter';
import type { Character } from '../types/character';

interface CharactersProps {
  onSelectCharacter?: (character: Character) => void;
}

const Characters: React.FC<CharactersProps> = ({ onSelectCharacter }) => {
  const {
    getCharacters,
    characters,
    loading,
    error,
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    selectedPlanets,
    setSelectedPlanets,
    selectedSpecies,
    setSelectedSpecies,
    selectedFilms,
    setSelectedFilms,
  } = useCharacter();

  useEffect(() => {
    getCharacters(1);
  }, [getCharacters]);

  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Sidebar Reserved for Search & Filters */}
        <aside className="lg:col-span-1 order-last lg:order-first">
          <FilterSidebar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedPlanets={selectedPlanets}
            onPlanetsChange={setSelectedPlanets}
            selectedSpecies={selectedSpecies}
            onSpeciesChange={setSelectedSpecies}
            selectedFilms={selectedFilms}
            onFilmsChange={setSelectedFilms}
          />
        </aside>

        {/* Main Character Cards Grid */}
        <section className="lg:col-span-3">
          {error && (
            <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-red-400">
              <p className="flex items-center gap-2">
                <span className="font-semibold">Error:</span> {String(error)}
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {characters && characters.length > 0 ? (
              characters.map((data) => (
                <CharacterCard
                  key={data.url || data.name}
                  character={data}
                  onClick={(character) => onSelectCharacter && onSelectCharacter(character)}
                />
              ))
            ) : (
              <div className="col-span-full flex justify-center py-12 text-slate-400">
                <p>{loading ? 'Loading characters...' : 'No characters found.'}</p>
              </div>
            )}
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => getCharacters(page)}
                disabled={loading}
              />
            </div>
          )}
        </section>

      </div>
    </main>
  );
};

export default Characters;