/**
 * Interface representing project work data for employees.
 *
 * This interface defines the structure for tracking employee work on projects,
 * including hours worked and monetary value generated.
 *
 * @interface ProjectWorkData
 * @property {number} projectId - Unique identifier for the project
 * @property {number} employeeId - Unique identifier for the employee
 * @property {number} hoursWorked - Total hours worked on the project
 * @property {number} monetaryValue - Monetary value generated from the work
 */
export interface ProjectWorkData {
  projectId: number;
  employeeId: number;
  hoursWorked: number;
  monetaryValue: number;
}

/**
 * Interface representing project information.
 *
 * This interface defines the structure for project details including
 * name, description, and other project metadata.
 *
 * @interface Project
 * @property {number} id - Unique identifier for the project
 * @property {string} name - Name of the project
 * @property {string} description - Description of the project
 * @property {string} status - Current status of the project
 * @property {Date} startDate - Project start date
 * @property {Date} endDate - Project end date (optional)
 */
export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  startDate: Date;
  endDate?: Date;
}
