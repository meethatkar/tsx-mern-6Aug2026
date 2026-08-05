import { useState, useCallback } from 'react';
import { getAllCharacters } from '../services/Character.api';
import type { Character } from '../types/character';

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

export const useCharacter = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | unknown>(null);

  const getCharacters = useCallback(async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data: PaginatedResponse = await getAllCharacters(page);

      // If api directly returns an array (some swapi forks), fallback safely
      if (Array.isArray(data)) {
        setCharacters(data);
        setTotalPages(1);
      } else {
        setCharacters(data.results || []);
        setTotalPages(Math.ceil((data.count || 0) / 10));
      }

      setCurrentPage(page);
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