import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IUser, User } from '@models/user.model';
import { ThemeService } from '@services/theme/theme.service';

@Component({
  selector: 'sred-ts-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user: User = new User(this.getUserData());

  clientName: string = 'Sredio Timesheet Dashboard';
  clientInfo: string = 'Financial Analytics & Project Management';
  currentDate: string = new Date().toLocaleDateString();
  showUserMenu: boolean = false;

  themeService: ThemeService = inject(ThemeService);

  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu-container')) {
      this.closeUserMenu();
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  closeUserMenu(): void {
    this.showUserMenu = false;
  }

  onUserAction(action: string): void {
    console.log(`User action: ${action}`);
    this.closeUserMenu();
  }

  getUserData(): IUser {
    return {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://via.placeholder.com/150',
      role: 'Admin',
    };
  }
}
