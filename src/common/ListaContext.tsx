import React, { useContext } from "react";

type ListaContextValue = {
  isAnimated?: boolean;
};

const ListaContext = React.createContext<ListaContextValue>(
  {} as ListaContextValue
);

export function useListaContext() {
  return useContext(ListaContext);
}

type ListaProviderProps = React.PropsWithChildren<ListaContextValue>;

function ListaProvider({ children, ...rest }: ListaProviderProps) {
  return <ListaContext.Provider value={rest}>{children}</ListaContext.Provider>;
}

export default ListaProvider;
