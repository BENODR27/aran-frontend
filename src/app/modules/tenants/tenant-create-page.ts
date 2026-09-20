import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ContentCard, PageHeader } from '../../shared/components';
import { TenantService } from './tenant.service';

@Component({
  selector: 'app-tenant-create-page',
  imports: [ContentCard, FormsModule, PageHeader, RouterLink],
  templateUrl: './tenant-create-page.html',
  styleUrl: './tenant-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantCreatePage {
  private readonly router = inject(Router);
  private readonly service = inject(TenantService);
  protected readonly form = { name: '', plan: 'Growth' };

  protected save(): void {
    const created = this.service.create(this.form.name, this.form.plan);
    this.router.navigate(['/tenants', created.id]);
  }
}
