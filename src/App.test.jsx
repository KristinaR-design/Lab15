import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import App from './App.jsx';

describe('App component', () => {
    test('renders header text', () => {
        render(<App />);
        expect(screen.getByText(/Car Shop/i)).toBeInTheDocument();
    });
});
