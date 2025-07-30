import { NavbarLink } from "@models/navbar-links.model";

/**
 * Navigation links configuration for the application navbar.
 * 
 * This array defines the navigation structure for the main application
 * navbar. Each link contains a display label and an anchor reference
 * for smooth scrolling to the corresponding section.
 * 
 * @constant {NavbarLink[]} NAV_LINKS
 * @memberof NavbarConstants
 * 
 * @example
 * ```typescript
 * // Use in navbar component
 * navbarLinks = NAV_LINKS;
 * 
 * // Access specific link
 * const employeeLink = NAV_LINKS[0];
 * console.log(employeeLink.label); // 'Employee Grid'
 * console.log(employeeLink.anchor); // 'employee-grid'
 * 
 * // Iterate through links
 * NAV_LINKS.forEach(link => {
 *   console.log(`${link.label}: ${link.anchor}`);
 * });
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