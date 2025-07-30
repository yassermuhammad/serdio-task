import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Theme type definition for the application.
 * 
 * Defines the available theme options that can be applied
 * to the application interface.
 * 
 * @typedef {'light' | 'dark'} Theme
 */
export type Theme = 'light' | 'dark';

/**
 * ThemeService manages the application's theme state and provides
 * functionality for switching between light and dark themes.
 * 
 * This service handles theme persistence in localStorage, system
 * preference detection, and real-time theme switching with
 * automatic DOM class application for Tailwind CSS dark mode.
 * 
 * @example
 * ```typescript
 * // Inject the service
 * constructor(private themeService: ThemeService) {}
 * 
 * // Subscribe to theme changes
 * this.themeService.theme$.subscribe(theme => {
 *   console.log('Current theme:', theme);
 * });
 * 
 * // Toggle theme
 * this.themeService.toggleTheme();
 * 
 * // Set specific theme
 * this.themeService.setTheme('dark');
 * ```
 * 
 * @author Yasser Abdel-Maksoud
 * @since 1.0.0
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  /**
   * BehaviorSubject that holds the current theme state.
   * 
   * This subject maintains the current theme value and emits
   * updates whenever the theme changes. Components can subscribe
   * to this observable to react to theme changes in real-time.
   * 
   * @private
   * @type {BehaviorSubject<Theme>}
   * @memberof ThemeService
   */
  private themeSubject = new BehaviorSubject<Theme>('light');

  /**
   * Observable that emits the current theme value.
   * 
   * Components can subscribe to this observable to receive
   * theme updates and react accordingly. The observable will
   * emit the current theme immediately upon subscription.
   * 
   * @public
   * @type {Observable<Theme>}
   * @memberof ThemeService
   * 
   * @example
   * ```typescript
   * // Subscribe to theme changes
   * this.themeService.theme$.subscribe(theme => {
   *   this.currentTheme = theme;
   *   this.updateComponentTheme();
   * });
   * ```
   */
  public theme$ = this.themeSubject.asObservable();

  /**
   * Initializes the ThemeService with theme detection and setup.
   * 
   * The constructor automatically initializes the theme by:
   * 1. Checking localStorage for saved theme preference
   * 2. Falling back to system preference if no saved theme
   * 3. Applying the detected theme to the application
   * 
   * @memberof ThemeService
   */
  constructor() {
    this.initializeTheme();
  }

  /**
   * Initializes the theme based on saved preferences or system settings.
   * 
   * This method checks for a previously saved theme in localStorage.
   * If no saved theme exists, it detects the system's color scheme
   * preference and applies the appropriate theme. The detected theme
   * is then applied to the document for Tailwind CSS dark mode support.
   * 
   * @private
   * @returns {void}
   * @memberof ThemeService
   * 
   * @example
   * ```typescript
   * // Called automatically in constructor
   * this.initializeTheme();
   * ```
   */
  private initializeTheme(): void {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    // Check system preference if no saved theme
    if (!savedTheme) {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(systemPrefersDark ? 'dark' : 'light');
    } else {
      this.setTheme(savedTheme);
    }
  }

  /**
   * Gets the current theme value.
   * 
   * Returns the currently active theme without subscribing to
   * the observable. This is useful for one-time theme checks
   * or conditional logic based on the current theme.
   * 
   * @returns {Theme} The current theme ('light' or 'dark')
   * @memberof ThemeService
   * 
   * @example
   * ```typescript
   * // Get current theme
   * const currentTheme = this.themeService.getCurrentTheme();
   * console.log('Current theme:', currentTheme);
   * 
   * // Use in conditional logic
   * if (this.themeService.getCurrentTheme() === 'dark') {
   *   this.applyDarkModeStyles();
   * }
   * ```
   */
  public getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }

  /**
   * Sets the application theme and persists it to localStorage.
   * 
   * This method updates the theme state, persists the selection
   * to localStorage for future sessions, and applies the appropriate
   * CSS class to the document element for Tailwind CSS dark mode.
   * 
   * @param {Theme} theme - The theme to set ('light' or 'dark')
   * @returns {void}
   * @memberof ThemeService
   * 
   * @example
   * ```typescript
   * // Set light theme
   * this.themeService.setTheme('light');
   * 
   * // Set dark theme
   * this.themeService.setTheme('dark');
   * 
   * // Set theme based on user preference
   * const userPreference = this.getUserPreference();
   * this.themeService.setTheme(userPreference);
   * ```
   */
  public setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    localStorage.setItem('theme', theme);
    
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  /**
   * Toggles between light and dark themes.
   * 
   * Switches from the current theme to the opposite theme.
   * If currently in light mode, switches to dark mode and vice versa.
   * The new theme is automatically persisted and applied.
   * 
   * @returns {void}
   * @memberof ThemeService
   * 
   * @example
   * ```typescript
   * // Toggle theme (light ↔ dark)
   * this.themeService.toggleTheme();
   * 
   * // Use in button click handler
   * onThemeToggleClick(): void {
   *   this.themeService.toggleTheme();
   * }
   * ```
   */
  public toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    this.setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  /**
   * Checks if the application is currently in dark mode.
   * 
   * Returns a boolean indicating whether the current theme
   * is set to dark mode. This is a convenience method for
   * conditional logic that depends on dark mode state.
   * 
   * @returns {boolean} True if dark mode is active, false otherwise
   * @memberof ThemeService
   * 
   * @example
   * ```typescript
   * // Check if dark mode is active
   * if (this.themeService.isDarkMode()) {
   *   this.applyDarkModeSpecificLogic();
   * }
   * 
   * // Use in template
   * <div [class.dark-mode]="themeService.isDarkMode()">
   *   Dark mode content
   * </div>
   * ```
   */
  public isDarkMode(): boolean {
    return this.getCurrentTheme() === 'dark';
  }
  
}
