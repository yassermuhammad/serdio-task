import { Injectable } from '@angular/core';
import { Employee } from '@models/employee.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor() {}

  // Mock data for employees
  private employees: Employee[] = this.getEmployees();


  getEmployeesStream(): Observable<Employee[]> {
    return of(this.employees);
  }

  getAverageAnnualSalary(): number {
    if (this.employees.length === 0) return 0;
    return this.employees.reduce((sum, employee) => sum + employee.annualSalary, 0) / this.employees.length;
  }

  getAverageHourlyRate(): number {
    if (this.employees.length === 0) return 0;
    return this.employees.reduce((sum, employee) => sum + employee.hourlyRate, 0) / this.employees.length;
  }

  /**
   * Mock data for employees
   *
   * @return {*}  {Employee[]}
   * @memberof EmployeeService
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
    ];
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find((employee) => employee.id === id);
  }
}
