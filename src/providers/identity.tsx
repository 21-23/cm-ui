import { createContext, FunctionalComponent } from 'preact';
import { useContext, useEffect, useState } from "preact/hooks";

import type { UserType } from '../types/types';
import { fetchUser } from '../services/user';

type IdentityContextType = {
  user: UserType | null,
};

const CONTEXT_DEFAULT: IdentityContextType = {
  user: null,
};
const Identity = createContext<IdentityContextType>(CONTEXT_DEFAULT);

export const IdentityProvider: FunctionalComponent<{}> = ({ children }) => {
  const [identity, setIdentity] = useState<IdentityContextType>(CONTEXT_DEFAULT);

  useEffect(() => {
    fetchUser().then((user) => {
      setIdentity({ ...identity, user });
    }, (error) => {
      console.log('Failed to fetch user', error);
    })
  }, []);

  return (
    <Identity.Provider value={identity}>
      {children}
    </Identity.Provider>
  );
}

export function useIdentity(): IdentityContextType {
  return useContext(Identity);
}
