/**
 * Utilidades para manejo de favoritos en localStorage
 */

const FAVORITES_KEY = 'favorites';

/**
 * Obtiene la lista de IDs de propiedades favoritas desde localStorage.
 * Retorna un array vacío si no hay favoritos o si hay error al parsear.
 */
export const getFavorites = (): number[] => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.warn('Error al obtener favoritos:', error);
    return [];
  }
};

/**
 * Guarda la lista de favoritos en localStorage.
 * Maneja errores de serialización y storage.
 */
export const saveFavorites = (favorites: number[]): void => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error al guardar favoritos:', error);
  }
};

/**
 * Verifica si una propiedad está marcada como favorita.
 */
export const isFavorite = (propertyId: number): boolean => {
  const favorites = getFavorites();
  return favorites.includes(propertyId);
};

/**
 * Agrega una propiedad a favoritos.
 * Evita duplicados automáticamente.
 */
export const addToFavorites = (propertyId: number): void => {
  const favorites = getFavorites();
  if (!favorites.includes(propertyId)) {
    favorites.push(propertyId);
    saveFavorites(favorites);
  }
};

/**
 * Quita una propiedad de favoritos.
 */
export const removeFromFavorites = (propertyId: number): void => {
  const favorites = getFavorites();
  const index = favorites.indexOf(propertyId);

  if (index > -1) {
    favorites.splice(index, 1);
    saveFavorites(favorites);
  }
};

/**
 * Alterna el estado de favorito de una propiedad.
 * Retorna el nuevo estado (true si se agregó, false si se quitó).
 */
export const toggleFavorite = (propertyId: number): boolean => {
  const favorites = getFavorites();
  const index = favorites.indexOf(propertyId);

  if (index > -1) {
    favorites.splice(index, 1);
    saveFavorites(favorites);
    return false;
  } else {
    favorites.push(propertyId);
    saveFavorites(favorites);
    return true;
  }
};
