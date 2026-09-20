import { Injectable, signal } from '@angular/core';
import { FeatureActivity, FeatureRecord } from './feature.model';

@Injectable({ providedIn: 'root' })
export class FeatureService {
  readonly features = signal<FeatureRecord[]>([
    { id: 'feature-mfa', name: 'Multi-factor authentication', key: 'security.mfa', category: 'Security', assignments: 48, overrides: 6, status: 'Enabled', updated: 'Today, 16:31' },
    { id: 'feature-audit-export', name: 'Audit log export', key: 'audit.export', category: 'Governance', assignments: 31, overrides: 3, status: 'Enabled', updated: 'Today, 15:58' },
    { id: 'feature-risk-engine', name: 'Adaptive risk engine', key: 'security.risk-engine', category: 'Security', assignments: 12, overrides: 2, status: 'Scheduled', updated: 'Sep 18, 2026' },
    { id: 'feature-legacy-reports', name: 'Legacy reports', key: 'reports.legacy', category: 'Reporting', assignments: 0, overrides: 0, status: 'Disabled', updated: 'Sep 14, 2026' },
  ]);

  readonly activity: readonly FeatureActivity[] = [
    { event: 'Feature enabled for tenant', actor: 'Maya Haddad', resource: 'Multi-factor authentication', status: 'Completed', updated: 'Today, 16:31' },
    { event: 'Company override created', actor: 'Omar Khalil', resource: 'Audit log export', status: 'Completed', updated: 'Today, 15:58' },
    { event: 'Feature rollout scheduled', actor: 'Product Team', resource: 'Adaptive risk engine', status: 'Review', updated: 'Today, 15:24' },
    { event: 'Feature disabled', actor: 'Platform Admin', resource: 'Legacy reports', status: 'Completed', updated: 'Today, 14:55' },
    { event: 'Feature assignment blocked', actor: 'Policy Engine', resource: 'Legacy reports', status: 'Blocked', updated: 'Today, 14:19' },
  ];

  create(name: string, key: string, category: string): FeatureRecord {
    const feature: FeatureRecord = {
      id: `feature-${Date.now()}`,
      name: name.trim() || 'New feature',
      key: key.trim() || 'feature.new',
      category: category.trim() || 'General',
      assignments: 0,
      overrides: 0,
      status: 'Disabled',
      updated: 'Just now',
    };
    this.features.update((items) => [feature, ...items]);
    return feature;
  }

  find(id: string | null): FeatureRecord | undefined {
    return this.features().find((feature) => feature.id === id);
  }
}
