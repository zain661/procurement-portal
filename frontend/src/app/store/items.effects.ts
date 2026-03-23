// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// import { of } from 'rxjs';
// import { AuthService } from '../core/services/auth.service';
// import {
//   loadItems,
//   loadItemsSuccess,
//   loadItemsFailure,
//   createItem,
//   createItemSuccess,
//   createItemFailure,
//   CatalogItem,
// } from './items.actions';

// @Injectable()
// export class ItemsEffects {
//   private apiUrl = 'http://localhost:3333';

//   private getHeaders(): HttpHeaders {
//     const token = this.authService.getToken();
//     return new HttpHeaders({ Authorization: `Bearer ${token}` });
//   }

//   loadItems$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loadItems),
//       mergeMap(() =>
//         this.http
//           .get<CatalogItem[]>(`${this.apiUrl}/items`, {
//             headers: this.getHeaders(),
//           })
//           .pipe(
//             map((items) => loadItemsSuccess({ items })),
//             catchError((error) =>
//               of(loadItemsFailure({ error: error.message }))
//             )
//           )
//       )
//     )
//   );

//   createItem$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(createItem),
//       mergeMap(({ item }) =>
//         this.http
//           .post<CatalogItem>(`${this.apiUrl}/items`, item, {
//             headers: this.getHeaders(),
//           })
//           .pipe(
//             map((newItem) => createItemSuccess({ item: newItem })),
//             catchError((error) =>
//               of(createItemFailure({ error: error.message }))
//             )
//           )
//       )
//     )
//   );

//   constructor(
//     private actions$: Actions,
//     private http: HttpClient,
//     private authService: AuthService
//   ) {}
// }
// import { Injectable} from '@angular/core'; // Added inject for modern debugging
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// import { of } from 'rxjs';
// import { AuthService } from '../core/services/auth.service';
// import * as ItemsActions from './items.actions'; // Shorthand for cleaner code

// @Injectable()
// export class ItemsEffects {
//   private apiUrl = 'http://localhost:3333';

//   // Private helper to ensure headers don't crash if authService is missing
//   private getHeaders(): HttpHeaders {
//     const token = this.authService?.getToken() || '';
//     return new HttpHeaders({ 
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}` 
//     });
//   }

//   loadItems$ = createEffect(() => {
//     // Check if actions$ exists before piping
//     if (!this.actions$) {
//       console.error('NgRx Actions stream is not initialized!');
//       return of(); 
//     }

//     return this.actions$.pipe(
//       ofType(ItemsActions.loadItems),
//       mergeMap(() => {
//         // Safety check for HttpClient
//         if (!this.http) {
//           console.error('HttpClient is missing! Check your app.config.ts');
//           return of(ItemsActions.loadItemsFailure({ error: 'HttpClient missing' }));
//         }

//         return this.http.get<ItemsActions.CatalogItem[]>(`${this.apiUrl}/items`, {
//           headers: this.getHeaders(),
//         }).pipe(
//           map((items) => ItemsActions.loadItemsSuccess({ items })),
//           catchError((error) =>
//             of(ItemsActions.loadItemsFailure({ error: error.message || 'Server Error' }))
//           )
//         );
//       })
//     );
//   });

//   createItem$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(ItemsActions.createItem),
//       mergeMap(({ item }) =>
//         this.http.post<ItemsActions.CatalogItem>(`${this.apiUrl}/items`, item, {
//           headers: this.getHeaders(),
//         }).pipe(
//           map((newItem) => ItemsActions.createItemSuccess({ item: newItem })),
//           catchError((error) =>
//             of(ItemsActions.createItemFailure({ error: error.message }))
//           )
//         )
//       )
//     )
//   );

//   constructor(
//     private actions$: Actions,
//     private http: HttpClient,
//     private authService: AuthService
//   ) {}
// }
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import * as ItemsActions from './items.actions';

@Injectable()
export class ItemsEffects {
  private apiUrl = 'http://localhost:3333';

  // --- 1. MODERN INJECTION (Fixes the Lint Errors) ---
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  // --- 2. HELPER METHODS ---
  private getHeaders(): HttpHeaders {
    // Uses optional chaining to prevent "undefined" crashes
    const token = this.authService?.getToken() || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  // --- 3. EFFECTS LOGIC ---
  loadItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItemsActions.loadItems),
      mergeMap(() => {
        return this.http
          .get<ItemsActions.CatalogItem[]>(`${this.apiUrl}/items`, {
            headers: this.getHeaders(),
          })
          .pipe(
            map((items) => ItemsActions.loadItemsSuccess({ items })),
            catchError((error) =>
              of(
                ItemsActions.loadItemsFailure({
                  error: error.message || 'Failed to load items',
                })
              )
            )
          );
      })
    );
  });

  createItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItemsActions.createItem),
      mergeMap(({ item }) => {
        return this.http
          .post<ItemsActions.CatalogItem>(`${this.apiUrl}/items`, item, {
            headers: this.getHeaders(),
          })
          .pipe(
            map((newItem) => ItemsActions.createItemSuccess({ item: newItem })),
            catchError((error) =>
              of(
                ItemsActions.createItemFailure({
                  error: error.message || 'Failed to create item',
                })
              )
            )
          );
      })
    );
  });

  // Constructor is now empty and can be removed entirely
}