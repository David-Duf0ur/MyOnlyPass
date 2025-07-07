export interface IUser {
  id_user: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface ICredential {
  _id: string;
  vaultId: number;
  title: string;
  category: string;
  userId: number;
  passwordEncrypted: string;
  mail: string;
  url: string;
  iconify: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IFields {
  name: string;
  value: string;
}

