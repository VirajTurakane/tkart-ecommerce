import { createSelector } from '@reduxjs/toolkit'

const selectProductState = (state) => state.product;

export const selectSingleProduct = createSelector(
    [selectProductState],
    (product) => product.singleProduct
)

export const selectSingleProductLoading = createSelector(
    [selectProductState],
    (product) => product.singleProductLoading
)