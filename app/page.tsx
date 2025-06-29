'use client'

import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import Grid from './components/Grid';
import FilterModal from './components/FilterModal';
import data from '@/db/db.json';
import { FilterData, Property } from './types/types';

/**
 * Página principal de la aplicación de propiedades inmobiliarias.
 * Maneja la lógica de filtros, búsqueda y visualización de propiedades.
 */
export default function HomePage() {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    // Estado de filtros - inicialmente vacíos
    const [appliedFilters, setAppliedFilters] = useState<FilterData>({
        city: '',
        type: '',
        precioMin: '',
        precioMax: '',
        rooms: '',
        square_meters: '',
        guests: ''
    });

    // Datos procesados (filtrados y ordenados)
    const [dataFiltered, setDataFiltered] = useState<Property[]>(data);

    /**
     * Maneja los cambios en los filtros individuales.
     * Actualiza el estado de filtros aplicados.
     */
    const handleFilterChange = (field: keyof FilterData, value: string): void => {
        setAppliedFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Ordenar los datos filtrados según los filtros aplicados
    const sortDataFiltered = (data: Property[], filter: FilterData) => {

        let sortedData = [...data];

        // Ordenar por ciudad A-Z
        if (filter.city) {
            sortedData = sortedData.sort((a, b) => a.city.localeCompare(b.city));
        }

        // Ordenar por tipo A-Z
        if (filter.type) {
            sortedData = sortedData.sort((a, b) => a.type.localeCompare(b.type));
        }

        // Ordenar por precio de menor a mayor
        if (filter.precioMin || filter.precioMax) {
            sortedData = sortedData.sort((a, b) => a.price - b.price);
        }

        // Ordenar por habitaciones de menor a mayor
        if (filter.rooms) {
            sortedData = sortedData.sort((a, b) => a.rooms - b.rooms);
        }

        // Ordenar por metros cuadrados de menor a mayor
        if (filter.square_meters) {
            sortedData = sortedData.sort((a, b) => a.square_meters - b.square_meters);
        }

        // Ordenar por huéspedes de menor a mayor
        if (filter.guests) {
            sortedData = sortedData.sort((a, b) => a.guests - b.guests);
        }

        return sortedData;
    }

    // Aplicar los filtros y actualizar los datos filtrados
    const handleApplyFilters = (filters: FilterData) => {
        // Precio en un rango aproximado de +-20
        const firstRange = Number(filters.precioMin) - 20;
        const secondRange = Number(filters.precioMax) + 20;

        // Filtrar los datos según los filtros aplicados
        const filteredData = data.filter(property => {
            return (
                (filters.city ? property.city.toLowerCase().includes(filters.city.toLowerCase()) : true) &&
                (filters.type ? property.type.toLowerCase() === filters.type.toLowerCase() : true) &&
                (filters.precioMin ? property.price >= firstRange : true) &&
                (filters.precioMax ? property.price <= secondRange : true) &&
                (filters.rooms ? property.rooms >= Number(filters.rooms) : true) &&
                (filters.square_meters ? property.square_meters >= Number(filters.square_meters) : true) &&
                (filters.guests ? property.guests >= Number(filters.guests) : true)
            )
        })

        const sortedData = sortDataFiltered(filteredData, filters);
        setDataFiltered(sortedData);
    }

    useEffect(() => {
        handleApplyFilters(appliedFilters);
    }, [appliedFilters])

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                appliedFilters={appliedFilters}
                handleOpenFilterModal={() => setIsFilterModalOpen(true)}
                onFilterChange={handleFilterChange}
            />
            <Grid
                dataFiltered={dataFiltered}
            />

            <FilterModal
                onClose={() => setIsFilterModalOpen(false)}
                isOpen={isFilterModalOpen}
                handleApplyFilters={(filters: FilterData) => setAppliedFilters(filters)}
                appliedFilters={appliedFilters}
                handleFilterChange={handleFilterChange}
            />
        </div>
    );
}