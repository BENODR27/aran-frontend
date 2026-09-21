import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ContentCard, PageHeader } from '../../../../shared/components';
import { TenantService } from '../../tenant.service';

@Component({
  selector: 'app-tenant-create',
  imports: [ContentCard, FormsModule, PageHeader, RouterLink],
  templateUrl: './tenant-create.html',
  styleUrl: './tenant-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantCreate {
  private readonly router = inject(Router);
  private readonly service = inject(TenantService);
  protected readonly form = { name: '', plan: 'Growth' };

  protected save(): void {
    const created = this.service.create(this.form.name, this.form.plan);
    this.router.navigate(['/tenants', created.id]);
  }
}
