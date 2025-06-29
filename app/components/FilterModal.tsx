'use client'

import { X, Users, Square, Bed } from 'lucide-react';
import { FilterData } from '../shared/types/types';

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleApplyFilters: (filters: FilterData) => void;
    appliedFilters: FilterData;
    handleFilterChange: (field: keyof FilterData, value: string) => void;
}

{/* Modal de filtros */ }
function FilterModal({ isOpen, onClose, appliedFilters, handleFilterChange }: FilterModalProps) {

    const handleClear = () => {
        // Limpiar todos los filtros
        handleFilterChange('city', '');
        handleFilterChange('type', '');
        handleFilterChange('precioMin', '');
        handleFilterChange('precioMax', '');
        handleFilterChange('rooms', '');
        handleFilterChange('square_meters', '');
        handleFilterChange('guests', '');

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Filtros</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {
                        Object.keys(appliedFilters).some(key => appliedFilters[key as keyof FilterData]) &&
                        <div className='border-b pb-6 border-gray-500'>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Seleccionados</h3>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(appliedFilters).map(([key, value]) => (
                                    value && (
                                        <span key={key} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                            {`${key.toUpperCase()}`}
                                        </span>
                                    )
                                ))}
                            </div>
                        </div>
                    }

                    {/* Sección de detalles */}
                    <div className="border-gray-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Número de rooms */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Bed className="w-4 h-4" />
                                    N° de rooms
                                </label>
                                <input
                                    type="number"
                                    placeholder="Ej: 3"
                                    value={appliedFilters.rooms}
                                    onChange={(e) => handleFilterChange('rooms', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Metros cuadrados */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Square className="w-4 h-4" />
                                    Metros cuadrados
                                </label>
                                <input
                                    type="number"
                                    placeholder="Ej: 80"
                                    value={appliedFilters.square_meters}
                                    onChange={(e) => handleFilterChange('square_meters', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Número de huéspedes */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Users className="w-4 h-4" />
                                    N° de huéspedes
                                </label>
                                <input
                                    type="number"
                                    placeholder="Ej: 4"
                                    value={appliedFilters.guests}
                                    onChange={(e) => handleFilterChange('guests', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end p-6 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={handleClear}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        Limpiar filtros
                    </button>
                </div>
            </div>
        </div >
    );
};

export default FilterModal;
