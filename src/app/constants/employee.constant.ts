/**
 * Constants defining the column headers for the employee grid.
 * 
 * This array contains the display names for the columns in the
 * employee grid component. The order of these columns corresponds
 * to the data structure and display layout of the employee table.
 * 
 * @constant {string[]} EMPLOYEE_GRID_COLUMNS
 * @memberof EmployeeConstants
 * 
 * @example
 * ```typescript
 * // Use in employee grid component
 * displayedColumns = EMPLOYEE_GRID_COLUMNS;
 * 
 * // Access specific column
 * const employeeColumn = EMPLOYEE_GRID_COLUMNS[0]; // 'Employee'
 * const salaryColumn = EMPLOYEE_GRID_COLUMNS[1]; // 'Annual Salary'
 * const rateColumn = EMPLOYEE_GRID_COLUMNS[2]; // 'Hourly Rate'
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