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

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find((employee) => employee.id === id);
  }
}
