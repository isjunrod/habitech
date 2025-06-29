export interface FilterData {
  city: string;
  type: string;
  precioMin: string;
  precioMax: string;
  rooms: string;
  square_meters: string;
  guests: string;
}

export interface Property {
  id: number;
  title: string;
  city: string;
  type: string;
  price: number;
  rooms: number;
  square_meters: number;
  guests: number;
  image: string;
  isFavorite: boolean;
}
