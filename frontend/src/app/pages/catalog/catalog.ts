import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../../core/services/auth.service';
import { loadItems, createItem } from '../../store/items.actions';
import {
  selectAllItems,
  selectItemsLoading,
  selectItemsError,
} from '../../store/items.selectors';

@Component({
  selector: 'app-catalog',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class CatalogComponent implements OnInit {
  private store = inject(Store);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  items$;
  loading$;
  error$;

  searchQuery = '';
  showCreateForm = false;
  createForm: FormGroup;
  createLoading = false;
  user: any;

  categories = ['Electronics', 'Furniture', 'Office Supplies', 'Software', 'Services', 'Other'];

  constructor() {
    this.items$ = this.store.select(selectAllItems);
    this.loading$ = this.store.select(selectItemsLoading);
    this.error$ = this.store.select(selectItemsError);
    this.user = this.authService.getUser();

    this.createForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.store.dispatch(loadItems());
  }

  filterItems(items: any[]) {
    if (!this.searchQuery) return items;
    const query = this.searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }

  onCreateSubmit() {
    if (this.createForm.invalid) return;
    this.createLoading = true;

    const { title, description, category, price } = this.createForm.value;

    this.store.dispatch(
      createItem({ item: { title, description, category, price: +price } })
    );

    this.createForm.reset();
    this.showCreateForm = false;
    this.createLoading = false;
  }

  signout() {
    this.authService.signout();
  }
}