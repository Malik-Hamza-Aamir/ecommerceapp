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

export interface Address {
  id: string;
  street: string;
  city: string;
  stateProvince: string;
  country: string;
  zip: string;
  addressType: string;
}
