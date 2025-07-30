/**
 * Project status configuration for styling and display.
 * 
 * This object defines the available project statuses with their
 * corresponding display labels and color schemes. Used throughout
 * the application for consistent project status styling and
 * visual indicators.
 * 
 * @constant {Object} PROJECT_STATUS
 * @property {Object} COMPLETED - Completed project status
 * @property {Object} IN_PROGRESS - In progress project status
 * @property {Object} PLANNING - Planning project status
 * 
 * @example
 * ```typescript
 * // Use in component
 * import { PROJECT_STATUS } from '@constants/project-status.constant';
 * 
 * // Get status styling
 * const status = PROJECT_STATUS.COMPLETED;
 * console.log(status.label); // 'Completed'
 * console.log(status.color); // 'green'
 * 
 * // Use in template
 * <span [class]="'status-' + PROJECT_STATUS[project.status].color">
 *   {{ PROJECT_STATUS[project.status].label }}
 * </span>
 * ```
 * 
 * @author Yasser Abdel-Maksoud
 * @since 1.0.0
 */
export const PROJECT_STATUS = {
    COMPLETED: {
        label: 'Completed',
        color: 'green'
    },
    IN_PROGRESS: {
        label: 'In Progress',
        color: 'yellow'
    },
    PLANNING: {
        label: 'Planning',
        color: 'red'
    }
}