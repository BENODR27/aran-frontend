# Aran Frontend IAM Platform

This document is the continuation guide for the Aran Frontend project. It describes the product, architecture, routes, domain relationships, mock-data conventions, current workflows, and rules that developers or AI coding agents must follow.

## Product

Aran Frontend is an Angular enterprise IAM SaaS administration console. It is currently frontend-first: screens are route-connected and powered by typed in-memory mock services, while a shared REST service is prepared for future backend integration.

The platform covers tenants, companies, facilities, applications, users, groups, roles, permissions, subscriptions, plans, features, API management, security, audit logs, notifications, billing, integrations, developer resources, and system settings.

## Technology and commands

- Angular 22 standalone components and lazy-loaded routes
- TypeScript 6, signals, RxJS, and template-driven forms
- Bootstrap 5 with project CSS variables and SCSS
- Vitest/JSDOM test tooling and Prettier

Run from the repository root:

```powershell
npm install
npm start
npm run typecheck
npm run build
npm run build:production
npm run format:check
npm run test:ci
npm run verify
```

`npm run verify` runs typecheck, formatting, tests, and a production build.

## Application shell

The shell is stable and should not be replaced for business-module work.

- `src/app/layouts/main-layout/` contains the authenticated shell.
- `src/app/layouts/auth-layout/` contains authentication layout.
- `src/app/shared/components/` contains reusable UI components.
- The sidebar is fixed; only the main content area scrolls.
- Theme behavior is implemented by `ThemeService`, signals, local storage, and CSS variables.
- Preserve light, dark, and custom theme behavior.

Use shared components such as `PageHeader`, `ContentCard`, `DataTable`, and `StatusBadge` instead of creating duplicates.

## Canonical routes

Top-level lazy routes are defined in `src/app/app.routes.ts`.

| Module | Route |
|---|---|
| Dashboard | `/dashboard` |
| Tenants | `/tenants` |
| Companies | `/companies` |
| Facilities | `/facilities` |
| Applications | `/applications` |
| Users | `/users` |
| Groups | `/groups` |
| Roles | `/roles` |
| Permissions | `/permissions` |
| Subscriptions | `/subscriptions` |
| Plans | `/plans` |
| Features | `/features` |
| API Management | `/api-management` |
| Security Center | `/security/security-center` |
| Audit Logs | `/audit/logs` |
| Notifications | `/notifications` |
| Billing | `/billing` |
| Integrations | `/integrations` |
| Developer Portal | `/developer-portal` |
| System Settings | `/settings` |

Each module normally has a model, service, page TypeScript, template, SCSS, and lazy route file. Static routes such as `create` and relationship tabs must appear before generic `:id` routes.

The lazy `/security` route owns legacy security-prefixed aliases. Do not add duplicate top-level `/security/*` redirects.

## Domain hierarchy

```text
Tenant
  └── Company
        └── Facility
```

Applications, users, groups, roles, permissions, and subscriptions are tenant-scoped. Relationship IDs should always be stored in models; display names may be stored alongside them for readable tables.

### Company creation

Select an existing tenant. A company stores `tenantId` and the tenant display name.

### Facility creation

Select an existing company. A facility stores `companyId` and the company display name.

### User creation

The current workflow is:

1. Select tenant.
2. Select a company filtered to that tenant.
3. Select one or more facilities filtered to that company.
4. Select multiple applications available to that tenant.
5. Enter full name, email, and password.
6. Optionally select multiple compatible groups.

User records store `tenantId`, `companyId`, `facilityIds`, `applicationIds`, `groupIds`, and `passwordSet`. Never store raw passwords.

Groups assigned to multiple applications are excluded from the user group picker. Group selection is optional and does not block creation.

### Group creation

Select one or more applications first, then select roles associated with those applications. Group records store `applicationIds` and `roleIds`.

### Role creation

Role creation requires a role name, a tenant selected from `TenantService`, one or more applications, and one or more permissions available to those applications. The permission picker is grouped by resource and supports expansion and group-level select-all. Role records store `applicationIds` and `permissionIds`.

### Permission creation

Select an application before creating a permission. Resource/action selections can create multiple permission records, all linked to the selected application. Permission records store `applicationIds`.

### Subscription creation

The current workflow is:

