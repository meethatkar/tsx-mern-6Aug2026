import React, { useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import Pagination from '../components/Pagination';
import { useCharacter } from '../hooks/useCharacter';
import type { Character } from '../types/character';

interface CharactersProps {
  onSelectCharacter?: (character: Character) => void;
}

const Characters: React.FC<CharactersProps> = ({ onSelectCharacter }) => {
  const { getCharacters, characters, loading, error, currentPage, totalPages } = useCharacter();

  useEffect(() => {
    getCharacters(1);
  }, [getCharacters]);

  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Main Character Cards Grid */}
        <section className="lg:col-span-3">
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

        {/* Sidebar Reserved for Search & Filters */}
        <aside className="lg:col-span-1">
          {/* We will place Search & Filter components here next */}
        </aside>

      </div>
    </main>
  );
};

export default Characters;