/**
 * Interface representing employee information in the application.
 * 
 * This interface defines the structure for employee data including
 * personal information, compensation details, and identification.
 * Used throughout the application for employee management and
 * timesheet tracking.
 * 
 * @interface Employee
 * @property {number} id - Unique identifier for the employee
 * @property {string} firstName - Employee's first name
 * @property {string} lastName - Employee's last name
 * @property {string} fullName - Employee's full name (first + last)
 * @property {number} annualSalary - Employee's annual salary in USD
 * @property {number} hourlyRate - Employee's hourly rate in USD
 * 
 * @example
 * ```typescript
 * const employee: Employee = {
 *   id: 1,
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   fullName: 'John Doe',
 *   annualSalary: 75000,
 *   hourlyRate: 36.06
 * };
 * ```
 * 
 * @author Yasser Abdel-Maksoud
 * @since 1.0.0
 */
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  annualSalary: number;
  hourlyRate: number;
}

/**
 * Interface representing employee work data for project assignments.
 * 
 * This interface defines the structure for tracking employee work
 * on specific projects, including hours worked and monetary value
 * generated. Used for project analytics and timesheet reporting.
 * 
 * @interface EmployeeWorkData
 * @property {number} employeeId - Unique identifier for the employee
 * @property {number} projectId - Unique identifier for the project
 * @property {number} hoursWorked - Total hours worked on the project
 * @property {number} monetaryValue - Monetary value generated from the work
 * 
 * @example
 * ```typescript
 * const workData: EmployeeWorkData = {
 *   employeeId: 1,
 *   projectId: 1,
 *   hoursWorked: 120,
 *   monetaryValue: 4327.20
 * };
 * ```
 * 
 * @author Yasser Abdel-Maksoud
 * @since 1.0.0
 */
export interface EmployeeWorkData {
  employeeId: number;
  projectId: number;
  hoursWorked: number;
  monetaryValue: number;
}
