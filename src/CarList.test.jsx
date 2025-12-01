import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Carlist from './components/CarList.jsx';


const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false },
    },
});


const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
);

describe('Carlist tests', () => {
   
    test('shows Loading initially', () => {
        render(<Carlist />, { wrapper });
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });


    test('shows error when fetching cars fails', async () => {
        render(<Carlist />, { wrapper });

        await waitFor(() => {
            expect(
                screen.getByText(/Error when fetching cars\.\.\./i)
            ).toBeInTheDocument();
        });
    });
});
