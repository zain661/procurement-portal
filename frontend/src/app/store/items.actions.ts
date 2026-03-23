import { createAction, props } from '@ngrx/store';

export interface CatalogItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  createdBy: any;
  createdAt: string;
}

export interface CreateItemDto {
  title: string;
  description: string;
  category: string;
  price: number;
}

export const loadItems = createAction('[Catalog] Load Items');

export const loadItemsSuccess = createAction(
  '[Catalog] Load Items Success',
  props<{ items: CatalogItem[] }>()
);

export const loadItemsFailure = createAction(
  '[Catalog] Load Items Failure',
  props<{ error: string }>()
);

export const createItem = createAction(
  '[Catalog] Create Item',
  props<{ item: CreateItemDto }>()
);

export const createItemSuccess = createAction(
  '[Catalog] Create Item Success',
  props<{ item: CatalogItem }>()
);

export const createItemFailure = createAction(
  '[Catalog] Create Item Failure',
  props<{ error: string }>()
);