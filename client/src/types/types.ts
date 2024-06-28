export interface DropMenu {
  item: {
  name: string, 
  catFirst: string, 
  catTwo: string,
  linkOne: string,
  linkTwo: string,
};
}


export interface GameCampType {
  id: number;
  title: string;
  location: string;
  date: string;
  description: string;
  gamesHeadliners: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
}


export type User = {
    id: number,
    name: string,
    email: string,
    password: string
};
  
export type AuthState = { 
    user: User | null; 
    setUser: (user: User | null) => void;
};

export const defaultAuthState: AuthState = { 
  user: null, 
  setUser: () => {},
};