import React from 'react';
import { Property } from '../../../shared/types/types';

function Image({ property }: { property: Property }) {
    return (
        <div className="relative h-96 lg:h-[600px]">
            <img
                className="object-cover w-full h-full"
                src={property.image}
                alt={property.title}
            />
        </div>
    );
}

export default Image;