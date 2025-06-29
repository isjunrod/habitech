import React from 'react'
import { Property } from '../../types/types'

export default function Information({ property }: { property: Property }) {
    return (
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
        </div >
    )
}
