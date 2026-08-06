import React, { useEffect } from 'react';
import type { Character } from '../types/character';
import { usePopup } from '../hooks/usePopup';
import { formatCharacterDetails } from '../../../shared/utils/formatter';

interface CharacterModalCardProps {
  onClose: () => void;
  character: Character;
}

const CharacterModalCard: React.FC<CharacterModalCardProps> = ({ onClose, character }) => {
  const {
    planetCache,
    fetchPlanetData,
    flimCache,
    fetchFlimData,
    loading,
    error,
    setplanetCache,
    setflimCache,
  } = usePopup();

  const formattedChar = formatCharacterDetails(character);

  useEffect(() => {
    setplanetCache(null);
    setflimCache(null);

    if (character.homeworld) {
      fetchPlanetData(character.homeworld);
    }
    if (character.films && character.films.length > 0) {
      fetchFlimData(character.films);
    }
  }, [character, fetchPlanetData, fetchFlimData, setplanetCache, setflimCache]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md transition-all duration-300">
      {/* Outer Card Wrapper with glowing shadow */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-[0_0_50px_rgba(6,182,212,0.15)] transition-all duration-300">
        
        {/* Futuristic Corner Accents */}
        <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-cyan-500"></div>
        <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-cyan-500"></div>
        <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-cyan-500"></div>
        <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-cyan-500"></div>

        {/* 1. Header Section */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-500">Star Wars Registry</span>
            <h2 className="mt-1 text-2xl font-black tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
              {formattedChar.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="group flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/50 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300"
            aria-label="Close modal"
          >
            <span className="text-sm font-bold transition-transform group-hover:rotate-90 duration-300">✕</span>
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            {/* Hologram Scanner Animation */}
            <div className="relative flex h-16 w-16 items-center justify-center">
              <div className="absolute h-full w-full animate-ping rounded-full bg-cyan-500/20"></div>
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-800 border-t-cyan-500"></div>
            </div>
            <p className="mt-6 text-xs uppercase tracking-widest text-cyan-400 animate-pulse">Initializing Holocron Link...</p>
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              ⚠️
            </div>
            <p className="mt-4 text-sm text-red-400">Holocron Link Failed: {String(error)}</p>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            
            {/* 2. Key Metrics Grid */}
            <div className="grid grid-cols-3 gap-3">
              {/* Birth Year Box */}
              <div className="group rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-center transition-all duration-300 hover:border-cyan-500/30 hover:bg-slate-950/60">
                <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold group-hover:text-cyan-400 transition-colors">Birth Year</span>
                <span className="mt-1 block text-sm font-black text-slate-200">{formattedChar.birthYear}</span>
              </div>

              {/* Height Box */}
              <div className="group rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-center transition-all duration-300 hover:border-cyan-500/30 hover:bg-slate-950/60">
                <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold group-hover:text-cyan-400 transition-colors">Height</span>
                <span className="mt-1 block text-sm font-black text-slate-200">{formattedChar.heightInMeters}</span>
              </div>

              {/* Weight Box */}
              <div className="group rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-center transition-all duration-300 hover:border-cyan-500/30 hover:bg-slate-950/60">
                <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold group-hover:text-cyan-400 transition-colors">Weight</span>
                <span className="mt-1 block text-sm font-black text-slate-200">{formattedChar.massInKg}</span>
              </div>

              {/* Films Count Box */}
              <div className="group rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-center transition-all duration-300 hover:border-cyan-500/30 hover:bg-slate-950/60">
                <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold group-hover:text-cyan-400 transition-colors">Films</span>
                <span className="mt-1 block text-sm font-black text-slate-200">{formattedChar.filmsCount}</span>
              </div>

              {/* Added Date Box */}
              <div className="col-span-2 group rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-center transition-all duration-300 hover:border-cyan-500/30 hover:bg-slate-950/60">
                <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold group-hover:text-cyan-400 transition-colors">Date Added</span>
                <span className="mt-1 block text-sm font-black text-slate-200">{formattedChar.dateAdded}</span>
              </div>
            </div>

            {/* 3. Homeworld Details Section */}
            {planetCache && (
              <div className="border-t border-slate-800/80 pt-5">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-extrabold">Homeworld Database</span>
                <div className="mt-2.5 rounded-xl border border-slate-800/60 bg-gradient-to-r from-slate-950/60 to-slate-900/60 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-bold text-white tracking-wide">{planetCache.name}</p>
                    <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-bold text-cyan-400">Planet</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-300">
                    <p className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Terrain</span> 
                      <span className="font-semibold text-slate-200 capitalize">{planetCache.terrain}</span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Climate</span> 
                      <span className="font-semibold text-slate-200 capitalize">{planetCache.climate}</span>
                    </p>
                    <p className="col-span-2 flex flex-col border-t border-slate-800/60 pt-2">
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Population / Residents</span> 
                      <span className="font-semibold text-slate-200">{planetCache.residents.toLocaleString()} occupants</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Films List */}
            {flimCache && flimCache.length > 0 && (
              <div className="border-t border-slate-800/80 pt-5">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-extrabold">Featured Records</span>
                <div className="mt-2.5 max-h-36 overflow-y-auto pr-1 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                  {flimCache.map((title) => (
                    <div 
                      key={title} 
                      className="flex items-center justify-between rounded-lg border border-slate-800/50 bg-slate-950/20 px-3.5 py-2 text-xs text-slate-300 transition-all duration-200 hover:border-cyan-500/20 hover:bg-slate-950/40"
                    >
                      <span className="font-medium text-slate-200">{title}</span>
                      <span className="text-[10px] text-cyan-500/80">▲ Holocron</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default CharacterModalCard;