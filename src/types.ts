export type Category = 'All' | 'Living Room' | 'Bedroom' | 'Dining' | 'Outdoor' | 'Office' | 'Sofas';

export interface ProductDimensions {
  width: string;
  depth: string;
  height: string;
  seatHeight?: string;
  weight?: string;
  seatingCapacity?: string;
}

export interface MaterialDetails {
  primaryMaterial: string;
  secondaryMaterial?: string;
  finish?: string;
  rubCount?: string;
  warranty: string;
  assembly: string;
  careInstructions?: string;
}

export interface CloseUpImage {
  label: string;
  description: string;
  url: string;
}

export interface CustomSofaDesign {
  id: string;
  name: string;
  price: string;
  savedAt: string;
  image: string;
  selections: {
    upholstery: { id: string; name: string; color: string; quality: string; description: string };
    sofaFoam: { id: string; name: string; quality: string; description: string };
    bedFoam: { id: string; name: string; quality: string; description: string };
    structure: { id: string; name: string; quality: string; description: string };
    legs: { id: string; name: string; image: string };
    pillows: { id: string; name: string; count: number };
    covers: { id: string; name: string; quality: string; description: string };
    pillowCovers: { id: string; name: string; description: string };
  };
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: string;
  image: string;
  description: string;
  rating: number;
  featured?: boolean;
  dimensions?: ProductDimensions;
  materialDetails?: MaterialDetails;
  closeUpImages?: CloseUpImage[];
  customOptions?: {
    upholstery?: string;
    sofaFoam?: string;
    bedFoam?: string;
    structure?: string;
    legs?: string;
    pillowCovers?: string;
    covers?: string;
    pillows?: string;
    [key: string]: string | undefined;
  };
}
