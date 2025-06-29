'use client'

import PropertyCard from './card/Property';
import { VariableSizeGrid } from 'react-window';
import { Property } from '../types/types';

// Configuración del grid virtualizado
const GRID_CONFIG = {
    COLUMNS: 3,
    COLUMN_WIDTH: 400,
    ROW_HEIGHT: 400,
    GRID_HEIGHT: 800,
    GRID_WIDTH: 1200,
    CELL_PADDING: 10
} as const;

interface CellProps {
    columnIndex: number;
    rowIndex: number;
    style: React.CSSProperties;
    data: Property[];
}

/**
 * Renderiza una celda individual del grid virtualizado.
 * Cada celda contiene una PropertyCard si hay datos disponibles.
 */
const Cell = ({ columnIndex, rowIndex, style, data }: CellProps) => {
    const itemIndex = rowIndex * GRID_CONFIG.COLUMNS + columnIndex;
    const property = data[itemIndex];

    // Si no hay propiedad para esta posición, renderiza celda vacía
    if (!property) {
        return <div style={style} />;
    }

    return (
        <div style={{ ...style, padding: `${GRID_CONFIG.CELL_PADDING}px` }}>
            <PropertyCard property={property} />
        </div>
    );
};

interface GridProps {
    dataFiltered: Property[];
}

/**
 * Grid virtualizado que muestra propiedades inmobiliarias.
 * Usa react-window para renderizar eficientemente grandes listas.
 * Organiza las propiedades en filas de 3 columnas.
 */
export default function Grid({ dataFiltered }: GridProps) {
    // Calcula el número de filas necesarias basado en 3 columnas por fila
    const rowCount = Math.ceil(dataFiltered.length / GRID_CONFIG.COLUMNS);

    return (
        <main className="max-w-7xl mx-auto pt-3">
            <div className="flex justify-center">
                <VariableSizeGrid
                    columnCount={GRID_CONFIG.COLUMNS}
                    columnWidth={() => GRID_CONFIG.COLUMN_WIDTH}
                    height={GRID_CONFIG.GRID_HEIGHT}
                    rowCount={rowCount}
                    rowHeight={() => GRID_CONFIG.ROW_HEIGHT}
                    width={GRID_CONFIG.GRID_WIDTH}
                    itemData={dataFiltered}
                    style={{
                        overflowX: 'hidden',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                    className="[&::-webkit-scrollbar]:hidden"
                >
                    {Cell}
                </VariableSizeGrid>
            </div>
        </main>
    );
}