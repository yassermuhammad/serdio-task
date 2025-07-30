/**
 * Project status configuration for visual indicators and styling.
 * 
 * This object defines the status types and their corresponding
 * display labels and color schemes used throughout the application
 * for project status indicators and badges.
 * 
 * @constant {Object} PROJECT_STATUS
 * @memberof ProjectConstants
 * 
 * @example
 * ```typescript
 * // Get status configuration
 * const completedStatus = PROJECT_STATUS.COMPLETED;
 * console.log(completedStatus.label); // 'Completed'
 * console.log(completedStatus.color); // 'green'
 * 
 * // Use in component for styling
 * const statusClass = `bg-${PROJECT_STATUS.IN_PROGRESS.color}-100`;
 * // Returns: 'bg-yellow-100'
 * 
 * // Check project status
 * const projectStatus = 'completed';
 * const statusConfig = PROJECT_STATUS[projectStatus.toUpperCase()];
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