import { useState, useCallback, useRef } from 'react';
import { getAllCharacters } from '../services/Character.api';
import type { Character } from '../types/character';

const ITEMS_PER_PAGE = 10;

export const useCharacter = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | unknown>(null);

  const allCharactersRef = useRef<Character[] | null>(null);

  const getCharacters = useCallback(async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      let dataToPaginate = allCharactersRef.current;
      
      if (!dataToPaginate) {
        const data = await getAllCharacters(1);
        if (Array.isArray(data)) {
          dataToPaginate = data;
          allCharactersRef.current = data;
        } else {
          dataToPaginate = [];
        }
      }

      const calculatedTotalPages = Math.ceil(dataToPaginate.length / ITEMS_PER_PAGE) || 1;
      const safePage = Math.max(1, Math.min(page, calculatedTotalPages));

      const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
      const paginatedSlice = dataToPaginate.slice(startIndex, startIndex + ITEMS_PER_PAGE);

      setCharacters(paginatedSlice);
      setTotalPages(calculatedTotalPages);
      setCurrentPage(safePage);
    } catch (err: unknown) {
      setError(err || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    characters,
    currentPage,
    totalPages,
    loading,
    error,
    getCharacters,
  };
};