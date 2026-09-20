import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { EmptyState } from '../empty-state/empty-state';
import { LoadingState } from '../loading-state/loading-state';

export interface DataTableColumn<T extends object> {
  readonly key: keyof T & string;
  readonly header: string;
  readonly width?: string;
  readonly sortable?: boolean;
  readonly format?: (value: T[keyof T], row: T) => string;
}

type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-data-table',
  imports: [EmptyState, LoadingState],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTable<T extends object> {
  readonly rows = input<readonly T[]>([]);
  readonly columns = input.required<readonly DataTableColumn<T>[]>();
  readonly loading = input(false);
  readonly searchable = input(true);
  readonly selectable = input(false);
  readonly pageSize = input(10);
  readonly searchPlaceholder = input('Search records...');
  readonly emptyTitle = input('No records found');
  readonly emptyDescription = input('Try changing your search or filters.');
  readonly rowLabel = input('record');
  readonly rowKey = input<(row: T) => string | number>((row) => JSON.stringify(row));

  readonly rowClick = output<T>();
  readonly selectionChange = output<readonly T[]>();

  protected readonly searchTerm = signal('');
  protected readonly currentPage = signal(1);
  protected readonly sortKey = signal<keyof T | null>(null);
  protected readonly sortDirection = signal<SortDirection>('asc');
  protected readonly selectedKeys = signal<ReadonlySet<string | number>>(new Set());

  protected readonly filteredRows = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const rows = this.rows();
    if (!term) {
      return rows;
    }

    return rows.filter((row) =>
      this.columns().some((column) =>
        String(this.valueFor(row, column)).toLowerCase().includes(term),
      ),
    );
  });

  protected readonly sortedRows = computed(() => {
    const key = this.sortKey();
    const rows = [...this.filteredRows()];
    if (!key) {
      return rows;
    }

    const direction = this.sortDirection() === 'asc' ? 1 : -1;
    return rows.sort((left, right) => {
      const leftValue = String(left[key] ?? '').toLowerCase();
      const rightValue = String(right[key] ?? '').toLowerCase();
      return leftValue.localeCompare(rightValue, undefined, { numeric: true }) * direction;
    });
  });

  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.sortedRows().length / Math.max(1, this.pageSize()))),
  );

  protected readonly visibleRows = computed(() => {
    const size = Math.max(1, this.pageSize());
    const start = (this.currentPage() - 1) * size;
    return this.sortedRows().slice(start, start + size);
  });

  protected readonly firstVisibleRow = computed(() =>
    this.sortedRows().length === 0 ? 0 : (this.currentPage() - 1) * this.pageSize() + 1,
  );

  protected readonly lastVisibleRow = computed(() =>
    Math.min(this.currentPage() * this.pageSize(), this.sortedRows().length),
  );

  protected readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, index) => index + 1),
  );

  protected setSearchTerm(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
    this.currentPage.set(1);
  }

  protected sortBy(column: DataTableColumn<T>): void {
    if (column.sortable === false) {
      return;
    }

    if (this.sortKey() === column.key) {
      this.sortDirection.update((direction) => (direction === 'asc' ? 'desc' : 'asc'));
      return;
    }

    this.sortKey.set(column.key);
    this.sortDirection.set('asc');
  }

  protected setPage(page: number): void {
    this.currentPage.set(Math.min(Math.max(page, 1), this.totalPages()));
  }

  protected valueFor(row: T, column: DataTableColumn<T>): string {
    const value = row[column.key];
    return column.format ? column.format(value, row) : String(value ?? '');
  }

  protected isSelected(row: T): boolean {
    return this.selectedKeys().has(this.rowKey()(row));
  }

  protected toggleSelection(row: T): void {
    const key = this.rowKey()(row);
    const next = new Set(this.selectedKeys());
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    this.selectedKeys.set(next);
    this.emitSelection(next);
  }

  protected toggleAllVisible(): void {
    const next = new Set(this.selectedKeys());
    const allSelected = this.visibleRows().every((row) => next.has(this.rowKey()(row)));
    this.visibleRows().forEach((row) => {
      const key = this.rowKey()(row);
      if (allSelected) {
        next.delete(key);
      } else {
        next.add(key);
      }
    });
    this.selectedKeys.set(next);
    this.emitSelection(next);
  }

  protected allVisibleSelected(): boolean {
    const rows = this.visibleRows();
    return rows.length > 0 && rows.every((row) => this.isSelected(row));
  }

  protected selectionLabel(): string {
    const count = this.selectedKeys().size;
    return `${count} ${this.rowLabel()}${count === 1 ? '' : 's'} selected`;
  }

  private emitSelection(keys: ReadonlySet<string | number>): void {
    this.selectionChange.emit(this.rows().filter((row) => keys.has(this.rowKey()(row))));
  }
}
