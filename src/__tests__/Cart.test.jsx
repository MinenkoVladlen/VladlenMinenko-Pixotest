import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store';
import Cart from '../pages/Cart';

describe('Cart Snapshot', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});