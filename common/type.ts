export interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  storeId: string;
  categoryId: string;
}

export interface Category {
  id: string;
  title: string;
}
