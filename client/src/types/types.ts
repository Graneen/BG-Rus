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