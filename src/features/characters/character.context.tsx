import { createContext, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";
import type { Character } from "./types/character";

interface CharacterContextType {
  characters: Character[] | null;
  setCharacters: Dispatch<SetStateAction<Character[] | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  errors: unknown;
  setErrors: Dispatch<SetStateAction<unknown>>;
}

export const CharacterContext = createContext<CharacterContextType>({} as CharacterContextType);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<unknown>(null);

  return <CharacterContext.Provider value={{ characters, setCharacters, loading, setLoading, errors, setErrors }}>
    {children}
  </CharacterContext.Provider>
}