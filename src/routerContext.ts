import { createContext, useContext } from 'react';

export type RoutePath = '/' | '/work';

export interface RouterContextType {
  path: RoutePath;
  navigate: (to: string, options?: { replace?: boolean; scroll?: boolean }) => void;
}

export const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {}
});

export function useRouter() {
  return useContext(RouterContext);
}
