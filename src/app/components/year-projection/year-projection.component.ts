import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '@models/employee.model';
import { Project, ProjectWorkData } from '@models/project.model';
import { EmployeeService } from '@services/employee/employee.service';
import { ProjectsService } from '@services/projects/projects.service';
import { UtilsService } from '@services/utils/utils.service';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController } from 'chart.js';
import { YearProjection, MonthlyProjection } from '@models/year-projection.model';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController);

/**
 * YearProjectionComponent displays projections for the remainder of the year.
 * 
 * This component calculates expected hours and monetary amounts for the rest
 * of the year based on current project data and employee rates. It provides
 * both visual charts and detailed breakdowns of the projections.
 * 
 * @example
 * ```html
 * <sred-ts-year-projection></sred-ts-year-projection>
 * ```
 * 
 * @author Yasser Abdel-Maksoud
 * @since 1.0.0
 */
@Component({
  selector: 'sred-ts-year-projection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './year-projection.component.html',
  styleUrl: './year-projection.component.scss'
})
export class YearProjectionComponent implements OnInit {
  /**
   * Array of employee data loaded from the employee service.
   * 
   * Contains all employee information including hourly rates needed
   * for calculating projections.
   * 
   * @type {Employee[]}
   * @memberof YearProjectionComponent
   */
  employees: Employee[] = [];

  /**
   * Array of project data loaded from the projects service.
   * 
   * Contains project information including status and dates needed
   * for determining which projects are active for the remainder of the year.
   * 
   * @type {Project[]}
   * @memberof YearProjectionComponent
   */
  projects: Project[] = [];

  /**
   * Array of project work data containing employee assignments and metrics.
   * 
   * Contains historical work data used to calculate average productivity
   * and project completion rates.
   * 
   * @type {ProjectWorkData[]}
   * @memberof YearProjectionComponent
   */
  workData: ProjectWorkData[] = [];

  /**
   * Year projection data containing calculated estimates.
   * 
   * Contains projected hours, monetary value, and other metrics
   * for the remainder of the year.
   * 
   * @type {YearProjection}
   * @memberof YearProjectionComponent
   */
  yearProjection: YearProjection = {
    totalProjectedHours: 0,
    totalProjectedValue: 0,
    activeProjects: 0,
    activeEmployees: 0,
    averageHoursPerMonth: 0,
    averageValuePerMonth: 0,
    remainingMonths: 0,
    monthlyBreakdown: []
  };

  /**
   * Current date for calculations.
   * 
   * Used to determine how many months remain in the year
   * and calculate projections accordingly.
   * 
   * @type {Date}
   * @memberof YearProjectionComponent
   */
  currentDate: Date = new Date();

  /**
   * Injected service for managing employee data operations.
   * 
   * Provides methods for fetching employee information and hourly rates.
   * 
   * @private
   * @type {EmployeeService}
   * @memberof YearProjectionComponent
   */
  private employeeService: EmployeeService = inject(EmployeeService);

  /**
   * Injected service for managing project data operations.
   * 
   * Provides methods for fetching project information and work data.
   * 
   * @private
   * @type {ProjectsService}
   * @memberof YearProjectionComponent
   */
  private projectsService: ProjectsService = inject(ProjectsService);

  /**
   * Injected service for managing utility functions.
   * 
   * Provides methods for formatting data and other utility functions.
   * 
   * @private
   * @type {UtilsService}
   * @memberof YearProjectionComponent
   */
  private utilsService: UtilsService = inject(UtilsService);

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * 
   * Initializes the component by loading all required data from services
   * and calculating year projections.
   * 
   * @returns {void}
   * @memberof YearProjectionComponent
   */
  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Loads all required data from services and initializes the component.
   * 
   * This method fetches employee, project, and work data simultaneously
   * using Promise.all for better performance. It calculates year projections
   * once all data is loaded.
   * 
   * @returns {void}
   * @memberof YearProjectionComponent
   * 
   * @example
   * ```typescript
   * // Called automatically in ngOnInit
   * this.loadData();
   * ```
   */
  loadData(): void {
    Promise.all([
      this.employeeService.getEmployeesStream().toPromise(),
      this.projectsService.getProjects().toPromise(),
      this.projectsService.getWorkData().toPromise()
    ]).then(([employees, projects, workData]) => {
      this.employees = employees || [];
      this.projects = projects || [];
      this.workData = workData || [];
      
      this.calculateYearProjection();
    });
  }

