'use client';

import Link from 'next/link';
import { EyeIcon, StarIcon } from 'lucide-react';
import { Property } from '../../shared/types/types';

export default function Image({ property }: { property: Property }) {
    console.log(property.id)

    function handleFavoriteClick(e: React.MouseEvent) {
        // Evita que el click se propague al Link
        e.stopPropagation();
        // Aquí puedes manejar la lógica para agregar o quitar de favoritos
        console.log(`Favorito toggled for property ID: ${property.id}`);
    }

    return (
        <div className="relative">
            {/* Imagen clickeable que abre el modal */}
            <Link href={`/photo/${property.id}`} className="block">
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
                onClick={handleFavoriteClick}
            >
                <StarIcon
                    className={`w-4 h-4 ${property.isFavorite ? 'text-red-500' : 'text-gray-400'}`}
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
