export interface ManagementRow {
  readonly id: string;
  readonly name: string;
  readonly status: string;
  readonly owner: string;
  readonly updated: string;
}

export interface ManagementConfig {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly eyebrow: string;
  readonly columns: readonly { key: keyof ManagementRow & string; header: string }[];
  readonly fields: readonly { key: string; label: string; placeholder: string }[];
  readonly tabs: readonly { label: string; path: string }[];
  readonly rows: readonly ManagementRow[];
}
