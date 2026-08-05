import { api } from "../../../shared/utils/apiClient"

export const getAllCharacters = async (pageNum) => {
  const response = await api.get(`/people?page=${pageNum}`);
  return response.data;
}

export const getCharacterHomeWorld = async (id) => {
  const response = await api.get(`/planets/${id}`);
  return response;
}