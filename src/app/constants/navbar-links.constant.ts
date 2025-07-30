import { NavbarLink } from "@models/navbar-links.model";

/**
 * Navigation links configuration for the application navbar.
 * 
 * This array defines the navigation items that appear in the main
 * navigation bar. Each link includes a display label and an anchor
 * ID for smooth scrolling to the corresponding section.
 * 
 * @constant {NavbarLink[]} NAV_LINKS
 * 
 * @example
 * ```typescript
 * // Use in navbar component
 * import { NAV_LINKS } from '@constants/navbar-links.constant';
 * 
 * // Template usage
 * <nav>
 *   <a *ngFor="let link of navLinks" 
 *      [href]="'#' + link.anchor">
 *     {{ link.label }}
 *   </a>
 * </nav>
 * ```
 * 
 * @author Yasser Abdel-Maksoud
 * @since 1.0.0
 */
export const NAV_LINKS: NavbarLink[] = [
    { label: 'Employee Grid', anchor: 'employee-grid' },
    { label: 'Project Breakdown', anchor: 'project-chart' },
    { label: 'Projects Summary', anchor: 'projects-summary' },
    { label: 'Year Projection', anchor: 'year-projection' }
];