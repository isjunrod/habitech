import { FilterData, Property } from '@app/types/types';

/**
 * Aplica los filtros definidos a una lista de propiedades.
 * Filtra por ciudad, tipo, rango de precios, habitaciones, metros cuadrados y huéspedes.
 */
export const applyFilters = (
  data: Property[],
  filters: FilterData
): Property[] => {
  return data.filter((property) => {
    // Filtro por ciudad
    if (filters.city && property.city !== filters.city) {
      return false;
    }

    // Filtro por tipo de propiedad
    if (filters.type && property.type !== filters.type) {
      return false;
    }

    // Filtro por precio mínimo
    if (filters.precioMin && property.price < parseInt(filters.precioMin)) {
      return false;
    }

    // Filtro por precio máximo
    if (filters.precioMax && property.price > parseInt(filters.precioMax)) {
      return false;
    }

    // Filtro por número de habitaciones
    if (filters.rooms && property.rooms !== parseInt(filters.rooms)) {
      return false;
    }

    // Filtro por metros cuadrados
    if (
      filters.square_meters &&
      property.square_meters < parseInt(filters.square_meters)
    ) {
      return false;
    }

    // Filtro por número de huéspedes
    if (filters.guests && property.guests < parseInt(filters.guests)) {
      return false;
    }

    return true;
  });
};

/**
 * Ordena una lista de propiedades según los filtros aplicados.
 * Los criterios de ordenamiento son jerárquicos: ciudad > tipo > precio.
 */
export const sortProperties = (
  data: Property[],
  filters: FilterData
): Property[] => {
  let sortedData = [...data];

  // Ordenar por ciudad alfabéticamente (A-Z)
  if (filters.city) {
    sortedData = sortedData.sort((a, b) => a.city.localeCompare(b.city));
  }

  // Ordenar por tipo alfabéticamente (A-Z)
  if (filters.type) {
    sortedData = sortedData.sort((a, b) => a.type.localeCompare(b.type));
  }

  // Ordenar por precio (menor a mayor) cuando hay filtros de precio
  if (filters.precioMin || filters.precioMax) {
    sortedData = sortedData.sort((a, b) => a.price - b.price);
  }

  return sortedData;
};

/**
 * Procesa los datos aplicando filtros y ordenamiento.
 * Esta función combina filtrado y ordenamiento en una sola operación.
 */
export const processPropertyData = (
  data: Property[],
  filters: FilterData
): Property[] => {
  const filteredData = applyFilters(data, filters);
  return sortProperties(filteredData, filters);
};
