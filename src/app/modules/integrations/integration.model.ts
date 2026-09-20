export interface IntegrationRecord {
  id: string;
  provider: string;
  type: 'Identity provider' | 'Directory' | 'SAML' | 'LDAP';
  tenant: string;
  lastSync: string;
  status: 'Connected' | 'Pending' | 'Error' | 'Disabled';
  updated: string;
}

export interface IntegrationActivity {
  event: string;
  actor: string;
  resource: string;
  status: 'Completed' | 'Review' | 'Blocked';
  updated: string;
}
