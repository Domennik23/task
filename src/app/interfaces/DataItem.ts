export interface DataItem {
  [key: string]: any;
  _id: string;
  isActive: boolean;
  balance?: string;
  picture: string;
  age: number;
  name: {
    first?: string;
    last?: string;
  };
  company?: string;
  email?: string;
  address: string;
  tags?: string[] | null;
  favoriteFruit: string;
}
