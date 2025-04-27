import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store';
import Home from '../pages/Home';

describe('Home Snapshot', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});