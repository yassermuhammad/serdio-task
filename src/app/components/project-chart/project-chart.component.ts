import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '@models/employee.model';
import { Project, ProjectWorkData } from '@models/project.model';
import { EmployeeService } from '@services/employee/employee.service';
import { ProjectsService } from '@services/projects/projects.service';
import { UtilsService } from '@services/utils/utils.service';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController);

/**
 * ProjectChartComponent displays interactive charts for project data analysis.
 * 
 * This component provides a comprehensive dashboard for visualizing project metrics
 * including employee hours worked and monetary value generated. It features a project
 * selector dropdown, real-time chart updates, and detailed project statistics.
 * The chart uses Chart.js for rendering and supports dual-axis visualization.
 * 
 * @example
 * ```html
 * <sred-ts-project-chart></sred-ts-project-chart>
 * ```
 * 
 * @author Yasser Abdel-Maksoud
 * @since 1.0.0
 */
@Component({
  selector: 'sred-ts-project-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-chart.component.html',
  styleUrl: './project-chart.component.scss'
})
export class ProjectChartComponent implements OnInit {
  /**
   * Reference to the canvas element used for chart rendering.
   * 
   * This ViewChild provides access to the HTML canvas element where
   * the Chart.js chart will be rendered. It's used to get the 2D context
   * for drawing the chart.
   * 
   * @type {ElementRef<HTMLCanvasElement>}
   * @memberof ProjectChartComponent
   */
  @ViewChild('projectChart') chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  /**
   * Array of employee data loaded from the employee service.
   * 
   * Contains all employee information including names, IDs, and other
   * employee details needed for chart data generation and employee
   * name display in the chart labels.
   * 
   * @type {Employee[]}
   * @memberof ProjectChartComponent
   */
  employees: Employee[] = [];

  /**
   * Array of project data loaded from the projects service.
   * 
   * Contains project information including names, descriptions, status,
   * and other project metadata. Used for project selection dropdown
   * and project name display in chart titles.
   * 
   * @type {Project[]}
   * @memberof ProjectChartComponent
   */
  projects: Project[] = [];

  /**
   * Array of project work data containing employee assignments and metrics.
   * 
   * Contains work allocation data showing which employees worked on
   * which projects, including hours worked and monetary value generated.
   * This data is used to generate the chart datasets and calculate
   * project statistics.
   * 
   * @type {ProjectWorkData[]}
   * @memberof ProjectChartComponent
   */
  workData: ProjectWorkData[] = [];

  /**
   * Chart.js chart instance for the project visualization.
   * 
   * This property holds the Chart.js chart object that renders the
   * project data visualization. It's used for chart updates, destruction,
   * and data manipulation.
   * 
   * @type {Chart | null}
   * @memberof ProjectChartComponent
   */
  chart: Chart | null = null;

  /**
   * Currently selected project ID for chart filtering.
   * 
   * This property tracks which project is currently selected in the
   * dropdown. It determines which project's data is displayed in the
   * chart and used for statistics calculations.
   * 
   * @type {number}
   * @memberof ProjectChartComponent
   */
  selectedProject: number = 1;

  /**
   * Injected service for managing project data operations.
   * 
   * Provides methods for fetching project information, work data,
   * and other project-related business logic.
   * 
   * @private
   * @type {ProjectsService}
   * @memberof ProjectChartComponent
   */
  private projectsService: ProjectsService = inject(ProjectsService);

  /**
   * Injected service for managing employee data operations.
   * 
   * Provides methods for fetching employee information and other
   * employee-related business logic.
   * 
   * @private
   * @type {EmployeeService}
   * @memberof ProjectChartComponent
   */
  private employeeService: EmployeeService = inject(EmployeeService);

