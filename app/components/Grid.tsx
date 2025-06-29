import PropertyCard from './PropertyCard';
import data from '@/db/db.json';

export default function PropertyGrid() {
    return (
        <main className="max-w-7xl mx-auto px-6 py-8">
            {/* Grid de propiedades */} 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.map((property) => (
                    <PropertyCard key={property.id} property={property}/>
                ))}
            </div>
        </main>
    );
}
