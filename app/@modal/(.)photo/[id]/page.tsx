'use client'

import { use, useEffect, useState } from "react";
import { notFound } from 'next/navigation';
import data from '@/db/db.json';
import { fetchProxiedImage } from "@app/@modal/(.)photo/[id]/actions/ProxyImageServerAction";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const ReactPhotoSphereViewer = dynamic(
    () =>
        import("react-photo-sphere-viewer").then(
            (mod) => mod.ReactPhotoSphereViewer
        ),
    {
        ssr: false,
    }
);

interface InterceptedPhotoProps {
    params: Promise<{ id: string }>
}

export default function InterceptedPhoto({ params }: InterceptedPhotoProps) {
    const { id } = use(params)
    const [proxiedImageSrc, setProxiedImageSrc] = useState<string>('');
    const router = useRouter();


    if (isNaN(Number(id))) {
        notFound();
    }

    const property = data.find(p => p.id === Number(id));

    if (!property) {
        notFound();
    }

    useEffect(() => {
        async function getProxiedImageUrl() {
            if (!property) {
                notFound();
            }

            const response = await fetchProxiedImage(property.image);
            const result = await response;

            if (!result) {
                console.error('Failed to fetch proxied image');
                return;
            }

            setProxiedImageSrc(result);
        }

        getProxiedImageUrl();
    }, [property.image]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/80"
                style={{ backdropFilter: 'blur(10px)' }}
            />

            {/* Modal Content */}
            <div className="relative z-10 h-[30rem] w-[50rem] rounded-4xl">
                <div className="w-full h-full rounded-lg overflow-hidden">
                    {/* Boton de cerrar */}
                    <button
                        onClick={() => router.back()}
                        className="cursor-pointer absolute top-6 right-6 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <ReactPhotoSphereViewer
                        src={proxiedImageSrc}
                        height="100%"
                        width="100%"
                        navbar={[
                            'autorotate',
                            'zoom',
                            'fullscreen'
                        ]}
                        touchmoveTwoFingers={true}
                        mousewheelCtrlKey={true}
                        defaultZoomLvl={0}
                        minFov={90}
                    />

                    {/* Descripcion reducida */}
                    <div className="absolute bottom-14 left-4 right-4 max-w-sm bg-white/60 backdrop-blur-lg p-2 rounded-2xl shadow-xl border border-white/20 transition-all duration-300 hover:bg-white/70 hover:shadow-2xl">
                        <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">{property.title}</h2>
                        <p className="text-lg font-semibold text-emerald-600">$ {property.price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}




