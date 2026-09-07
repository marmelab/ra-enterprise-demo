import { reactRouterProvider } from 'react-admin';
import { tanStackRouterProvider } from 'ra-router-tanstack';

/**
 * Set VITE_ROUTER=tanstack to run the demo on TanStack Router.
 * `undefined` leaves react-admin's default in place.
 */
export const routerProvider =
    import.meta.env.VITE_ROUTER === 'tanstack'
        ? tanStackRouterProvider
        : undefined;

// Must come from the provider in use: react-admin splices `<CustomRoutes>`
// children into the provider's own `<Routes>`.
export const Route = (routerProvider ?? reactRouterProvider).Route;
