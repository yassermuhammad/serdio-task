import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IUser, User } from '@models/user.model';
import { ThemeService } from '@services/theme/theme.service';

/**
 * HeaderComponent provides the main application header with user information,
 * theme toggle functionality, and navigation controls.
 * 
 * This component displays the application title, current user information,
 * theme toggle button, and user menu with various actions. It integrates
 * with the ThemeService for dark/light mode switching and manages user
 * interface interactions.
 * 
 * @example
 * ```html
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
   * Current user information for the application.
   * 
   * Contains user details including name, email, avatar, and role.
   * This user object is used throughout the header for display
   * and user-specific functionality.
   * 
   * @type {User}
   * @memberof HeaderComponent
   */
  user: User = new User(this.getUserData());

  /**
   * Application client name displayed in the header.
   * 
   * The main application title that appears in the header
   * to identify the application to users.
   * 
   * @type {string}
   * @memberof HeaderComponent
   */
  clientName: string = 'Sredio Timesheet Dashboard';

  /**
   * Application description displayed in the header.
   * 
   * A brief description of the application's purpose and
   * functionality that appears below the main title.
   * 
   * @type {string}
   * @memberof HeaderComponent
   */
  clientInfo: string = 'Financial Analytics & Project Management';

  /**
   * Current date formatted for display.
   * 
   * The current date formatted according to the user's locale
   * for display in the header.
   * 
   * @type {string}
   * @memberof HeaderComponent
   */
  currentDate: string = new Date().toLocaleDateString();

  /**
   * Controls the visibility of the user menu dropdown.
   * 
   * Boolean flag that determines whether the user menu
   * is currently visible or hidden.
   * 
   * @type {boolean}
   * @memberof HeaderComponent
   */
  showUserMenu: boolean = false;

  /**
   * Injected theme service for theme management.
   * 
   * Service instance for handling theme switching between
   * light and dark modes throughout the application.
   * 
   * @type {ThemeService}
   * @memberof HeaderComponent
   */
  themeService: ThemeService = inject(ThemeService);

  /**
   * Handles document click events to close the user menu.
   * 
   * This method is called when a click event occurs on the document.
   * It checks if the click target is outside the user menu container
   * and closes the menu if it is, providing a better user experience.
   * 
   * @param {Event} event - The click event that occurred
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
   * Calls the theme service to switch between light and dark themes.
   * This method is typically called from a theme toggle button in
   * the header template.
   * 
   * @returns {void}
   * @memberof HeaderComponent
   * 
   * @example
   * ```typescript
   * // Called from template button click
   * <button (click)="toggleTheme()">Toggle Theme</button>
   * ```
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  /**
   * Toggles the visibility of the user menu dropdown.
   * 
   * Switches the showUserMenu boolean between true and false,
   * controlling whether the user menu is displayed or hidden.
   * 
   * @returns {void}
   * @memberof HeaderComponent
   * 
   * @example
   * ```typescript
   * // Called from template button click
   * <button (click)="toggleUserMenu()">User Menu</button>
   * ```
   */
  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  /**
   * Closes the user menu dropdown.
   * 
   * Sets the showUserMenu boolean to false, hiding the
   * user menu dropdown.
   * 
   * @returns {void}
   * @memberof HeaderComponent
   * 
   * @example
   * ```typescript
   * // Called when clicking outside menu
   * this.closeUserMenu();
   * ```
   */
  closeUserMenu(): void {
    this.showUserMenu = false;
  }

  /**
   * Handles user menu action selections.
   * 
   * Processes actions selected from the user menu dropdown.
   * Currently logs the action and closes the menu. Can be
   * extended to handle specific user actions like logout,
   * profile editing, etc.
   * 
   * @param {string} action - The action selected from the user menu
   * @returns {void}
   * @memberof HeaderComponent
   * 
   * @example
   * ```typescript
   * // Called from template menu items
   * <button (click)="onUserAction('logout')">Logout</button>
   * <button (click)="onUserAction('profile')">Profile</button>
   * ```
   */
  onUserAction(action: string): void {
    console.log(`User action: ${action}`);
    this.closeUserMenu();
  }

  /**
   * Gets mock user data for the application.
   * 
   * Returns a mock user object with sample data for development
   * and testing purposes. In a real application, this would
   * typically come from an authentication service or API.
   * 
   * @returns {IUser} Mock user data object
   * @memberof HeaderComponent
   * 
   * @example
   * ```typescript
   * // Get user data for initialization
   * const userData = this.getUserData();
   * this.user = new User(userData);
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
