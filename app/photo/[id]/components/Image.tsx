import React from 'react';
import {PropertyCardProps} from "@app/components/card/types";

function Image({property}: PropertyCardProps) {
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