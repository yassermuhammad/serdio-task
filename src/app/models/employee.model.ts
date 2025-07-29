export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  annualSalary: number;
  hourlyRate: number;
}

export interface EmployeeWorkData {
  employeeId: number;
  projectId: number;
  hoursWorked: number;
  monetaryValue: number;
}
