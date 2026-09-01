export interface Category {
  id: number;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  parent?: Pick<Category, 'id' | 'name' | 'slug'>;
  children?: Category[];
  productCount?: number;
}