  /**
   * Injected service for managing utility functions.
   * 
   * Provides methods for formatting data and other utility functions.
   * 
   * @private
   * @type {UtilsService}
   * @memberof ProjectChartComponent
   */
  private utilService: UtilsService = inject(UtilsService);

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * 
   * Initializes the component by loading all required data from services.
   * This ensures that employee, project, and work data are available
   * before chart creation.
   * 
   * @returns {void}
   * @memberof ProjectChartComponent
   */
  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Loads all required data from services and initializes the component.
   * 
   * This method fetches employee, project, and work data simultaneously
   * using Promise.all for better performance. It sets the initial project
   * selection and triggers chart creation once all data is loaded.
   * 
   * @returns {void}
   * @memberof ProjectChartComponent
   * 
   * @example
   * ```typescript
   * // Called automatically in ngOnInit
   * this.loadData();
   * ```
   */
  loadData(): void {
    // Load all data first, then create chart
    Promise.all([
      this.employeeService.getEmployeesStream().toPromise(),
      this.projectsService.getProjects().toPromise(),
      this.projectsService.getWorkData().toPromise()
    ]).then(([employees, projects, workData]) => {
      this.employees = employees || [];
      this.projects = projects || [];
      this.workData = workData || [];
      
      // Set the first project as selected
      if (this.projects.length > 0) {
        this.selectedProject = this.projects[2].id;
      }
      
      // Create chart after all data is loaded
      setTimeout(() => {
        this.createChart();
      }, 100);
    });
  }

