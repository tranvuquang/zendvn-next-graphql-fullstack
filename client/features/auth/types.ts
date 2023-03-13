export type IUser = {
  id: string;
  email: string;
};
export type ICategory = {
  id: string;
  text: string;
};

export type AuthState = {
  user: IUser;
  accessToken: string;
  loading: boolean;
  categories:ICategory[]
};

export const userDefaultData = {
  id: "",
  email: "",
};
