'use client';

import { EyeIcon, StarIcon } from 'lucide-react';
import { Property } from '../../types/types';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { isFavorite as checkIsFavorite, toggleFavorite } from '../../utils/favoritesUtils';

interface ImageProps {
    property: Property;
}

/**
 * Componente de imagen para las tarjetas de propiedades.
 * Maneja la funcionalidad de favoritos y navegación con transiciones.
 */
export default function Image({ property }: ImageProps) {
    const [isFavoriteState, setIsFavoriteState] = useState(false);

// Verificar estado de favorito al cargar el componente
    useEffect(() => {
        setIsFavoriteState(checkIsFavorite(property.id));
    }, [property.id]);

    /**
     * Maneja el click en el botón de favoritos.
     * Alterna el estado y actualiza localStorage.
     */
    const handleFavoriteClick = (e: React.MouseEvent): void => {
        e.stopPropagation(); // Evita propagación al Link padre

        const newFavoriteState = toggleFavorite(property.id);
        setIsFavoriteState(newFavoriteState);
    };

    return (
        <div className="relative">
            {/* Imagen clickeable que abre el modal con animación */}
            <Link
                className="block cursor-pointer"
                href={`/photo/${property.id}`}
                prefetch={true}
            >
                <div className="w-full h-48 bg-gray-100 overflow-hidden rounded-t-xl cursor-pointer">
                    <img
                        src={property.image}
                        alt={property.title}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </Link>

            {/* Icono de favorito */}
            <button
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-200 transition-shadow z-10 cursor-pointer"
                onClick={(e) => handleFavoriteClick(e)}
            >
                <StarIcon
                    className={`w-4 h-4 transition-colors duration-200 ${isFavoriteState
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-400 hover:text-yellow-400'
                        }`}
                />
            </button>

            {/* Logo de ojo en el centro al hacer hover */}
            <Link href={`/photo/${property.id}`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                    <div className="bg-white bg-opacity-90 rounded-lg p-3 shadow-sm">
                        <EyeIcon className="w-5 h-5 text-gray-600" />
                    </div>
                </div>
            </Link>
        </div >
    );
}
