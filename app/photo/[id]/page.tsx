import { notFound } from 'next/navigation';
import data from '@/db/db.json';
import InfoRealState from "@app/photo/[id]/components/InfoRealState";
import Image from "@app/photo/[id]/components/Image";

interface PhotoPageProps {
    params: { id: string };
}

export default function PhotoPage({ params }: PhotoPageProps) {
    const property = data.find(p => p.id === parseInt(params.id));

    if (!property) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 py-[8rem] px-6">
            {/*Contenedor*/}
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
                    {/*Grid: Imagen e Informacion */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Contenedor de Imagen e Imagen - Lado izquierdo */}
                        <Image property={property} />

                        {/* Información de la propiedad - Lado derecho */}
                        <InfoRealState property={property} />
                    </div>
                </div>
            </div>
        </div>
    );
}