  /**
   * Calculates year projection based on current data and trends.
   * 
   * This method analyzes current project status, employee productivity,
   * and historical data to project hours and monetary value for the
   * remainder of the year.
   * 
   * @returns {void}
   * @memberof YearProjectionComponent
   * 
   * @example
   * ```typescript
   * // Calculate year projection
   * this.calculateYearProjection();
   * ```
   */
  calculateYearProjection(): void {
    // Get active projects (not completed)
    const activeProjects = this.projects.filter(project => 
      project.status.toLowerCase() !== 'completed'
    );

    // Calculate remaining months in the year
    const currentMonth = this.currentDate.getMonth();
    const remainingMonths = 12 - currentMonth;

    // Calculate average productivity from historical data
    const totalHistoricalHours = this.workData.reduce((sum, data) => sum + data.hoursWorked, 0);
    const totalHistoricalValue = this.workData.reduce((sum, data) => sum + data.monetaryValue, 0);
    
    // Calculate average hours per employee per month
    const uniqueEmployees = new Set(this.workData.map(data => data.employeeId));
    const averageHoursPerEmployeePerMonth = totalHistoricalHours / (uniqueEmployees.size * 12);

    // Calculate average value per employee per month
    const averageValuePerEmployeePerMonth = totalHistoricalValue / (uniqueEmployees.size * 12);

    // Project for remaining months
    const activeEmployeeIds = new Set();
    activeProjects.forEach(project => {
      const projectWorkData = this.workData.filter(data => data.projectId === project.id);
      projectWorkData.forEach(data => activeEmployeeIds.add(data.employeeId));
    });

    const activeEmployeeCount = activeEmployeeIds.size;
    const projectedHoursPerMonth = averageHoursPerEmployeePerMonth * activeEmployeeCount;
    const projectedValuePerMonth = averageValuePerEmployeePerMonth * activeEmployeeCount;

    // Calculate monthly breakdown
    const monthlyBreakdown: MonthlyProjection[] = [];
    for (let i = 0; i < remainingMonths; i++) {
      const monthIndex = currentMonth + i;
      const monthName = this.getMonthName(monthIndex);
      
      monthlyBreakdown.push({
        month: monthName,
        monthIndex: monthIndex,
        projectedHours: projectedHoursPerMonth,
        projectedValue: projectedValuePerMonth,
        cumulativeHours: projectedHoursPerMonth * (i + 1),
        cumulativeValue: projectedValuePerMonth * (i + 1)
      });
    }

    this.yearProjection = {
      totalProjectedHours: projectedHoursPerMonth * remainingMonths,
      totalProjectedValue: projectedValuePerMonth * remainingMonths,
      activeProjects: activeProjects.length,
      activeEmployees: activeEmployeeCount,
      averageHoursPerMonth: projectedHoursPerMonth,
      averageValuePerMonth: projectedValuePerMonth,
      remainingMonths: remainingMonths,
      monthlyBreakdown: monthlyBreakdown
    };
  }

  /**
   * Gets the month name from month index.
   * 
   * Converts a month index (0-11) to a human-readable month name.
   * 
   * @param {number} monthIndex - The month index (0-11)
   * @returns {string} The month name (e.g., "January", "February")
   * @memberof YearProjectionComponent
   * 
   * @example
   * ```typescript
   * // Get month name
   * const monthName = this.getMonthName(0);
   * // Returns: "January"
   * ```
   */
  getMonthName(monthIndex: number): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
  }

  /**
   * Formats a numeric amount as currency for display.
   * 
   * Converts a number to a properly formatted currency string with
   * appropriate symbols, commas, and decimal places based on the locale.
   * Used for displaying monetary values in the projections.
   * 
   * @param {number} amount - The numeric amount to format as currency
   * @returns {string} Formatted currency string (e.g., "$75,000.00")
   * @memberof YearProjectionComponent
   * 
   * @example
   * ```typescript
   * // Format monetary value for display
   * const formattedValue = this.formatCurrency(75000);
   * // Returns: "$75,000.00"
   * ```
   */
  formatCurrency(amount: number): string {
    return this.utilsService.formatCurrency(amount);
  }

  /**
   * Gets the status badge class for styling project status.
   * 
   * This method returns the appropriate CSS class for styling project
   * status badges based on the project status value.
   * 
   * @param {string} status - The project status
   * @returns {string} CSS class for status badge styling
   * @memberof YearProjectionComponent
   * 
   * @example
   * ```typescript
   * // Get status badge class
   * const badgeClass = this.getStatusBadgeClass('In Progress');
   * // Returns: "bg-yellow-100 text-yellow-800"
   * ```
   */
  getStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  /**
   * Gets active projects for display in the component.
   * 
   * Returns projects that are not completed and will continue
   * into the remainder of the year.
   * 
   * @returns {Project[]} Array of active projects
   * @memberof YearProjectionComponent
   * 
   * @example
   * ```typescript
   * // Get active projects
   * const activeProjects = this.getActiveProjects();
   * ```
   */
  getActiveProjects(): Project[] {
    return this.projects.filter(project => 
      project.status.toLowerCase() !== 'completed'
    );
  }
}




