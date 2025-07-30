import { Injectable } from '@angular/core';
import { Project, ProjectWorkData } from '@models/project.model';
import { of } from 'rxjs';

/**
 * ProjectsService manages project data and work allocation information
 * for the timesheet dashboard application.
 * 
 * This service provides comprehensive project management functionality
 * including project information, work data, and employee-project
 * assignments. It contains mock data for 5 projects with realistic
 * work allocation data for 25 employees across different projects.
 * 
 * @example
 * ```typescript
 * // Inject the service
 * constructor(private projectsService: ProjectsService) {}
 * 
 * // Get all projects
 * this.projectsService.getProjects().subscribe(projects => {
 *   console.log('Projects:', projects);
 * });
 * 
 * // Get work data for specific project
 * this.projectsService.getWorkDataByProject(1).subscribe(workData => {
 *   console.log('Project work data:', workData);
 * });
 * ```
 * 
 * @author Yasser Abdel-Maksoud
 * @since 1.0.0
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  /**
   * Mock project data with 5 different projects.
   * 
   * This array contains project information for various development
   * and business projects with different scopes and requirements.
   * Each project includes id, name, description, status, and dates.
   * 
   * @type {Project[]}
   * @private
   * @memberof ProjectsService
   */
  private projects: Project[] = [
    {
      id: 1,
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration',
      status: 'In Progress',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-06-30')
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Cross-platform mobile application for iOS and Android',
      status: 'Completed',
      startDate: new Date('2023-11-01'),
      endDate: new Date('2024-03-15')
    },
    {
      id: 3,
      name: 'Data Analytics Dashboard',
      description: 'Real-time analytics dashboard with data visualization',
      status: 'In Progress',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-08-31')
    },
    {
      id: 4,
      name: 'API Integration Services',
      description: 'Third-party API integration and microservices development',
      status: 'Planning',
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-09-30')
    },
    {
      id: 5,
      name: 'Cloud Migration Project',
      description: 'Legacy system migration to cloud infrastructure',
      status: 'In Progress',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-12-31')
    }
  ];

  /**
   * Mock work data for employees across different projects.
   * 
   * This array contains work allocation data for all 25 employees
   * across the 5 projects, with realistic hours and monetary values
   * based on employee hourly rates. Each entry represents an
   * employee's work on a specific project.
   * 
   * @type {ProjectWorkData[]}
   * @private
   * @memberof ProjectsService
   */
  private workData: ProjectWorkData[] = [
    // E-commerce Platform (Project 1)
    { projectId: 1, employeeId: 1, hoursWorked: 120, monetaryValue: 4327.20 },
    { projectId: 1, employeeId: 2, hoursWorked: 95, monetaryValue: 3882.65 },
    { projectId: 1, employeeId: 3, hoursWorked: 80, monetaryValue: 2500.00 },
    { projectId: 1, employeeId: 4, hoursWorked: 110, monetaryValue: 4759.70 },
    { projectId: 1, employeeId: 5, hoursWorked: 75, monetaryValue: 2523.75 },
    { projectId: 1, employeeId: 6, hoursWorked: 85, monetaryValue: 3487.00 },
    { projectId: 1, employeeId: 7, hoursWorked: 100, monetaryValue: 4567.00 },
    { projectId: 1, employeeId: 8, hoursWorked: 90, monetaryValue: 3525.00 },
    { projectId: 1, employeeId: 9, hoursWorked: 105, monetaryValue: 4624.55 },
    { projectId: 1, employeeId: 10, hoursWorked: 70, monetaryValue: 2423.40 },

    // Mobile App Development (Project 2)
    { projectId: 2, employeeId: 11, hoursWorked: 85, monetaryValue: 3759.55 },
    { projectId: 2, employeeId: 12, hoursWorked: 95, monetaryValue: 3473.00 },
    { projectId: 2, employeeId: 13, hoursWorked: 110, monetaryValue: 4389.00 },
    { projectId: 2, employeeId: 14, hoursWorked: 65, monetaryValue: 2124.85 },
    { projectId: 2, employeeId: 15, hoursWorked: 100, monetaryValue: 4183.00 },
    { projectId: 2, employeeId: 16, hoursWorked: 80, monetaryValue: 2846.40 },
    { projectId: 2, employeeId: 17, hoursWorked: 115, monetaryValue: 4981.25 },
    { projectId: 2, employeeId: 18, hoursWorked: 90, monetaryValue: 3418.20 },
    { projectId: 2, employeeId: 19, hoursWorked: 105, monetaryValue: 4441.75 },
    { projectId: 2, employeeId: 20, hoursWorked: 75, monetaryValue: 2632.50 },

    // Data Analytics Dashboard (Project 3)
    { projectId: 3, employeeId: 21, hoursWorked: 95, monetaryValue: 4065.05 },
    { projectId: 3, employeeId: 22, hoursWorked: 85, monetaryValue: 3186.70 },
    { projectId: 3, employeeId: 23, hoursWorked: 100, monetaryValue: 4038.00 },
    { projectId: 3, employeeId: 24, hoursWorked: 70, monetaryValue: 2389.10 },
    { projectId: 3, employeeId: 25, hoursWorked: 110, monetaryValue: 5118.10 },
    { projectId: 3, employeeId: 1, hoursWorked: 60, monetaryValue: 2163.60 },
    { projectId: 3, employeeId: 2, hoursWorked: 85, monetaryValue: 3473.95 },
    { projectId: 3, employeeId: 3, hoursWorked: 70, monetaryValue: 2187.50 },
    { projectId: 3, employeeId: 4, hoursWorked: 95, monetaryValue: 4110.65 },
    { projectId: 3, employeeId: 5, hoursWorked: 65, monetaryValue: 2187.25 },

    // API Integration Services (Project 4)
    { projectId: 4, employeeId: 6, hoursWorked: 80, monetaryValue: 3281.60 },
    { projectId: 4, employeeId: 7, hoursWorked: 105, monetaryValue: 4795.35 },
    { projectId: 4, employeeId: 8, hoursWorked: 90, monetaryValue: 3525.00 },
    { projectId: 4, employeeId: 9, hoursWorked: 115, monetaryValue: 5068.65 },
    { projectId: 4, employeeId: 10, hoursWorked: 75, monetaryValue: 2596.50 },
    { projectId: 4, employeeId: 11, hoursWorked: 100, monetaryValue: 4423.00 },
    { projectId: 4, employeeId: 12, hoursWorked: 85, monetaryValue: 3109.00 },
    { projectId: 4, employeeId: 13, hoursWorked: 110, monetaryValue: 4389.00 },
    { projectId: 4, employeeId: 14, hoursWorked: 65, monetaryValue: 2124.85 },
    { projectId: 4, employeeId: 15, hoursWorked: 95, monetaryValue: 3973.85 },

    // Cloud Migration Project (Project 5)
    { projectId: 5, employeeId: 16, hoursWorked: 120, monetaryValue: 4270.80 },
    { projectId: 5, employeeId: 17, hoursWorked: 95, monetaryValue: 4111.25 },
    { projectId: 5, employeeId: 18, hoursWorked: 100, monetaryValue: 3798.00 },
    { projectId: 5, employeeId: 19, hoursWorked: 85, monetaryValue: 3651.75 },
    { projectId: 5, employeeId: 20, hoursWorked: 110, monetaryValue: 3853.50 },
    { projectId: 5, employeeId: 21, hoursWorked: 75, monetaryValue: 3207.75 },
    { projectId: 5, employeeId: 22, hoursWorked: 105, monetaryValue: 3932.70 },
    { projectId: 5, employeeId: 23, hoursWorked: 90, monetaryValue: 3634.20 },
    { projectId: 5, employeeId: 24, hoursWorked: 115, monetaryValue: 3927.65 },
    { projectId: 5, employeeId: 25, hoursWorked: 80, monetaryValue: 3576.80 }
  ];

  /**
   * Initializes the ProjectsService.
   * 
   * The constructor initializes the service and prepares
   * the project and work data for use throughout the application.
   * 
   * @memberof ProjectsService
   */
  constructor() { }

  /**
   * Gets all projects as an observable.
   * 
   * Returns an observable that emits the complete array of projects.
   * Components can subscribe to this observable to receive project
   * data updates in real-time.
   * 
   * @returns {Observable<Project[]>} Observable of all projects
   * @memberof ProjectsService
   * 
   * @example
   * ```typescript
   * // Subscribe to project data
   * this.projectsService.getProjects().subscribe(projects => {
   *   this.projects = projects;
   *   this.updateProjectList();
   * });
   * 
   * // Use in component
   * this.projectsService.getProjects().subscribe(projects => {
   *   this.availableProjects = projects.filter(p => p.status === 'In Progress');
   * });
   * ```
   */
  getProjects() {
    return of(this.projects);
  }

  /**
   * Gets all work data as an observable.
   * 
   * Returns an observable that emits the complete array of work data
   * containing employee-project assignments with hours and monetary values.
   * 
   * @returns {Observable<ProjectWorkData[]>} Observable of all work data
   * @memberof ProjectsService
   * 
   * @example
   * ```typescript
   * // Subscribe to work data
   * this.projectsService.getWorkData().subscribe(workData => {
   *   this.totalHours = workData.reduce((sum, work) => sum + work.hoursWorked, 0);
   *   this.totalValue = workData.reduce((sum, work) => sum + work.monetaryValue, 0);
   * });
   * ```
   */
  getWorkData() {
    return of(this.workData);
  }

  /**
   * Gets work data for a specific project.
   * 
   * Filters the work data to return only entries for the specified
   * project ID. Useful for project-specific analytics and reporting.
   * 
   * @param {number} projectId - The project ID to filter by
   * @returns {Observable<ProjectWorkData[]>} Observable of work data for the project
   * @memberof ProjectsService
   * 
   * @example
   * ```typescript
   * // Get work data for specific project
   * this.projectsService.getWorkDataByProject(1).subscribe(workData => {
   *   const projectHours = workData.reduce((sum, work) => sum + work.hoursWorked, 0);
   *   const projectValue = workData.reduce((sum, work) => sum + work.monetaryValue, 0);
   *   console.log(`Project hours: ${projectHours}, Value: $${projectValue}`);
   * });
   * ```
   */
  getWorkDataByProject(projectId: number) {
    const filteredData = this.workData.filter(work => work.projectId === projectId);
    return of(filteredData);
  }

  /**
   * Gets work data for a specific employee.
   * 
   * Filters the work data to return only entries for the specified
   * employee ID. Useful for employee-specific analytics and reporting.
   * 
   * @param {number} employeeId - The employee ID to filter by
   * @returns {Observable<ProjectWorkData[]>} Observable of work data for the employee
   * @memberof ProjectsService
   * 
   * @example
   * ```typescript
   * // Get work data for specific employee
   * this.projectsService.getWorkDataByEmployee(1).subscribe(workData => {
   *   const employeeHours = workData.reduce((sum, work) => sum + work.hoursWorked, 0);
   *   const employeeValue = workData.reduce((sum, work) => sum + work.monetaryValue, 0);
   *   console.log(`Employee hours: ${employeeHours}, Value: $${employeeValue}`);
   * });
   * ```
   */
  getWorkDataByEmployee(employeeId: number) {
    const filteredData = this.workData.filter(work => work.employeeId === employeeId);
    return of(filteredData);
  }

  /**
   * Gets a specific project by ID.
   * 
   * Searches through the projects array to find a project with the
   * specified ID. Returns undefined if no project is found.
   * 
   * @param {number} id - The project ID to search for
   * @returns {Observable<Project | undefined>} Observable of the project or undefined
   * @memberof ProjectsService
   * 
   * @example
   * ```typescript
   * // Get specific project
   * this.projectsService.getProjectById(1).subscribe(project => {
   *   if (project) {
   *     console.log('Project found:', project.name);
   *     this.displayProjectDetails(project);
   *   }
   * });
   * 
   * // Use in component
   * this.projectsService.getProjectById(this.selectedProjectId).subscribe(project => {
   *   this.currentProject = project;
   * });
   * ```
   */
  getProjectById(id: number) {
    const project = this.projects.find(p => p.id === id);
    return of(project);
  }
}
