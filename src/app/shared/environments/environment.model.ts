export interface Environment {
  readonly production: boolean;
  readonly apiUrl: string;
  readonly authApiUrl: string;
  readonly SS_API_URL: string;
  readonly mockApi?: MockApiConfig;
}

export interface MockApiConfig {
  readonly enabled: boolean;
  readonly latencyMs?: number;
  readonly permissions?: Partial<MockPermissions>;
}

export interface MockPermissions {
  readonly read: boolean;
  readonly create: boolean;
  readonly update: boolean;
  readonly delete: boolean;
}
