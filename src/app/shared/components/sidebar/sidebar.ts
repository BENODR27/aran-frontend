import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MockDataService } from '../../services/mock-data/mock-data.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  @Input() mobileOpen = false;
  @Output() readonly closeMenu = new EventEmitter<void>();
  protected readonly content = inject(MockDataService);
  protected readonly navigation = this.content.adminMenu;
}
