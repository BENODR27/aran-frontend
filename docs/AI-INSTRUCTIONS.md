# AI Development Instructions

This file is the operating contract for any AI assistant continuing development of the Aran Frontend IAM platform.

## Mission

Maintain and extend the Angular IAM administration console without breaking the existing shell, routing, relationship model, theme system, or mock-data behavior.

Deliver complete, working changes rather than suggestions only. Inspect the relevant code first, implement the smallest complete solution, and validate it before reporting completion.

## Project context

- Framework: Angular 22 with standalone components
- Language: TypeScript 6
- State pattern: Angular signals
- Forms: Angular `FormsModule` and template-driven forms
- Styling: Bootstrap 5, SCSS, and project CSS variables
- Data: frontend-only in-memory mock services
- API boundary: `src/app/shared/services/api/api-resource.service.ts`
- Main shell: `src/app/layouts/main-layout/`
- Business modules: `src/app/modules/`

The app is an enterprise IAM platform with these modules:

Dashboard, Tenants, Companies, Facilities, Applications, Users, Groups, Roles, Permissions, Subscriptions, Plans, Features, API Management, Security Center, Audit Logs, Notifications, Billing, Integrations, Developer Portal, and System Settings.

## Mandatory workflow

Before changing code:

1. Read the target module's model, service, page TypeScript, template, SCSS, and route file.
2. Inspect related services when the task changes a relationship.
3. Search for an existing implementation pattern before adding new logic.
4. Check `src/app/app.routes.ts` and sidebar route metadata.
5. Identify all files affected by the change.

While changing code:

1. Preserve existing shell and shared component behavior.
2. Keep business logic in feature pages/services, not shared presentation components.
3. Use existing services and helpers instead of duplicating logic.
4. Keep types explicit and avoid `any`, broad casts, and silent fallbacks.
5. Show validation errors instead of silently returning.
6. Keep relationship IDs in records and display names for readable UI.
7. Reset dependent selections when a parent selection changes.

After changing code:

1. Run diagnostics for every touched module.
2. Run `npm run typecheck`.
3. Run focused tests when available.
4. Run `npm run build:production` after cross-module model or route changes.
5. Check Angular template control-flow diagnostics.
6. Verify the requested relationship and validation behavior, not just compilation.
7. Update `docs/README.md` when architecture, routes, relationships, or workflows change.

## Do not change

Do not change these areas unless the user explicitly requests it:

- Authentication layout and login behavior
- Main application shell
- Header and sidebar structure
- Fixed-sidebar/main-content scrolling behavior
- Existing theme architecture
- Global navigation labels and canonical routes
- API URLs or credentials
- Unrelated pre-existing issues

Do not remove existing compatibility redirects without checking route matching behavior.

## Canonical routes

Use these routes for new navigation:

```text
/dashboard
/tenants
/companies
/facilities
/applications
/users
/groups
/roles
/permissions
/subscriptions
/plans
/features
/api-management
/security/security-center
/audit/logs
/notifications
/billing
/integrations
/developer-portal
/settings
```

Route ordering matters. Put static routes such as `create` and relationship tabs before `:id` routes.

The lazy `/security` route owns legacy security-prefixed redirects. Do not add duplicate top-level security aliases.

## Relationship rules

### Tenant, company, facility

```text
Tenant
  └── Company
        └── Facility
```

- Company creation must select a tenant.
- Facility creation must select a company.
- Company options must be filtered by tenant.
- Facility options must be filtered by company.
- Validate ownership before saving:

```ts
company.tenantId === tenant.id
facility.companyId === company.id
```

### User creation

The required order is:

1. Tenant
2. Company belonging to tenant
3. One or more facilities belonging to company
4. One or more applications belonging to tenant
5. Full name, email, password
6. Optional one or more compatible groups

Users persist:

- `tenantId`
- `companyId`
- `facilityIds`
- `applicationIds`
- `groupIds`
- `passwordSet`

Never store raw passwords. Group selection is optional. Groups assigned to multiple applications are not eligible in the user picker.

### Group creation

