import { createReducer, on } from '@ngrx/store';
import { CatalogItem, loadItems, loadItemsSuccess, loadItemsFailure, createItemSuccess } from './items.actions';

export interface ItemsState {
  items: CatalogItem[];
  loading: boolean;
  error: string | null;
}

export const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

export const itemsReducer = createReducer(
  initialState,
  on(loadItems, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadItemsSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null,
  })),
  on(loadItemsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(createItemSuccess, (state, { item }) => ({
    ...state,
    items: [item, ...state.items],
  }))
);