  /**
   * Creates and renders the Chart.js chart with project data.
   * 
   * This method initializes the Chart.js chart with the current project data.
   * It includes dual-axis configuration for hours and monetary value,
   * responsive design, and proper styling. The chart title dynamically
   * updates based on the selected project.
   * 
   * @returns {void}
   * @memberof ProjectChartComponent
   * 
   * @example
   * ```typescript
   * // Create chart after data is loaded
   * this.createChart();
   * ```
   */
  createChart(): void {
    if (this.chartCanvas && this.chartCanvas.nativeElement) {
      const ctx = this.chartCanvas.nativeElement.getContext('2d');
      
      if (ctx) {
        // Destroy existing chart if it exists
        if (this.chart) {
          this.chart.destroy();
        }
        
        const chartData = this.getChartData();
        
        // Get project name with fallback
        const projectName = this.getProjectName(this.selectedProject);
        
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: `Project Breakdown - ${projectName}`,
                font: {
                  size: 16,
                  weight: 'bold'
                }
              },
              legend: {
                display: true,
                position: 'top'
              }
            },
            scales: {
              x: {
                type: 'category',
                title: {
                  display: true,
                  text: 'Employees'
                }
              },
              y: {
                type: 'linear',
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Hours'
                }
              },
              y1: {
                type: 'linear',
                display: true,
                position: 'right',
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Monetary Value ($)'
                }
              }
            }
          }
        });
      }
    }
  }

  /**
   * Generates chart data for the currently selected project.
   * 
   * This method filters work data for the selected project and validates
   * that required data is available. It returns the data structure needed
   * for Chart.js rendering, including labels and datasets.
   * 
   * @returns {any} Chart data structure with labels and datasets
   * @memberof ProjectChartComponent
   * 
   * @example
   * ```typescript
   * // Get chart data for current project
   * const chartData = this.getChartData();
   * ```
   */
  getChartData(): any {
    // Validate that we have the required data
    if (!this.selectedProject || this.employees.length === 0 || this.workData.length === 0) {
      return this.getEmptyChartData();
    }
    
    // Ensure selectedProject is a number for comparison
    const selectedProjectId = Number(this.selectedProject);
    
    const projectWorkData = this.workData.filter(data => data.projectId === selectedProjectId);
    
    // Check if the selected project has any work data
    if (projectWorkData.length === 0) {
      return this.getEmptyChartData();
    }
    
    return this.getChartDataForProject(projectWorkData);
  }

  /**
   * Generates chart data for a specific set of work data.
   * 
   * This method processes work data to create the chart datasets. It filters
   * employees assigned to the project and creates arrays for hours worked
   * and monetary value. The data is structured for dual-axis chart display.
   * 
   * @param {ProjectWorkData[]} projectWorkData - Work data for the project
   * @returns {any} Chart data structure with labels and datasets
   * @memberof ProjectChartComponent
   * 
   * @example
   * ```typescript
   * // Generate chart data for specific work data
   * const chartData = this.getChartDataForProject(workData);
   * ```
   */
  private getChartDataForProject(projectWorkData: any[]): any {
    // Get only employees who are assigned to this project
    const assignedEmployeeIds = [...new Set(projectWorkData.map(data => data.employeeId))];
    const assignedEmployees = this.employees.filter(emp => assignedEmployeeIds.includes(emp.id));
    
    if (assignedEmployees.length === 0) {
      return this.getEmptyChartData();
    }
    
    const employeeNames = assignedEmployees.map(emp => emp.fullName);
    
    const hoursData = assignedEmployees.map(employee => {
      const workEntry = projectWorkData.find(data => data.employeeId === employee.id);
      return workEntry ? workEntry.hoursWorked : 0;
    });

    const monetaryData = assignedEmployees.map(employee => {
      const workEntry = projectWorkData.find(data => data.employeeId === employee.id);
      return workEntry ? workEntry.monetaryValue : 0;
    });

    return {
      labels: employeeNames,
      datasets: [
        {
          label: 'Hours Worked',
          data: hoursData,
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
          yAxisID: 'y'
        },
        {
          label: 'Monetary Value ($)',
          data: monetaryData,
          backgroundColor: 'rgba(147, 51, 234, 0.8)',
          borderColor: 'rgba(147, 51, 234, 1)',
          borderWidth: 1,
          yAxisID: 'y1'
        }
      ]
    };
  }

  /**
   * Verifies that the selected project has work data.
   * 
   * This method checks if the currently selected project has any associated
   * work data entries. It's used for validation before chart creation.
   * 
   * @returns {boolean} True if the project has work data, false otherwise
   * @memberof ProjectChartComponent
   * 
   * @example
   * ```typescript
   * // Check if selected project has data
   * const hasData = this.hasProjectWorkData();
   * ```
   */
  private hasProjectWorkData(): boolean {
    const projectWorkData = this.workData.filter(data => data.projectId === this.selectedProject);
    return projectWorkData.length > 0;
  }

  /**
   * Returns empty chart data structure for when no data is available.
   * 
   * This method provides a consistent empty chart structure when no
   * project data is available or when the selected project has no
   * work data. It maintains the chart structure without any data points.
   * 
   * @returns {any} Empty chart data structure
   * @memberof ProjectChartComponent
   * 
   * @example
   * ```typescript
   * // Get empty chart data
   * const emptyData = this.getEmptyChartData();
   * ```
   */
  private getEmptyChartData(): any {
    return {
      labels: [],
      datasets: [
        {
          label: 'Hours Worked',
          data: [],
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
          yAxisID: 'y'
        },
        {
          label: 'Monetary Value ($)',
          data: [],
          backgroundColor: 'rgba(147, 51, 234, 0.8)',
          borderColor: 'rgba(147, 51, 234, 1)',
          borderWidth: 1,
          yAxisID: 'y1'
        }
      ]
    };
  }

  /**
   * Updates the chart with new data when project selection changes.
   * 
   * This method handles chart updates when the user selects a different
   * project from the dropdown. It destroys the existing chart and creates
   * a new one with updated data to ensure proper rendering.
   * 
   * @returns {void}
   * @memberof ProjectChartComponent
   * 
   * @example
   * ```typescript
   * // Update chart when project changes
   * this.updateChart();
   * ```
   */
  updateChart(): void {
    // Ensure we have the canvas element
    if (!this.chartCanvas?.nativeElement) {
      setTimeout(() => {
        this.createChart();
      }, 100);
      return;
    }
    
    // Destroy existing chart and recreate for project changes
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    
    // Create new chart with updated data
    setTimeout(() => {
      this.createChart();
    }, 100);
  }

  /**
   * Handles project selection changes from the dropdown.
   * 
   * This method is called when the user selects a different project
   * from the dropdown. It triggers the chart update to display
   * data for the newly selected project.
   * 
   * @returns {void}
   * @memberof ProjectChartComponent
   * 
   * @example
   * ```typescript
   * // Called when dropdown selection changes
   * this.onProjectChange();
   * ```
   */
  onProjectChange(): void {
    this.updateChart();
  }

  /**
   * Formats a numeric amount as currency for display.
   * 
   * Converts a number to a properly formatted currency string with
   * appropriate symbols, commas, and decimal places based on the locale.
   * Used for displaying monetary values in the project statistics.
   * 
   * @param {number} amount - The numeric amount to format as currency
   * @returns {string} Formatted currency string (e.g., "$75,000.00")
   * @memberof ProjectChartComponent
   * 
   * @example
   * ```typescript
   * // Format monetary value for display
   * const formattedValue = this.formatCurrency(75000);
   * // Returns: "$75,000.00"
   * ```
   */
  formatCurrency(amount: number): string {
    return this.utilService.formatCurrency(amount);
  }

  /**
   * Gets the name of a project by its ID.
   * 
   * This method searches through the projects array to find a project
   * with the specified ID and returns its name. It includes fallback
   * handling for when the project is not found.
   * 
   * @param {number} projectId - The ID of the project to find
   * @returns {string} The project name or 'Unknown Project' if not found
   * @memberof ProjectChartComponent
   * 
   * @example
   * ```typescript
   * // Get project name by ID
   * const projectName = this.getProjectName(1);
   * // Returns: "E-commerce Platform"
   * ```
   */
  getProjectName(projectId: number): string {
    const project = this.projects.find(p => p.id == projectId);
    return project?.name || 'Unknown Project';
  }

  /**
   * Calculates the total hours worked on the selected project.
   * 
   * This method filters work data for the currently selected project
   * and sums up all hours worked by employees on that project.
   * Used for displaying project statistics in the dashboard.
   * 
   * @returns {number} Total hours worked on the selected project
   * @memberof ProjectChartComponent
   * 
   * @example
   * ```typescript
   * // Get total hours for current project
   * const totalHours = this.getProjectTotalHours();
   * // Returns: 850 (example value)
   * ```
   */
  getProjectTotalHours(): number {
    const selectedProjectId = Number(this.selectedProject);
    const projectWorkData = this.workData.filter(data => data.projectId === selectedProjectId);
    return projectWorkData.reduce((sum, data) => sum + data.hoursWorked, 0);
  }

  /**
   * Calculates the total monetary value generated by the selected project.
   * 
   * This method filters work data for the currently selected project
   * and sums up all monetary value generated by employees on that project.
   * Used for displaying project statistics in the dashboard.
   * 
   * @returns {number} Total monetary value generated by the selected project
   * @memberof ProjectChartComponent
   * 
   * @example
   * ```typescript
   * // Get total value for current project
   * const totalValue = this.getProjectTotalValue();
   * // Returns: 45000 (example value)
   * ```
   */
  getProjectTotalValue(): number {
    const selectedProjectId = Number(this.selectedProject);
    const projectWorkData = this.workData.filter(data => data.projectId === selectedProjectId);
    return projectWorkData.reduce((sum, data) => sum + data.monetaryValue, 0);
  }

  /**
   * Calculates the number of unique employees assigned to the selected project.
   * 
   * This method filters work data for the currently selected project
   * and counts the number of unique employees who have worked on it.
   * Used for displaying project statistics in the dashboard.
   * 
   * @returns {number} Number of unique employees on the selected project
   * @memberof ProjectChartComponent
   * 
   * @example
   * ```typescript
   * // Get employee count for current project
   * const employeeCount = this.getProjectEmployeeCount();
   * // Returns: 10 (example value)
   * ```
   */
  getProjectEmployeeCount(): number {
    const selectedProjectId = Number(this.selectedProject);
    const projectWorkData = this.workData.filter(data => data.projectId === selectedProjectId);
    const uniqueEmployeeIds = new Set(projectWorkData.map(data => data.employeeId));
    return uniqueEmployeeIds.size;
  }
} 
