import { Injectable } from '@angular/core';
import { Employee } from '@models/employee.model';
import { Observable, of } from 'rxjs';

/**
 * EmployeeService manages employee data and provides methods for
 * retrieving employee information, calculating averages, and
 * managing employee-related operations.
 * 
 * This service contains mock data for 25 employees with realistic
 * salary and hourly rate information. It provides methods for
 * getting employee streams, calculating averages, and finding
 * specific employees by ID.
 * 
 * @example
 * ```typescript
 * // Inject the service
 * constructor(private employeeService: EmployeeService) {}
 * 
 * // Get all employees
 * this.employeeService.getEmployeesStream().subscribe(employees => {
 *   console.log('Employees:', employees);
 * });
 * 
 * // Get average salary
 * const avgSalary = this.employeeService.getAverageAnnualSalary();
 * ```
 * 
 * @author Yasser Abdel-Maksoud
 * @since 1.0.0
 */
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  /**
   * Initializes the EmployeeService.
   * 
   * The constructor initializes the service and loads the employee data.
   * 
   * @memberof EmployeeService
   */
  constructor() {}

  /**
   * Array of employee data loaded from the mock data method.
   * 
   * Contains all employee information including personal details,
   * salary information, and hourly rates for 25 employees.
   * 
   * @private
   * @type {Employee[]}
   * @memberof EmployeeService
   */
  private employees: Employee[] = this.getEmployees();

  /**
   * Gets all employees as an observable stream.
   * 
   * Returns an observable that emits the complete array of employees.
   * This method is used by components that need to display or process
   * employee data reactively.
   * 
   * @returns {Observable<Employee[]>} Observable of all employees
   * @memberof EmployeeService
   * 
   * @example
   * ```typescript
   * // Subscribe to employee data
   * this.employeeService.getEmployeesStream().subscribe(employees => {
   *   this.employees = employees;
   *   this.updateEmployeeGrid();
   * });
   * ```
   */
  getEmployeesStream(): Observable<Employee[]> {
    return of(this.employees);
  }

  /**
   * Calculates the average annual salary across all employees.
   * 
   * Computes the mean annual salary by summing all employee salaries
   * and dividing by the total number of employees. Returns 0 if no
   * employees exist.
   * 
   * @returns {number} Average annual salary across all employees
   * @memberof EmployeeService
   * 
   * @example
   * ```typescript
   * // Get average salary for analytics
   * const avgSalary = this.employeeService.getAverageAnnualSalary();
   * console.log('Average salary:', avgSalary);
   * // Returns: 81000 (example value)
   * ```
   */
  getAverageAnnualSalary(): number {
    if (this.employees.length === 0) return 0;
    return this.employees.reduce((sum, employee) => sum + employee.annualSalary, 0) / this.employees.length;
  }

  /**
   * Calculates the average hourly rate across all employees.
   * 
   * Computes the mean hourly rate by summing all employee hourly rates
   * and dividing by the total number of employees. Returns 0 if no
   * employees exist.
   * 
   * @returns {number} Average hourly rate across all employees
   * @memberof EmployeeService
   * 
   * @example
   * ```typescript
   * // Get average hourly rate for project calculations
   * const avgRate = this.employeeService.getAverageHourlyRate();
   * console.log('Average hourly rate:', avgRate);
   * // Returns: 38.95 (example value)
   * ```
   */
  getAverageHourlyRate(): number {
    if (this.employees.length === 0) return 0;
    return this.employees.reduce((sum, employee) => sum + employee.hourlyRate, 0) / this.employees.length;
  }

  /**
   * Returns mock data for 25 employees with realistic information.
   * 
   * This method provides comprehensive employee data including personal
   * information, salary details, and hourly rates. The data is used
   * throughout the application for testing and demonstration purposes.
   * 
   * @returns {Employee[]} Array of 25 employee records
   * @memberof EmployeeService
   * 
   * @example
   * ```typescript
   * // Get employee data
   * const employees = this.employeeService.getEmployees();
   * console.log('Total employees:', employees.length);
   * // Returns: 25
   * ```
   */
  getEmployees(): Employee[] {
    return [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe',
        annualSalary: 75000,
        hourlyRate: 36.06,
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        fullName: 'Jane Smith',
        annualSalary: 85000,
        hourlyRate: 40.87,
      },
      {
        id: 3,
        firstName: 'Mike',
        lastName: 'Johnson',
        fullName: 'Mike Johnson',
        annualSalary: 65000,
        hourlyRate: 31.25,
      },
      {
        id: 4,
        firstName: 'Sarah',
        lastName: 'Williams',
        fullName: 'Sarah Williams',
        annualSalary: 90000,
        hourlyRate: 43.27,
      },
      {
        id: 5,
        firstName: 'David',
        lastName: 'Brown',
        fullName: 'David Brown',
        annualSalary: 70000,
        hourlyRate: 33.65,
      },
      {
        id: 6,
        firstName: 'Emily',
        lastName: 'Davis',
        fullName: 'Emily Davis',
        annualSalary: 82000,
        hourlyRate: 39.42,
      },
      {
        id: 7,
        firstName: 'Robert',
        lastName: 'Miller',
        fullName: 'Robert Miller',
        annualSalary: 95000,
        hourlyRate: 45.67,
      },
      {
        id: 8,
        firstName: 'Lisa',
        lastName: 'Wilson',
        fullName: 'Lisa Wilson',
        annualSalary: 78000,
        hourlyRate: 37.50,
      },
      {
        id: 9,
        firstName: 'James',
        lastName: 'Taylor',
        fullName: 'James Taylor',
        annualSalary: 88000,
        hourlyRate: 42.31,
      },
      {
        id: 10,
        firstName: 'Amanda',
        lastName: 'Anderson',
        fullName: 'Amanda Anderson',
        annualSalary: 72000,
        hourlyRate: 34.62,
      },
      {
        id: 11,
        firstName: 'Christopher',
        lastName: 'Thomas',
        fullName: 'Christopher Thomas',
        annualSalary: 92000,
        hourlyRate: 44.23,
      },
      {
        id: 12,
        firstName: 'Jessica',
        lastName: 'Jackson',
        fullName: 'Jessica Jackson',
        annualSalary: 76000,
        hourlyRate: 36.54,
      },
      {
        id: 13,
        firstName: 'Daniel',
        lastName: 'White',
        fullName: 'Daniel White',
        annualSalary: 83000,
        hourlyRate: 39.90,
      },
      {
        id: 14,
        firstName: 'Ashley',
        lastName: 'Harris',
        fullName: 'Ashley Harris',
        annualSalary: 68000,
        hourlyRate: 32.69,
      },
      {
        id: 15,
        firstName: 'Matthew',
        lastName: 'Martin',
        fullName: 'Matthew Martin',
        annualSalary: 87000,
        hourlyRate: 41.83,
      },
      {
        id: 16,
        firstName: 'Nicole',
        lastName: 'Thompson',
        fullName: 'Nicole Thompson',
        annualSalary: 74000,
        hourlyRate: 35.58,
      },
      {
        id: 17,
        firstName: 'Andrew',
        lastName: 'Garcia',
        fullName: 'Andrew Garcia',
        annualSalary: 91000,
        hourlyRate: 43.75,
      },
      {
        id: 18,
        firstName: 'Stephanie',
        lastName: 'Martinez',
        fullName: 'Stephanie Martinez',
        annualSalary: 79000,
        hourlyRate: 37.98,
      },
      {
        id: 19,
        firstName: 'Joshua',
        lastName: 'Robinson',
        fullName: 'Joshua Robinson',
        annualSalary: 86000,
        hourlyRate: 41.35,
      },
      {
        id: 20,
        firstName: 'Melissa',
        lastName: 'Clark',
        fullName: 'Melissa Clark',
        annualSalary: 73000,
        hourlyRate: 35.10,
      },
      {
        id: 21,
        firstName: 'Ryan',
        lastName: 'Rodriguez',
        fullName: 'Ryan Rodriguez',
        annualSalary: 89000,
        hourlyRate: 42.79,
      },
      {
        id: 22,
        firstName: 'Rebecca',
        lastName: 'Lewis',
        fullName: 'Rebecca Lewis',
        annualSalary: 77000,
        hourlyRate: 37.02,
      },
      {
        id: 23,
        firstName: 'Kevin',
        lastName: 'Lee',
        fullName: 'Kevin Lee',
        annualSalary: 84000,
        hourlyRate: 40.38,
      },
      {
        id: 24,
        firstName: 'Laura',
        lastName: 'Walker',
        fullName: 'Laura Walker',
        annualSalary: 71000,
        hourlyRate: 34.13,
      },
      {
        id: 25,
        firstName: 'Brian',
        lastName: 'Hall',
        fullName: 'Brian Hall',
        annualSalary: 93000,
        hourlyRate: 44.71,
      },
    ];
  }

  /**
   * Finds an employee by their unique ID.
   * 
   * Searches through the employee array to find an employee with
   * the specified ID. Returns the employee object if found, or
   * undefined if no employee matches the ID.
   * 
   * @param {number} id - The unique employee ID to search for
   * @returns {Employee | undefined} The employee object or undefined if not found
   * @memberof EmployeeService
   * 
   * @example
   * ```typescript
   * // Find specific employee
   * const employee = this.employeeService.getEmployeeById(1);
   * if (employee) {
   *   console.log('Found employee:', employee.fullName);
   * }
   * 
   * // Check if employee exists
   * const employee = this.employeeService.getEmployeeById(999);
   * if (!employee) {
   *   console.log('Employee not found');
   * }
   * ```
   */
  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find((employee) => employee.id === id);
  }
}
