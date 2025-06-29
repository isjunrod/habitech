import { Heart, EyeIcon } from 'lucide-react';

interface Property {
    id: number;
    title: string;
    city: string;
    type: string;
    price: number;
    rooms: number;
    square_meters: number;
    image: string;
    isFavorite: boolean;
}

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
            {/* Imagen */}
            <div className="relative">
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <img src={property.image} alt={property.title} className="object-cover w-full h-full"/>
                </div>

                {/* Icono de favorito */}
                <button
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                    <Heart
                        className={`w-4 h-4 ${property.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                    />
                </button>

                {/* Logo de ojo en el centro al hacer hover */}
                <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-white bg-opacity-90 rounded-lg p-3 shadow-sm">
                        <EyeIcon className="w-5 h-5 text-gray-600"/>
                    </div>
                </div>
            </div>

            {/* Información de la propiedad */}
            <div className="p-4">
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {property.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-900">
                        Ciudad: {property.city}
                    </p>
                    <p className="text-sm text-gray-600">
                        Tipo: {property.type}
                    </p>
                    <p className="text-sm text-gray-600">
                        Precio: ${property.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                        Habitaciones: {property.rooms}
                    </p>
                    <p className="text-sm text-gray-600">
                        Metros cuadrados: {property.square_meters}m²
                    </p>
                </div>
            </div>
        </div>
    );
}
