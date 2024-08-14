import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const query = new QueryClient({
    defaultOptions: {
        queries: {
            // In case of error, we don't want server
            // to overload with retries, with cost per
            // request payment structure, this is not
            // optimal.
            retry: false,

            // User may be working on multiple things
            // at any given time. So setting this to
            // true, will result in multiper server
            // hits. We are not expecting the data to
            // be updated frequently any ways.
            refetchOnWindowFocus: false,

            // We don't expect the data will be updated
            // from multiple clients, so it does not makes
            // sence to mark the data stale ever, unless
            // we are making any changes. So by default we
            // will make the cache never stale .. and when
            // we update the data (create, delete or update)
            // we will make the cache invalid.
            staleTime: Infinity
        },
    },
});
const GenericBodyCard = ({ children }) => {
    return (<QueryClientProvider client={query}>
        {children}
    </QueryClientProvider>)
}
export default GenericBodyCard;