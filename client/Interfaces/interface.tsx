export interface Podstars {
  photo: string;
  name: string;
}

export interface StorageType {
  userID: string;
  userName: string;
}
export interface PageProps {
  authStatus: boolean;
  storage: StorageType | null;
}
