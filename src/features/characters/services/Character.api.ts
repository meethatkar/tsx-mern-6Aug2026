/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { api } from "../../../shared/utils/apiClient";

export interface FilterItem {
  url: string;
  name: string;
}

export interface FilterData {
  planets: FilterItem[];
  species: FilterItem[];
  films: FilterItem[];
}

export const getAllCharacters = async () => {
  const response = await api.get("/people");
  return response.data;
};

let cachedFilterData: FilterData | null = null;

export const getFilterData = async (): Promise<FilterData> => {
  if (cachedFilterData) {
    return cachedFilterData;
  }

  const baseURL = import.meta.env.VITE_BASE_API;
  const [planetsRes, speciesRes, filmsRes] = await Promise.all([
    axios.get(`${baseURL}/planets`),
    axios.get(`${baseURL}/species`),
    axios.get(`${baseURL}/films`),
  ]);

  const planets = planetsRes.data;
  const species = speciesRes.data;
  const films = filmsRes.data;

  cachedFilterData = {
    planets: planets.map((p: any) => ({ url: p.url, name: p.name })),
    species: species.map((s: any) => ({ url: s.url, name: s.name })),
    films: films.map((f: any) => ({ url: f.url, name: f.title })),
  };

  return cachedFilterData;
};

export const getPlanetDetails = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export const getFilmDetails = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};