import React, { useEffect, useState, useContext } from 'react';
import { debounce } from '../utils/debounce';
import { CharacterContext } from '../../features/characters/character.context';

interface NavbarProps {
  user?: {
    name: string;
    avatarUrl?: string;
  };
}

const Navbar: React.FC<NavbarProps> = () => {
  const { searchTerm, setSearchTerm, setIsMenuOpen } = useContext(CharacterContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [prevSearchTerm, setPrevSearchTerm] = useState(searchTerm);

  if (searchTerm !== prevSearchTerm) {
    setPrevSearchTerm(searchTerm);
    setLocalSearch(searchTerm);
  }

  const debouncedSetSearchTerm = React.useMemo(
    () => debounce((value: string) => setSearchTerm(value), 500),
    [setSearchTerm]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalSearch(val);
    debouncedSetSearchTerm(val);
  };


  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left: App Title / Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
            SW
          </div>
          <h1 className="text-xl font-bold tracking-wider text-white whitespace-nowrap">
            STAR WARS <span className="text-cyan-400 font-normal">DEX</span>
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Mobile-Only Action / Search Pill */}
          {!isSearchOpen ? (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center h-10 w-10 rounded-full border border-slate-700 bg-slate-900/80 text-slate-300 hover:border-cyan-500/50 hover:text-white transition-colors md:hidden"
              aria-label="Search and filter characters"
            >
              <img src="/search.svg" alt="Search" className="h-4 w-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2 transition-all">
              <input
                type="text"
                value={localSearch}
                placeholder="Search..."
                className="h-10 w-32 sm:w-48 min-w-0 rounded-full border border-cyan-500/50 bg-slate-900/80 px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none md:hidden"
                autoFocus
                onChange={handleSearch}
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-slate-400 hover:text-white"
                aria-label="Close search"
              >
                ✕
              </button>
            </div>
          )}

          {/* User Profile Avatar (Present on both Mobile and Desktop) */}
          {(!isSearchOpen && (
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="relative flex h-10 w-10 items-center justify-center md:hidden"
              aria-label="Filter characters"
            >
              <img src="/menu.svg" alt="" className='h-5 w-5' />
            </button>
          ))}

        </div>

      </div>
    </header>
  );
};

export default Navbar;