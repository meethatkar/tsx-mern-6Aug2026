/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useCallback } from "react";
import { CharacterContext } from "../character.context";
import { getFilmDetails, getPlanetDetails } from "../services/Character.api";

export const usePopup = () => {
  const {
    planetCache,
    setplanetCache,
    flimCache,
    setflimCache,
    loading,
    setLoading,
    error,
    setError
  } = useContext(CharacterContext);

  const fetchPlanetData = useCallback(async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPlanetDetails(url);
      const mappedPlanet = {
        name: response.name,
        terrain: response.terrain,
        climate: response.climate,
        residents: response.residents.length,
      };
      setplanetCache(mappedPlanet);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setplanetCache]);

  const fetchFlimData = useCallback(async (urls: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const responses = await Promise.all(urls.map(url => getFilmDetails(url)));
      const titles = responses.map(res => res.title);
      setflimCache(titles);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setflimCache]);

  return {
    planetCache,
    fetchPlanetData,
    flimCache,
    fetchFlimData,
    loading,
    error,
    setplanetCache,
    setflimCache,
  };
};