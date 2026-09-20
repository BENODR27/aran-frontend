import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface MockRecord {
  id: number;
  name: string;
  title: string;
  description: string;
  status: 'active' | 'pending' | 'inactive';
  permissions: {
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

const DEFAULT_PERMISSIONS = {
  read: true,
  create: true,
  update: true,
  delete: true,
};

const NAME_PARTS = [
  'Amina',
  'Benoit',
  'Chloe',
  'Dario',
  'Elena',
  'Farah',
  'Gabriel',
  'Hana',
  'Ibrahim',
  'Jules',
];

const records = new Map<string, MockRecord[]>();

export function MockApiInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const config = environment.mockApi;
  if (!config?.enabled || !isMockableUrl(req.url)) {
    return next(req);
  }

  const permissions = { ...DEFAULT_PERMISSIONS, ...config.permissions };
  const operation = operationFor(req.method);
  if (operation && !permissions[operation]) {
    return mockError(403, `Mock permission denied for ${operation}.`);
  }

  const response = handleRequest(req, permissions);
  const latency = Math.max(0, config.latencyMs ?? 0);
  return of(new HttpResponse({ status: 200, body: response })).pipe(delay(latency));
}

function isMockableUrl(url: string): boolean {
  return url.startsWith(environment.apiUrl) || url.startsWith(environment.authApiUrl);
}

function operationFor(method: string): keyof typeof DEFAULT_PERMISSIONS | undefined {
  switch (method) {
    case 'GET':
      return 'read';
    case 'POST':
      return 'create';
    case 'PUT':
    case 'PATCH':
      return 'update';
    case 'DELETE':
      return 'delete';
    default:
      return undefined;
  }
}

function handleRequest(
  req: HttpRequest<unknown>,
  permissions: typeof DEFAULT_PERMISSIONS,
): unknown {
  const path = new URL(req.url).pathname.split('/').filter(Boolean);
  const resource = path.at(-1) ?? 'items';
  const id = Number(path.at(-1));
  const resourceName = Number.isNaN(id) ? resource : (path.at(-2) ?? 'items');
  const data = getRecords(resourceName, permissions);

  if (req.method === 'GET') {
    return Number.isNaN(id) ? data : (data.find((record) => record.id === id) ?? null);
  }

  if (req.method === 'POST' && Number.isNaN(id)) {
    const created = createRecord(resourceName, req.body, permissions);
    data.push(created);
    return created;
  }

  if (req.method === 'PUT' || req.method === 'PATCH') {
    const existing = data.find((record) => record.id === id);
    if (!existing) {
      return null;
    }
    Object.assign(existing, isObject(req.body) ? req.body : {});
    existing.updatedAt = new Date().toISOString();
    return existing;
  }

  if (req.method === 'DELETE') {
    const index = data.findIndex((record) => record.id === id);
    if (index >= 0) {
      data.splice(index, 1);
    }
    return null;
  }

  return isObject(req.body) ? req.body : {};
}

function getRecords(resource: string, permissions: typeof DEFAULT_PERMISSIONS): MockRecord[] {
  const existing = records.get(resource);
  if (existing) {
    return existing;
  }

  const generated = Array.from({ length: 8 }, (_, index) =>
    createRecord(resource, undefined, permissions, index + 1),
  );
  records.set(resource, generated);
  return generated;
}

function createRecord(
  resource: string,
  body: unknown,
  permissions: typeof DEFAULT_PERMISSIONS,
  id = nextId(resource),
): MockRecord {
  const name = `${NAME_PARTS[(id - 1) % NAME_PARTS.length]} ${resourceLabel(resource)} ${id}`;
  const supplied = isObject(body) ? body : {};
  const now = new Date().toISOString();
  return {
    name,
    title: `${resourceLabel(resource)} ${id}`,
    description: `Mock ${resourceLabel(resource).toLowerCase()} content for integration testing.`,
    status: id % 3 === 0 ? 'pending' : id % 2 === 0 ? 'inactive' : 'active',
    permissions,
    createdAt: now,
    updatedAt: now,
    ...supplied,
    id,
  };
}

function nextId(resource: string): number {
  return (records.get(resource)?.reduce((max, record) => Math.max(max, record.id), 0) ?? 0) + 1;
}

function resourceLabel(resource: string): string {
  const label = resource.replace(/[-_]/g, ' ').replace(/s$/, '');
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function mockError(status: number, message: string): Observable<never> {
  return throwError(
    () =>
      new HttpErrorResponse({
        status,
        statusText: status === 403 ? 'Forbidden' : 'Bad Request',
        error: { message },
      }),
  );
}
