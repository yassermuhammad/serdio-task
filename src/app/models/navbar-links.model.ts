/**
 * Interface representing navigation links for the application navbar.
 * 
 * This interface defines the structure for navigation items in the
 * application's navigation bar, including the display label and
 * anchor link for smooth scrolling to sections.
 * 
 * @interface NavbarLink
 * @property {string} label - Display text for the navigation link
 * @property {string} anchor - Anchor ID for smooth scrolling to section
 * 
 * @example
 * ```typescript
 * const navLink: NavbarLink = {
 *   label: 'Employee Grid',
 *   anchor: 'employee-grid'
 * };
 * 
 * // Usage in navbar component
 * const navbarLinks: NavbarLink[] = [
 *   { label: 'Employee Grid', anchor: 'employee-grid' },
 *   { label: 'Project Chart', anchor: 'project-chart' },
 *   { label: 'Projects Summary', anchor: 'projects-summary' }
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