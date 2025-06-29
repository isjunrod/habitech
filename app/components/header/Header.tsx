
import { FilterData } from "../../types/types";
import Filters from "./Filters";

export interface Props {
    appliedFilters: FilterData
    handleOpenFilterModal: () => void;
    onFilterChange: (field: keyof FilterData, value: string) => void;
}

function Header({ appliedFilters, handleOpenFilterModal, onFilterChange }: Props) {

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                {/* Casa simple - solo contorno */}
                                <path d="M16 6L26 14V26H6V14L16 6Z" stroke="#000000" strokeWidth="2" fill="black"
                                    strokeLinejoin="round" />
                            </svg>
                            <span className="text-black font-bold text-2xl tracking-tight">Habitech</span>
                        </div>
                    </div>

                    <Filters
                        appliedFilters={appliedFilters}
                        onFilterChange={onFilterChange}
                        handleOpenFilterModal={handleOpenFilterModal}
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;