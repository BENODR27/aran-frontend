import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ContentCard, PageHeader } from '../../../../shared/components';
import { CompanyService } from '../../company.service';
import { TenantService } from '../../../tenants/tenant.service';

@Component({
  selector: 'app-company-create',
  imports: [ContentCard, FormsModule, PageHeader, RouterLink],
  templateUrl: './company-create.html',
  styleUrl: './company-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyCreate {
  private readonly router = inject(Router);
  private readonly service = inject(CompanyService);
  protected readonly tenantService = inject(TenantService);

  protected readonly validationError = signal('');
  protected readonly form = { name: '', tenantId: 'tenant-northstar', industry: 'Manufacturing' };

  protected save(): void {
    const tenant = this.tenantService.find(this.form.tenantId);
    if (!tenant) {
      this.validationError.set('Select an active tenant before creating a company.');
      return;
    }

    this.validationError.set('');
    const created = this.service.create(this.form.name, tenant.id, tenant.name, this.form.industry);
    this.router.navigate(['/companies', created.id]);
  }
}