1. Select tenant.
2. Select a company filtered to that tenant.
3. Select one or more facilities filtered to that company.
4. Select a plan.
5. Enter a positive maximum-user count.

Subscription records store `tenantId`, `companyId`, `facilityIds`, plan, and `maxUsers`. Legacy singular `facilityId` and `facility` fields remain for compatibility and contain the first selected facility.

## Mock data conventions

Dedicated module services expose signal-backed arrays:

```ts
readonly records = signal<Record[]>([...]);
```

Templates invoke signals:

```html
{{ service.records().length }}
```

Use `update` for collection changes and `find(id)` for detail screens. Creation methods should return the created record so pages can navigate to its detail route.

The generic management module remains a fallback, but dedicated module screens are the primary implementation.

## API-ready boundary

`src/app/shared/services/api/api-resource.service.ts` provides typed `list`, `get`, `create`, `update`, and `remove` methods. Endpoints use:

```text
{environment.apiUrl}/api/{resource}
```

Current environment values are in `src/app/shared/environments/environment.ts`:

- API: `http://10.50.1.225:3000`
- Auth API: `http://10.50.1.225:81`
- Supporting API: `http://10.50.1.225:3003`
- Mock API is disabled by default

When backend integration begins, preserve page contracts and introduce repositories/adapters so pages do not know whether data comes from signals or HTTP. Do not put HTTP calls directly in page components.

## Form and validation rules

- Use selects for existing relationships; never use free-text IDs or names.
- Filter child options from the selected parent.
- Reset dependent selections when a parent changes.
- Use checkboxes for multiple relationships and radio controls only for exactly-one relationships.
- Show explicit validation messages; never silently return from `save()`.
- Validate both record existence and ownership, such as `company.tenantId === tenant.id`.
- Use typed checkbox helpers instead of `$any`:

```ts
protected checked(event: Event): boolean {
  return (event.target as HTMLInputElement).checked;
}
```

## Angular template rules

Angular control flow uses `@if`, `@for`, and `@empty`. `@empty` must be attached directly to its matching `@for`:

```html
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
} @empty {
  <p>No records.</p>
}
```

Do not place `@empty` inside an `@if` or arbitrary nested element.

## Styling and security

- Use existing variables such as `--app-text`, `--app-text-muted`, `--app-border`, `--app-primary`, `--app-surface`, and `--app-surface-muted`.
- Keep all pages responsive and preserve fixed-sidebar behavior.
- Do not introduce another theme system.
- Never commit credentials, tokens, raw passwords, or private keys.
- Keep API URLs in environment configuration.

## Continuation checklist

Before editing:

1. Read the target module model, service, page, template, SCSS, and routes.
2. Search for an existing relationship implementation to reuse.
3. Check `app.routes.ts` and sidebar metadata.
4. Preserve shared components and shell behavior.

After editing:

1. Run diagnostics on every touched module.
2. Run `npm run typecheck`.
3. Run focused tests, then a production build for cross-module model changes.
4. Check Angular control-flow errors, especially `@empty`.
5. Verify dependent selections reset and invalid relationships are rejected.
6. Update this document when routes, domain relationships, or architecture change.

## Known limitations

- Mock data is in-memory and resets on reload.
- Some relationship tabs still render parent collections instead of fully filtered child collections.
- Existing records use a mixture of names and IDs; new work should use IDs.
- Dedicated services do not yet consume `ApiResourceService`.
- Permission creation currently supports multiple records from one form; a backend contract should define whether permission bundles are first-class.
- More route, relationship, theme, and multi-select tests should be added.

## Important files

- `src/app/app.routes.ts` — top-level routes
- `src/app/app.config.ts` — providers and interceptors
- `src/app/shared/services/mock-data/mock-data.service.ts` — sidebar navigation metadata
- `src/app/shared/services/api/api-resource.service.ts` — REST boundary
- `src/app/shared/services/theme/theme.service.ts` — theme state
- `src/app/modules/users/user-page.ts` — user relationship workflow
- `src/app/modules/groups/group-page.ts` — application/role group workflow
- `src/app/modules/roles/role-page.ts` — application/permission role workflow
- `src/app/modules/permissions/permission-page.ts` — application-scoped permissions
- `src/app/modules/subscriptions/subscription-page.ts` — tenant/company/multi-facility subscriptions

---

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
