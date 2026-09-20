# Shared component library

Reusable standalone components live in `src/app/shared/components` and are exported from `src/app/shared/components/index.ts`.

## Import pattern

Import only the components a feature uses:

```ts
import {
  ActionToolbar,
  ContentCard,
  DataTable,
  EmptyState,
  LoadingState,
  PageHeader,
  StatusBadge,
} from '../shared/components';

@Component({
  standalone: true,
  imports: [ActionToolbar, ContentCard, DataTable, PageHeader, StatusBadge],
  // ...
})
export class OrdersPage {}
```

## PageHeader

Use it as the consistent page-level heading. Any projected content becomes the action area.

```html
<app-page-header
  eyebrow="Operations"
  title="Orders"
  description="Review and manage customer orders."
>
  <button class="btn btn-primary" type="button" (click)="createOrder()">Create order</button>
</app-page-header>
```

## ContentCard

Use cards to group related information. Set `padded` to `false` when the content already controls its own spacing, such as a table.

```html
<app-content-card title="Order summary" description="Current order totals.">
  <button card-actions class="btn btn-sm btn-outline-secondary" type="button">Export</button>
  <div class="row g-3">
    <div class="col-md-4">Total: {{ total }}</div>
    <div class="col-md-4">Pending: {{ pending }}</div>
  </div>
</app-content-card>
```

## StatusBadge

Use a semantic tone instead of duplicating status colors in feature styles.

```html
<app-status-badge label="Approved" tone="success" />
<app-status-badge label="Pending review" tone="warning" />
<app-status-badge label="Rejected" tone="danger" />
```

Available tones: `success`, `warning`, `danger`, `info`, and `neutral`.

## Alert

Use alerts for persistent contextual feedback. The body is projected so feature-specific details stay outside the shared component.

```html
<app-alert
  title="Import complete"
  tone="success"
  [dismissible]="true"
  (dismiss)="showImportAlert = false"
>
  125 records were imported successfully.
</app-alert>
```

## Modal

Render the modal conditionally from the feature and close it through its output. Keep submit and domain logic in the parent.

```html
@if (showDeleteDialog) {
<app-modal title="Delete order" (close)="showDeleteDialog = false">
  <p>This action cannot be undone.</p>
  <div modal-footer>
    <button class="btn btn-light" type="button" (click)="showDeleteDialog = false">Cancel</button>
    <button class="btn btn-danger" type="button" (click)="deleteOrder()">Delete</button>
  </div>
</app-modal>
}
```

## FormField

Wrap native inputs to standardize labels, required markers, and hint text. Set the input `id` to the same value as `inputId`.

```html
<app-form-field
  label="Email address"
  inputId="email"
  hint="Use your company email."
  [required]="true"
>
  <input id="email" class="form-control" type="email" autocomplete="email" />
</app-form-field>
```

## Breadcrumbs

Use typed breadcrumb items and handle navigation in the feature or route facade.

```ts
readonly breadcrumbs: readonly BreadcrumbItem[] = [
  { label: 'Home', url: '/' },
  { label: 'Orders', url: '/orders' },
  { label: 'Details' },
];
```

```html
<app-breadcrumbs [items]="breadcrumbs" (navigate)="router.navigateByUrl($event.url!)" />
```

## Avatar

Provide a user name for accessible labeling and initials fallback. An image is optional.

```html
<app-avatar name="Beno David" image="/assets/users/beno.jpg" size="md" />
```

## Skeleton

Use skeletons while a page loads when the final layout is known.

```html
<app-skeleton width="70%" height="1.25rem" /> <app-skeleton height="8rem" />
```

## ActionToolbar

Use it above tables and lists to keep filters and actions aligned.

```html
<app-action-toolbar>
  <input toolbar-filters class="form-control" placeholder="Filter orders" />
  <button toolbar-actions class="btn btn-primary" type="button">Create order</button>
</app-action-toolbar>
```

## DataTable

See the existing [data table documentation](../README.md#enterprise-data-table) for typed columns, pagination, sorting, searching, selection, loading, and empty states.

## Design rules

- Prefer Bootstrap utility classes for layout (`row`, `col-*`, `gap-*`, `p-*`, `d-flex`).
- Keep business logic in feature components and keep shared components presentation-focused.
- Use `OnPush` change detection and signal inputs for new shared components.
- Use projected slots for feature-specific actions instead of adding feature-specific inputs.
- Use semantic labels and native buttons/inputs to preserve keyboard accessibility.