1. Select one or more applications.
2. Show roles related to selected applications.
3. Allow multiple role selections.
4. Persist `applicationIds` and `roleIds`.

### Role creation

1. Select a tenant from `TenantService`.
2. Select one or more applications.
3. Show permissions related to selected applications.
4. Allow multiple permission selections.
5. Persist `applicationIds` and `permissionIds`.

At least one application and one permission are required. Use expandable resource groups and group-level select-all controls.

### Permission creation

1. Select an application first.
2. Select resource/action permissions.
3. Create one or more permission records linked to the selected application.

### Subscription creation

1. Select tenant.
2. Select company filtered by tenant.
3. Select one or more facilities filtered by company.
4. Select plan.
5. Enter a positive whole-number maximum-user limit.

Persist `tenantId`, `companyId`, `facilityIds`, `plan`, and `maxUsers`. Keep legacy singular facility fields only for compatibility.

## Forms and controls

Use:

- Native `select` for one existing relationship
- Checkbox lists for multiple relationships
- Radio buttons only when exactly one item is allowed
- Expandable sections for long permission, facility, application, and group lists

For checkbox events, use a typed helper:

```ts
protected checked(event: Event): boolean {
  return (event.target as HTMLInputElement).checked;
}
```

Avoid `$any($event.target)` unless there is no typed alternative.

Every invalid state must show an explicit message through a signal or existing notification pattern. Never silently do nothing in `save()`.

## Angular template rules

Use Angular control flow:

```html
@if (condition) {
  ...
} @else {
  ...
}

@for (item of items; track item.id) {
  ...
} @empty {
  ...
}
```

`@empty` must be directly attached to its `@for`. Never place `@empty` inside an `@if`, nested element, or unrelated block.

Use signal calls in templates:

```html
{{ service.records().length }}
```

## Mock services

Dedicated services normally expose signal-backed collections:

```ts
readonly records = signal<Record[]>([...]);
```

Use:

- `find(id)` for detail lookup
- `update()` for collection changes
- returned created records for post-create navigation

Do not move mock data into page components.

## API integration rules

Use `ApiResourceService` as the future HTTP boundary. Do not put direct `HttpClient` calls in page components.

Endpoint convention:

```text
{environment.apiUrl}/api/{resource}
```

When replacing mock data with HTTP:

1. Preserve page-facing interfaces.
2. Add a service/repository adapter.
3. Keep mock mode available for local development.
4. Surface HTTP errors explicitly.
5. Do not use success-shaped fallback data after a failed request.

## UI and styling rules

Use existing CSS variables:

- `--app-text`
- `--app-text-muted`
- `--app-border`
- `--app-primary`
- `--app-surface`
- `--app-surface-muted`

Preserve:

- Responsive layout
- Fixed sidebar
- Main-content-only scrolling
- Light, dark, and custom themes
- Existing shared component styling

Use `PageHeader`, `ContentCard`, `DataTable`, and `StatusBadge` where appropriate.

## Security rules

- Never commit credentials or tokens.
- Never store raw passwords.
- Never expose sensitive data in logs or documentation.
- Keep API endpoints in environment configuration.
- Validate every cross-entity relationship before creating records.
- Do not weaken authentication or authorization behavior.

## Validation commands

Use the smallest relevant command first:

```powershell
npm run typecheck
npm run format:check
npm run test:ci
npm run build:production
```

For a complete verification:

```powershell
npm run verify
```

## Completion report

At the end of each task, report:

1. What changed.
2. Which files changed.
3. Relationship and validation behavior implemented.
4. Diagnostics/tests/build commands run.
5. Any known limitation that remains.

Use absolute Markdown links to files when reporting changes.

## Current known limitations

- Mock data resets on reload.
- Some relationship tabs still show parent collections instead of fully filtered child collections.
- Existing records may contain display-name-only relationships; new changes should add IDs.
- Dedicated services are not yet backed by `ApiResourceService`.
- Permission creation supports multiple records from one form; backend semantics should be confirmed later.
- More route and relationship tests are needed.

