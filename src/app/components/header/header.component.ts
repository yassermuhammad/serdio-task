import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IUser, User } from '@models/user.model';
import { ThemeService } from '@services/theme/theme.service';

/**
 * HeaderComponent provides the main application header with user information,
 * theme controls, and navigation elements.
 * 
 * This component displays the application title, current user information,
 * theme toggle functionality, and user menu with various actions. It integrates
 * with the ThemeService for theme management and provides a clean header interface.
 * 
 * @example
 * ```html
 * <!-- Use in main app template -->
 * <sred-ts-header></sred-ts-header>
 * ```
 * 
 * @author Yasser Abdel-Maksoud
 * @since 1.0.0
 */
@Component({
  selector: 'sred-ts-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  /**
   * Current user instance with profile information.
   * 
   * Contains user data including name, email, avatar, role, and
   * generated initials for display purposes.
   * 
   * @type {User}
   * @memberof HeaderComponent
   */
  user: User = new User(this.getUserData());

  /**
   * Application client name displayed in the header.
   * 
   * @type {string}
   * @memberof HeaderComponent
   */
  clientName: string = 'Sredio Timesheet Dashboard';

  /**
   * Application client information displayed in the header.
   * 
   * @type {string}
   * @memberof HeaderComponent
   */
  clientInfo: string = 'Financial Analytics & Project Management';

  /**
   * Current date formatted for display in the header.
   * 
   * @type {string}
   * @memberof HeaderComponent
   */
  currentDate: string = new Date().toLocaleDateString();

  /**
   * Flag controlling the visibility of the user menu dropdown.
   * 
   * @type {boolean}
   * @memberof HeaderComponent
   */
  showUserMenu: boolean = false;

  /**
   * Injected theme service for theme management functionality.
   * 
   * @type {ThemeService}
   * @memberof HeaderComponent
   */
  themeService: ThemeService = inject(ThemeService);

  /**
   * Handles document click events to close the user menu when clicking outside.
   * 
   * This method is used to implement click-outside behavior for the user menu.
   * It checks if the click target is outside the user menu container and closes
   * the menu if so.
   * 
   * @param {Event} event - The click event object
   * @returns {void}
   * @memberof HeaderComponent
   * 
   * @example
   * ```typescript
   * // Called from template
   * @HostListener('document:click', ['$event'])
   * onDocumentClick(event: Event): void {
   *   this.onDocumentClick(event);
   * }
   * ```
   */
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu-container')) {
      this.closeUserMenu();
    }
  }

  /**
   * Toggles the application theme between light and dark modes.
   * 
   * Delegates to the ThemeService to switch between light and dark themes.
   * The theme change is automatically persisted and applied throughout the application.
   * 
   * @returns {void}
   * @memberof HeaderComponent
   * 
   * @example
   * ```typescript
   * // Called from theme toggle button
   * onThemeToggle(): void {
   *   this.toggleTheme();
   * }
   * ```
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  /**
   * Toggles the visibility of the user menu dropdown.
   * 
   * Switches the showUserMenu flag between true and false to show or hide
   * the user menu dropdown in the header.
   * 
   * @returns {void}
   * @memberof HeaderComponent
   * 
   * @example
   * ```typescript
   * // Called from user avatar click
   * onUserAvatarClick(): void {
   *   this.toggleUserMenu();
   * }
   * ```
   */
  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  /**
   * Closes the user menu dropdown.
   * 
   * Sets the showUserMenu flag to false to hide the user menu dropdown.
   * 
   * @returns {void}
   * @memberof HeaderComponent
   * 
   * @example
   * ```typescript
   * // Called when clicking outside menu
   * onDocumentClick(event: Event): void {
   *   if (!target.closest('.user-menu-container')) {
   *     this.closeUserMenu();
   *   }
   * }
   * ```
   */
  closeUserMenu(): void {
    this.showUserMenu = false;
  }

  /**
   * Handles user menu action selections.
   * 
   * Processes user actions from the dropdown menu such as profile,
   * settings, logout, etc. Currently logs the action and closes the menu.
   * 
   * @param {string} action - The action string (e.g., 'profile', 'settings', 'logout')
   * @returns {void}
   * @memberof HeaderComponent
   * 
   * @example
   * ```typescript
   * // Called from menu item click
   * onMenuAction(action: string): void {
   *   this.onUserAction(action);
   * }
   * 
   * // Usage
   * this.onUserAction('logout');
   * // Logs: "User action: logout"
   * ```
   */
  onUserAction(action: string): void {
    console.log(`User action: ${action}`);
    this.closeUserMenu();
  }

  /**
   * Gets mock user data for demonstration purposes.
   * 
   * Returns a mock user object with sample data for testing and
   * demonstration of the header component functionality.
   * 
   * @returns {IUser} Mock user data object
   * @memberof HeaderComponent
   * 
   * @example
   * ```typescript
   * // Get user data for initialization
   * const userData = this.getUserData();
   * this.user = new User(userData);
   * 
   * // Mock data structure
   * {
   *   name: 'John Doe',
   *   email: 'john.doe@example.com',
   *   avatar: 'https://via.placeholder.com/150',
   *   role: 'Admin'
   * }
   * ```
   */
  getUserData(): IUser {
    return {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://via.placeholder.com/150',
      role: 'Admin',
    };
  }
}
