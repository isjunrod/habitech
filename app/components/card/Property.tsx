import Image from "@app/components/card/Image";
import { type Property } from "../../types/types";
import Information from "./Information";

export default function Property({ property }: { property: Property }) {
    return (
        <div className="p-1 bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
            <Image property={property} />
            <Information property={property} />
        </div>
    );
}
