import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavigationItem {
  readonly label: string;
  readonly icon: string;
  readonly route: string;
}

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
  protected readonly navigation: readonly NavigationItem[] = [
    { label: 'Dashboard', icon: '⌂', route: '/dashboard' },
    { label: 'Batch traceability', icon: '◈', route: '/dashboard' },
    { label: 'Operations', icon: '◫', route: '/dashboard' },
    { label: 'Reports', icon: '▤', route: '/dashboard' },
  ];
}
