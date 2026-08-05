import React from 'react';
import type { Character } from '../types/character';
import { getSpeciesColorClass } from '../../../shared/utils/speciesColor';

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  const themeClass = getSpeciesColorClass(character.species);
  const imageUrl = `https://picsum.photos/400/300?random=${encodeURIComponent(character.name)}`;

  return (
    <div
      onClick={() => onClick(character)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => e.key === 'Enter' && onClick(character)}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border p-4 backdrop-blur-md cursor-pointer hover:scale-105 transition-transform duration-500  ease-out ${themeClass}`}
    >
      <div className="relative h-48 w-full overflow-hidden rounded-lg bg-slate-800">
        <img
          src={imageUrl}
          alt={character.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 scale-120 ease-out group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <h3 className="text-xl font-bold tracking-wide">
        {character.name}
      </h3>
    </div>
  );
};

export default CharacterCard;