import { DollarSign, Filter, Home, MapPin } from 'lucide-react'
import { Props } from './Header'

export default function Filters({ appliedFilters, onFilterChange, handleOpenFilterModal }: Props) {
    return (
        < div className="flex items-center gap-3 flex-1 justify-center mr-[10rem]" >
            {/* Ciudad */}
            < div className="flex items-center gap-2 min-w-[160px]" >
                <MapPin className="w-4 h-4 text-black" />
                <select
                    value={appliedFilters.city}
                    onChange={(e) => onFilterChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                    <option value="">Ciudad</option>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="Rosario">Rosario</option>
                    <option value="Mendoza">Mendoza</option>
                </select>
            </ div>

            {/* Tipo */}
            < div className="flex items-center gap-2 min-w-[140px]" >
                <Home className="w-4 h-4 text-black" />
                <select
                    value={appliedFilters.type}
                    onChange={(e) => onFilterChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                    <option value="">Tipo</option>
                    <option value="Casa">Casa</option>
                    <option value="Departamento">Departamento</option>
                    <option value="Oficina">Oficina</option>
                    <option value="Local">Local</option>
                </select>
            </ div>

            {/* Precio */}
            < div className="flex items-center gap-2 min-w-[160px]" >
                <DollarSign className="w-4 h-4 text-black" />
                <div className="flex gap-2 w-full">
                    <input
                        type="number"
                        placeholder="Min"
                        min={0}
                        value={appliedFilters.precioMin}
                        onChange={(e) => onFilterChange('precioMin', e.target.value)}
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        min={0}
                        value={appliedFilters.precioMax}
                        onChange={(e) => onFilterChange('precioMax', e.target.value)}
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
            </ div>

            <button
                onClick={handleOpenFilterModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white flex items-center gap-2">
                <Filter className="w-4 h-4" />
            </button>
        </div>
    )
}
