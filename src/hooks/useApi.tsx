import { ParentComponent, createContext, useContext } from "solid-js";
import { Container } from "inversify";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

const ApiContext = createContext<Container>()

const queryClient = new QueryClient()

export const ApiProvider: ParentComponent<{ value: Container }> = (props) => {

    return <QueryClientProvider client={queryClient}>
        <ApiContext.Provider value={props.value}>
            {props.children}
        </ApiContext.Provider>
    </QueryClientProvider>
}

export function useApi() {
    return useContext(ApiContext) as Container
}
