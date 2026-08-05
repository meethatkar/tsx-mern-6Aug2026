import React, { useEffect, useState } from 'react';

interface NavbarProps {
  onSearchClickMobile?: (val) => void;
  user?: {
    name: string;
    avatarUrl?: string;
  };
}

const Navbar: React.FC<NavbarProps> = ({ onSearchClickMobile, user }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState(null);

  useEffect(() => {
    onSearchClickMobile(searchVal);
  }, [searchVal]);

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (e: any) => {
    ;
    const value = e.target.value;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      console.log(typeof (e.target));
      setSearchVal(value);
    }, 500);
  }


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
          {(!isSearchOpen && (<button
            className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-cyan-500/30 bg-slate-800 transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="User Profile"
          >
            <div className="flex h-full w-full items-center justify-center bg-cyan-950 text-cyan-300 text-sm font-semibold">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'J'}
            </div>
          </button>))}

        </div>

      </div>
    </header>
  );
};

export default Navbar;