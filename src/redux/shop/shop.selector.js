import {createSelector} from 'reselect';


const selectshop = (state) => state.shop;

export const selectCollections = createSelector(
    [selectshop],
    shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
        )

export const selectCollectionFetching = createSelector(
    [selectshop],
    shop => shop.isFetching

)

export const selectCollectionIsLoaded = createSelector(
    [selectshop],
    shop => !!shop.collections
)