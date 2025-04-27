import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store';
import ProductDetail from '../pages/ProductDetail';

describe('ProductDetail Snapshot', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <ProductDetail />
                </MemoryRouter>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});