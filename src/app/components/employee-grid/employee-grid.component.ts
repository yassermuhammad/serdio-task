import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EMPLOYEE_GRID_COLUMNS } from '@constants/employee.constant';
import { Employee } from '@models/employee.model';
import { EmployeeService } from '@services/employee/employee.service';
import { UtilsService } from '@services/utils/utils.service';

/**
 * EmployeeGridComponent displays a comprehensive overview of employee data.
 * 
 * This component provides a dashboard-style view with summary cards showing key metrics
 * and a detailed table listing all employees with their salary and hourly rate information.
 * It includes features like currency formatting, average calculations, and responsive design.
 * 
 * @example
 * ```html
 * <sred-ts-employee-grid></sred-ts-employee-grid>
 * ```
 * 
 * @author Yasser Abdel-Maksoud
 * @since 1.0.0
 */
@Component({
  selector: 'sred-ts-employee-grid',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './employee-grid.component.html',
  styleUrl: './employee-grid.component.scss',
})
export class EmployeeGridComponent {
  /**
   * Array of employee data loaded from the data service.
   * 
   * This property contains the complete list of employees with their personal
   * information, salary details, and hourly rates. The data is automatically
   * updated when the employee service emits new values.
   * 
   * @type {Employee[]}
   * @memberof EmployeeGridComponent
   * 
   * @example
   * ```typescript
   * // Example of Employee object structure
   * {
   *   id: 1,
   *   firstName: 'John',
   *   lastName: 'Doe',
   *   fullName: 'John Doe',
   *   annualSalary: 75000,
   *   hourlyRate: 36.06
   * }
   * ```
   */
  employees: Employee[] = [];

  /**
   * Defines the columns to be displayed in the employee data table.
   * 
   * This property contains the column configuration imported from the constants file.
   * It specifies which employee properties should be shown as columns in the data table.
   * The configuration is read-only and centralized for maintainability.
   * 
   * @type {string[]}
   * @readonly
   * @protected
   * @memberof EmployeeGridComponent
   * 
   * @example
   * ```typescript
   * // Imported from @constants/employee.constant
   * EMPLOYEE_GRID_COLUMNS = ['name', 'annualSalary', 'hourlyRate']
   * ```
   */
  protected readonly displayedColumns: string[] = EMPLOYEE_GRID_COLUMNS;

  /**
   * Injected service for managing employee data operations.
   * 
   * Provides methods for fetching employee data, calculating averages,
   * and other employee-related business logic.
   * 
   * @private
   * @type {EmployeeService}
   * @memberof EmployeeGridComponent
   */
  private employeeService: EmployeeService = inject(EmployeeService);

  /**
   * Injected service for utility functions like currency formatting.
   * 
   * Provides common utility methods for formatting data, including
   * currency formatting and other display helpers.
   * 
   * @private
   * @type {UtilsService}
   * @memberof EmployeeGridComponent
   */
  private utilsService: UtilsService = inject(UtilsService);

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * 
   * Initializes the component by loading the employee data from the service.
   * This ensures that the employee list is populated when the component is ready.
   * 
   * @returns {void}
   * @memberof EmployeeGridComponent
   */
  ngOnInit(): void {
    this.getEmployeesList();
  }

  /**
   * Loads the employee data from the service and subscribes to updates.
   * 
   * This method fetches the current employee list and sets up a subscription
   * to automatically update the component when new employee data is available.
   * The subscription ensures real-time updates when employee data changes.
   * 
   * @returns {void}
   * @memberof EmployeeGridComponent
   * 
   * @example
   * ```typescript
   * // Called automatically in ngOnInit
   * this.getEmployeesList();
   * ```
   */
  getEmployeesList(): void {
    this.employeeService.getEmployeesStream().subscribe((employees) => {
      this.employees = employees;
    });
  }

  /**
   * Formats a numeric amount as currency for display.
   * 
   * Converts a number to a properly formatted currency string with
   * appropriate symbols, commas, and decimal places based on the locale.
   * 
   * @param {number} amount - The numeric amount to format as currency
   * @returns {string} Formatted currency string (e.g., "$75,000.00")
   * @memberof EmployeeGridComponent
   * 
   * @example
   * ```typescript
   * // Format annual salary for display
   * const formattedSalary = this.formatCurrency(75000);
   * // Returns: "$75,000.00"
   * ```
   */
  formatCurrency(amount: number): string {
    return this.utilsService.formatCurrency(amount);
  }

  /**
   * Formats an hourly rate for display with appropriate precision.
   * 
   * Converts a numeric hourly rate to a formatted string with
   * proper decimal places and currency symbols for hourly rate display.
   * 
   * @param {number} rate - The hourly rate to format
   * @returns {string} Formatted hourly rate string (e.g., "$36.06/hr")
   * @memberof EmployeeGridComponent
   * 
   * @example
   * ```typescript
   * // Format hourly rate for display
   * const formattedRate = this.formatHourlyRate(36.06);
   * // Returns: "$36.06/hr"
   * ```
   */
  formatHourlyRate(rate: number): string {
    return this.utilsService.formatHourlyRate(rate);
  }

  /**
   * Calculates the average annual salary across all employees.
   * 
   * This method delegates to the employee service to calculate the mean
   * annual salary of all employees in the current dataset. Used for
   * displaying summary statistics in the dashboard cards.
   * 
   * @returns {number} The average annual salary across all employees
   * @memberof EmployeeGridComponent
   * 
   * @example
   * ```typescript
   * // Get average salary for summary card
   * const avgSalary = this.getAverageAnnualSalary();
   * // Returns: 75000 (example value)
   * ```
   */
  getAverageAnnualSalary(): number {
    return this.employeeService.getAverageAnnualSalary();
  }

  /**
   * Calculates the average hourly rate across all employees.
   * 
   * This method delegates to the employee service to calculate the mean
   * hourly rate of all employees in the current dataset. Used for
   * displaying summary statistics in the dashboard cards.
   * 
   * @returns {number} The average hourly rate across all employees
   * @memberof EmployeeGridComponent
   * 
   * @example
   * ```typescript
   * // Get average hourly rate for summary card
   * const avgRate = this.getAverageHourlyRate();
   * // Returns: 36.06 (example value)
   * ```
   */
  getAverageHourlyRate(): number {
    return this.employeeService.getAverageHourlyRate();
  }
}
