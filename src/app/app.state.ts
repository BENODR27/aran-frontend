import { ApplicationState } from './modules/applications/application.state';
import { CompanyState } from './modules/companies/company.state';
import { FacilityState } from './modules/facilities/facility.state';
import { TenantState } from './modules/tenants/tenant.state';

export interface AppState {
  readonly tenants: TenantState;
  readonly companies: CompanyState;
  readonly facilities: FacilityState;
  readonly applications: ApplicationState;
}
