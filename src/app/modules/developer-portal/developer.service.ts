import { Injectable, signal } from '@angular/core';
import { DeveloperActivity, DeveloperRecord } from './developer.model';

@Injectable({ providedIn: 'root' })
export class DeveloperService {
  readonly records = signal<DeveloperRecord[]>([
    { id: 'dev-api-reference', name: 'IAM API Reference', type: 'API documentation', version: 'v2.4', language: 'OpenAPI', status: 'Published', updated: 'Today, 16:48' },
    { id: 'dev-sdk-typescript', name: 'TypeScript SDK', type: 'SDK', version: '4.2.0', language: 'TypeScript', status: 'Available', updated: 'Today, 15:41' },
    { id: 'dev-sdk-dotnet', name: '.NET SDK', type: 'SDK', version: '3.8.1', language: 'C#', status: 'Available', updated: 'Sep 18, 2026' },
    { id: 'dev-oauth-console', name: 'Partner OAuth Console', type: 'OAuth application', version: '1.0', language: 'OAuth 2.0', status: 'Active', updated: 'Today, 14:58' },
  ]);
  readonly activity: readonly DeveloperActivity[] = [
    { event: 'API reference published', actor: 'Developer Platform', resource: 'IAM API Reference', status: 'Completed', updated: 'Today, 16:48' },
    { event: 'SDK version released', actor: 'Developer Platform', resource: 'TypeScript SDK 4.2.0', status: 'Completed', updated: 'Today, 15:41' },
    { event: 'OAuth redirect review opened', actor: 'Security Team', resource: 'Partner OAuth Console', status: 'Review', updated: 'Today, 14:58' },
    { event: 'SDK download blocked', actor: 'Policy Engine', resource: '.NET SDK', status: 'Blocked', updated: 'Today, 14:22' },
  ];
  readonly metrics = { apiRequests: '2.8M', downloads: '486', oauthApps: '34', publishedDocs: '18' };
  find(id: string | null): DeveloperRecord | undefined { return this.records().find((item) => item.id === id); }
}
