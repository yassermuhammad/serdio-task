/**
 * Interface representing a navigation link in the application navbar.
 * 
 * This interface defines the structure for navigation links used
 * throughout the application's navigation system. Each link contains
 * a display label and an anchor reference for smooth scrolling.
 * 
 * @interface NavbarLink
 * @property {string} label - Display text for the navigation link
 * @property {string} anchor - Anchor reference for smooth scrolling to section
 * 
 * @example
 * ```typescript
 * const navLink: NavbarLink = {
 *   label: 'Employee Grid',
 *   anchor: 'employee-grid'
 * };
 * 
 * // Usage in navigation
 * const navbarLinks: NavbarLink[] = [
 *   { label: 'Employee Grid', anchor: 'employee-grid' },
 *   { label: 'Project Breakdown', anchor: 'project-chart' },
 *   { label: 'Projects Summary', anchor: 'projects-summary' },
 *   { label: 'Year Projection', anchor: 'year-projection' }
 * ];
 * ```
 * 
 * @author Yasser Abdel-Maksoud
 * @since 1.0.0
 */
export interface NavbarLink {
    label: string;
    anchor: string;
}