import React from 'react';
import Button from "@app/photo/[id]/components/Button";
import {Property, PropertyCardProps} from "@app/components/card/types";

function InfoRealState({property}: { property: Property }) {

    // Información - Lado derecho
    return (
        <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                        {property.title}
                    </h1>
                    <p className="text-lg text-gray-600">{property.city}</p>
                </div>

                <div className="space-y-4">
                    <div
                        className="flex items-center justify-between py-3 border-b border-gray-200">
                                            <span
                                                className="text-sm font-medium text-gray-500 uppercase tracking-wide">Tipo</span>
                        <span className="text-lg font-semibold text-gray-900">{property.type}</span>
                    </div>

                    <div
                        className="flex items-center justify-between py-3 border-b border-gray-200">
                                            <span
                                                className="text-sm font-medium text-gray-500 uppercase tracking-wide">Precio</span>
                        <span
                            className="text-2xl font-bold text-green-600">${property.price.toLocaleString()}</span>
                    </div>

                    <div
                        className="flex items-center justify-between py-3 border-b border-gray-200">
                                            <span
                                                className="text-sm font-medium text-gray-500 uppercase tracking-wide">Habitaciones</span>
                        <span
                            className="text-lg font-semibold text-gray-900">{property.rooms}</span>
                    </div>

                    <div
                        className="flex items-center justify-between py-3 border-b border-gray-200">
                        <span
                            className="text-sm font-medium text-gray-500 uppercase tracking-wide">Metros cuadrados</span>
                        <span
                            className="text-lg font-semibold text-gray-900">{property.square_meters}m²</span>
                    </div>
                </div>

                <Button text={'Contactar'}/>
            </div>
        </div>
    )
};


export default InfoRealState;