export type IUser = {
  id: string;
  email: string;
};
export type ICategory = {
  id: string;
  text: string;
};

export type IFilter = {
  categoryId: string;
  searchStr: string;
  page: number;
  limit: number;
  total: number;
};

export type AuthState = {
  user: IUser;
  accessToken: string;
  loading: boolean;
  categories: ICategory[];
  filter: IFilter;
};

export const userDefaultData = {
  id: "",
  email: "",
};

export const filterDefaultData = {
  categoryId: "",
  searchStr: "",
  page: 1,
  limit: 3,
  total: 10,
};
