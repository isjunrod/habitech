'use client';

import React, { useState, useEffect } from 'react';
import { Property } from '../types/types';
import PropertyCard from '../components/card/Property';
import { HeartIcon } from 'lucide-react';
import data from '@/db/db.json';
import Link from 'next/link';

export default function FavoritesPage() {
    const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Obtener IDs de favoritos del localStorage
        const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");

        // Filtrar las propiedades que están en favoritos
        const favorites = data.filter(property => favoriteIds.includes(property.id));

        setFavoriteProperties(favorites);
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando favoritos...</p>
                </div>
            </div>
        );
    }

    if (favoriteProperties.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="text-center">
                        <HeartIcon className="mx-auto h-24 w-24 text-gray-300 mb-6" />
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            No tienes favoritos aún
                        </h1>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Explora nuestras propiedades y marca las que más te gusten haciendo clic en la estrella.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Explorar Propiedades
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <HeartIcon className="h-8 w-8 text-red-500 fill-red-500" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            Mis Favoritos
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        {favoriteProperties.length} {favoriteProperties.length === 1 ? 'propiedad' : 'propiedades'} guardada{favoriteProperties.length === 1 ? '' : 's'} en favoritos
                    </p>
                </div>

                {/* Grid de propiedades favoritas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteProperties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
