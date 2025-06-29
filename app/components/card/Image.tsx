'use client';

import { EyeIcon, StarIcon } from 'lucide-react';
import { Property } from '../../shared/types/types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Image({ property }: { property: Property }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const router = useRouter();

    // Verificar si está en favoritos al cargar el componente
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setIsFavorite(favorites.includes(property.id));
    }, [property.id]);

    function handleFavoriteClick(e: React.MouseEvent) {
        // Evita que el click se propague al Link
        e.stopPropagation();

        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        const index = favorites.indexOf(property.id);

        if (index > -1) {
            // Si ya está en favoritos, lo quitamos
            favorites.splice(index, 1);
            setIsFavorite(false);
        } else {
            // Si no está, lo agregamos
            favorites.push(property.id);
            setIsFavorite(true);
        }

        // Guardar los cambios en localStorage
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    const handleImageClick = (e: React.MouseEvent) => {
        e.preventDefault();

        // View Transition API si está disponible
        if ('startViewTransition' in document) {
            (document as any).startViewTransition(() => {
                router.push(`/photo/${property.id}`);
            });
        } else {
            // Fallback para navegadores que no soportan View Transitions
            router.push(`/photo/${property.id}`);
        }
    };

    return (
        <div className="relative">
            {/* Imagen clickeable que abre el modal con animación */}
            <Link
                className="block cursor-pointer"
                onClick={handleImageClick}
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
                    className={`w-4 h-4 transition-colors duration-200 ${isFavorite
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-400 hover:text-yellow-400'
                        }`}
                />
            </button>

            {/* Logo de ojo en el centro al hacer hover */}
            <div
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                onClick={handleImageClick}
            >
                <div className="bg-white bg-opacity-90 rounded-lg p-3 shadow-sm">
                    <EyeIcon className="w-5 h-5 text-gray-600" />
                </div>
            </div>
        </div >
    );
}
