import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { environment } from '../../environments/environment';
import {
  loadItems,
  loadItemsSuccess,
  loadItemsFailure,
  createItem,
  createItemSuccess,
  createItemFailure,
  CatalogItem,
} from './items.actions';

@Injectable()
export class ItemsEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private apiUrl = environment.apiUrl;

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItems),
      mergeMap(() =>
        this.http
          .get<CatalogItem[]>(`${this.apiUrl}/items`, {
            headers: this.getHeaders(),
          })
          .pipe(
            map((items) => loadItemsSuccess({ items })),
            catchError((error) =>
              of(loadItemsFailure({ error: (error as Error).message }))
            )
          )
      )
    )
  );

  createItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createItem),
      mergeMap(({ item }) =>
        this.http
          .post<CatalogItem>(`${this.apiUrl}/items`, item, {
            headers: this.getHeaders(),
          })
          .pipe(
            map((newItem) => createItemSuccess({ item: newItem })),
            catchError((error) =>
              of(createItemFailure({ error: (error as Error).message }))
            )
          )
      )
    )
  );
}
