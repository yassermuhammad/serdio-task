/**
 * Constants for employee grid column definitions.
 * 
 * This array defines the column headers displayed in the employee grid
 * component. The order and labels correspond to the data structure
 * used in the employee grid table.
 * 
 * @constant {string[]} EMPLOYEE_GRID_COLUMNS
 * 
 * @example
 * ```typescript
 * // Use in employee grid component
 * displayedColumns = EMPLOYEE_GRID_COLUMNS;
 * 
 * // Template usage
 * <th *ngFor="let column of displayedColumns">{{ column }}</th>
 * ```
 * 
 * @author Yasser Abdel-Maksoud
 * @since 1.0.0
 */
export const EMPLOYEE_GRID_COLUMNS: string[] = [
  'Employee',
  'Annual Salary',
  'Hourly Rate',
];