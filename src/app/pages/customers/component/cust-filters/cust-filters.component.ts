import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cust-filters',
  templateUrl: './cust-filters.component.html',
  styleUrl: './cust-filters.component.scss',
})
export class CustFiltersComponent {
  @Output() sort = new EventEmitter<string>();
  @Output() order = new EventEmitter<{ sort: string; order: string }>();

  currentSort: string = '';

  emitSort(sort: string) {
    this.sort.emit(sort);
  }

  emitOrder(order: string) {
    this.order.emit({ sort: this.currentSort, order: order });
  }
}
