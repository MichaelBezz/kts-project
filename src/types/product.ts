export type TProductCategory = {
  id: number;
  name: string;
  image: string;
};

export type TProductImages = string[];

export type TProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: TProductCategory;
  images: TProductImages;
};

export type TProducts = TProduct[];
