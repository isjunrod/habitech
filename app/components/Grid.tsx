'use client'

import PropertyCard from './card/Property';
import { VariableSizeGrid } from 'react-window';
import { Property } from '../shared/types/types';

const Cell = ({ columnIndex, rowIndex, style, data }: any) => {
    const itemIndex = rowIndex * 3 + columnIndex;
    const property = data[itemIndex];

    if (!property) {
        return <div style={style} />;
    }

    return (
        <div style={{ ...style, padding: '10px' }}>
            <PropertyCard property={property} />
        </div>
    );
}

export default function Grid({ dataFiltered }: { dataFiltered: Property[] }) {
    const rowCount = Math.ceil(dataFiltered.length / 3);

    return (
        <main className="max-w-7xl mx-auto pt-3">
            <div className="flex justify-center">
                <VariableSizeGrid
                    columnCount={3}
                    columnWidth={index => 400}
                    height={800}
                    rowCount={rowCount}
                    rowHeight={index => 400}
                    width={1200}
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
            </div >
        </main>
    );
}