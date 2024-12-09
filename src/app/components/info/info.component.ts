import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DataItem } from '../../interfaces/DataItem';
import { NgForOf, NgIf } from '@angular/common';
import { LoaderService } from '../../services/loader.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  dataItems: DataItem[] = [];
  filteredItems: DataItem[] = [];
  columns = [
    { key: 'isActive', label: 'Status', visible: true },
    { key: 'balance', label: 'Balance', visible: true },
    { key: 'picture', label: 'Picture', visible: true },
    { key: 'age', label: 'Age', visible: true },
    { key: 'name.first', label: 'First Name', visible: true },
    { key: 'name.last', label: 'Last Name', visible: true },
    { key: 'company', label: 'Company', visible: true },
    { key: 'email', label: 'Email', visible: true },
    { key: 'address', label: 'Address', visible: true },
    { key: 'tags', label: 'Tags', visible: true },
    { key: 'favoriteFruit', label: 'Favorite Fruit', visible: true },
  ];

  sortField: string | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  searchField = 'name.first';
  searchValue = '';

  constructor(
    private dataService: DataService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.show();

    this.dataService.fetchData().then((response) => {
      this.filteredItems = this.dataItems = response.map((item) => ({
        ...item,
        name: {
          first: item.name?.first ?? 'Unknown',
          last: item.name?.last ?? 'Unknown',
        },
        tags: item.tags ?? [],
        balance: item.balance ?? '$0.00',
        company: item.company ?? 'Unknown',
        email: item.email ?? 'Unknown',
      }));
      this.totalItems = this.dataItems.length;
      this.loaderService.hide();
    });
  }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.sortedItems.slice(start, end);
  }

  get sortedItems() {
    if (!this.sortField) {
      return this.filteredItems;
    }

    return [...this.filteredItems].sort((a, b) => {
      const fieldValueA = this.getFieldValue(a, this.sortField!);
      const fieldValueB = this.getFieldValue(b, this.sortField!);

      if (fieldValueA < fieldValueB) return this.sortOrder === 'asc' ? -1 : 1;
      if (fieldValueA > fieldValueB) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  sort(field: string) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  updatePagination(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = Number(target.value);
    if (!isNaN(value) && value > 0) {
      this.itemsPerPage = value;
      this.currentPage = 1;
    }
  }

  getFieldValue(item: any, field: string): any {
    return field.split('.').reduce((obj, key) => obj?.[key], item);
  }

  performSearch(): void {
    this.filteredItems = this.dataItems.filter((item) => {
      const fieldValue = this.getFieldValue(item, this.searchField);
      return fieldValue
        ?.toString()
        .toLowerCase()
        .includes(this.searchValue.toLowerCase());
    });
  }

  resetFilter() {
    this.searchValue = '';
    this.searchField = 'name.first';
    this.filteredItems = this.dataItems;
  }
}
