import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_API_CONSTANTS as AC } from '../../constants/auth-api.constants';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { HttpService } from '../../services/http/http.service';
import { SharedServiceService } from '../../services/shared-service/shared-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private roles: string[] = [];
  private permissions: string[] = [];

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private httpService: HttpService,
    private sharedService: SharedServiceService,
  ) {
    this.permissions = localStorageService.getItem('permissions') ?? [];
    this.roles = localStorageService.getItem('roles') ?? [];
  }

  login(username: string, password: string) {
    return this.httpService.post(AC.API_URL + AC.login, {
      username: username,
      password: password,
    });
  }

  logout() {
    let navUrl = this.localStorageService.getItem('loginvia');
    this.localStorageService.clearAll();
    this.sharedService.updateNavbarItems([]);

    this.router.navigate([navUrl]);
  }

  isLoggedIn(): boolean {
    const token = this.localStorageService.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return this.localStorageService.getItem('token');
  }
  setRoles(roles: string[]): void {
    this.roles = roles;
  }

  setPermissions(permissions: string[]): void {
    this.permissions = permissions;
  }

  hasRole(role: string): boolean {
    return this.permissions.includes('superadmin') ? true : this.roles.includes(role);
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes('superadmin') ? true : this.permissions.includes(permission);
  }
}
