import type { Character, FormattedCharacterModalData } from "../../features/characters/types/character";

// Format Date from ISO string to dd-MM-yyyy
export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatCharacterDetails = (character: Character): FormattedCharacterModalData => {
  const heightInMeters =
    character.height !== 'unknown'
      ? (parseFloat(character.height) / 100).toFixed(2) + ' m'
      : 'Unknown';

  const massInKg =
    character.mass !== 'unknown'
      ? `${character.mass} kg`
      : 'Unknown';

  return {
    name: character.name,
    heightInMeters,
    massInKg,
    dateAdded: formatDate(character.created),
    filmsCount: character.films.length,
    birthYear: character.birth_year,
  };
};