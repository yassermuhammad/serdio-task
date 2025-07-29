import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NAV_LINKS } from '@constants/navbar-links.constant';
import { NavbarLink } from '@models/navbar-links.model';

/**
 * NavbarComponent provides the main navigation bar for the application.
 * 
 * This component displays navigation links and handles smooth scrolling to different
 * sections of the page. It's designed as a standalone component that can be easily
 * imported and used throughout the application.
 * 
 * @example
 * ```html
 * <sred-ts-navbar></sred-ts-navbar>
 * ```
 * 
 * @author [Yasser Abdel-Maksoud]
 * @since 1.0.0
 */
@Component({
  selector: 'sred-ts-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  
  /**
   * Navigation links array that defines the structure and content of the navbar.
   * 
   * This property contains the navigation links imported from the constants file.
   * Each link includes properties like text, anchor, and any additional metadata
   * needed for rendering the navigation menu.
   * 
   * @type {NavbarLink[]}
   * @readonly
   * @protected
   * @memberof NavbarComponent
   * 
   * @example
   * ```typescript
   * // Example of NavbarLink structure
   * {
   *   text: 'Home',
   *   anchor: 'home',
   *   icon?: 'home-icon'
   * }
   * ```
   */
  protected readonly navLinks: NavbarLink[] = NAV_LINKS;
  
  /**
   * Scrolls to a specific section on the page using smooth scrolling behavior.
   * 
   * This method finds an element by its ID and smoothly scrolls to it. It's used
   * for navigation within the same page, providing a better user experience than
   * instant jumping to sections.
   * 
   * @param {string} anchor - The ID of the target element to scroll to
   * @returns {void}
   * @memberof NavbarComponent
   * 
   * @example
   * ```typescript
   * // Scroll to a section with ID 'about'
   * this.scrollToSection('about');
   * ```
   * 
   * @throws {Error} If the element with the specified ID doesn't exist (silently handled)
   */
  scrollToSection(anchor: string): void {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
