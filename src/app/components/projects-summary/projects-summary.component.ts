import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Project, ProjectWorkData } from '@models/project.model';
import { ProjectsService } from '@services/projects/projects.service';
import { UtilsService } from '@services/utils/utils.service';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineController } from 'chart.js';
import { ProjectSummary, OverallTotals } from '@models/project-summary.model';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineController);

/**
 * ProjectsSummaryComponent displays a comprehensive summary of all projects.
 * 
 * This component provides a point styling chart and detailed table showing
 * total hours and monetary amounts for each project, plus overall totals
 * across all projects. It uses Chart.js with point styling for visualization.
 * 
 * @example
 * ```html
 * <sred-ts-projects-summary></sred-ts-projects-summary>
 * ```
 * 
 * @author Yasser Abdel-Maksoud
 * @since 1.0.0
 */
@Component({
  selector: 'sred-ts-projects-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-summary.component.html',
  styleUrl: './projects-summary.component.scss'
})
export class ProjectsSummaryComponent implements OnInit {
  /**
   * Reference to the canvas element used for chart rendering.
   * 
   * This ViewChild provides access to the HTML canvas element where
   * the Chart.js point styling chart will be rendered.
   * 
   * @type {ElementRef<HTMLCanvasElement>}
   * @memberof ProjectsSummaryComponent
   */
  @ViewChild('projectsChart') chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  /**
   * Array of project data loaded from the projects service.
   * 
   * Contains all project information including names, descriptions,
   * status, and other project metadata.
   * 
   * @type {Project[]}
   * @memberof ProjectsSummaryComponent
   */
  projects: Project[] = [];

  /**
   * Array of project work data containing employee assignments and metrics.
   * 
   * Contains work allocation data showing which employees worked on
   * which projects, including hours worked and monetary value generated.
   * 
   * @type {ProjectWorkData[]}
   * @memberof ProjectsSummaryComponent
   */
  workData: ProjectWorkData[] = [];

  /**
   * Chart.js chart instance for the projects summary visualization.
   * 
   * This property holds the Chart.js chart object that renders the
   * projects summary with point styling.
   * 
   * @type {Chart | null}
   * @memberof ProjectsSummaryComponent
   */
  chart: Chart | null = null;

  /**
   * Array of project summary data with calculated totals.
   * 
   * Contains aggregated data for each project including total hours,
   * total monetary value, and employee count.
   * 
   * @type {ProjectSummary[]}
   * @memberof ProjectsSummaryComponent
   */
  projectSummaries: ProjectSummary[] = [];

  /**
   * Overall totals across all projects.
   * 
   * Contains the sum of all hours, monetary value, and employee count
   * across all projects in the system.
   * 
   * @type {OverallTotals}
   * @memberof ProjectsSummaryComponent
   */
  overallTotals: OverallTotals = {
    totalHours: 0,
    totalValue: 0,
    totalEmployees: 0
  };

  /**
   * Injected service for managing project data operations.
   * 
   * Provides methods for fetching project information and work data.
   * 
   * @private
   * @type {ProjectsService}
   * @memberof ProjectsSummaryComponent
   */
  private projectsService: ProjectsService = inject(ProjectsService);

  /**
   * Injected service for managing utility functions.
   * 
   * Provides methods for formatting data and other utility functions.
   * 
   * @private
   * @type {UtilsService}
   * @memberof ProjectsSummaryComponent
   */
  private utilsService: UtilsService = inject(UtilsService);

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * 
   * Initializes the component by loading all required data from services
   * and calculating project summaries.
   * 
   * @returns {void}
   * @memberof ProjectsSummaryComponent
   */
  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Loads all required data from services and initializes the component.
   * 
   * This method fetches project and work data simultaneously using Promise.all
   * for better performance. It calculates project summaries and overall totals,
   * then creates the chart once all data is loaded.
   * 
   * @returns {void}
   * @memberof ProjectsSummaryComponent
   * 
   * @example
   * ```typescript
   * // Called automatically in ngOnInit
   * this.loadData();
   * ```
   */
  loadData(): void {
    Promise.all([
      this.projectsService.getProjects().toPromise(),
      this.projectsService.getWorkData().toPromise()
    ]).then(([projects, workData]) => {
      this.projects = projects || [];
      this.workData = workData || [];
      
      this.calculateProjectSummaries();
      this.calculateOverallTotals();
      
      // Create chart after all data is loaded
      setTimeout(() => {
        this.createChart();
      }, 100);
    });
  }

  /**
   * Calculates summary data for each project.
   * 
   * This method processes the work data to calculate total hours,
   * monetary value, and employee count for each project. It creates
   * a summary array that will be used for both the chart and table.
   * 
   * @returns {void}
   * @memberof ProjectsSummaryComponent
   * 
   * @example
   * ```typescript
   * // Calculate summaries for all projects
   * this.calculateProjectSummaries();
   * ```
   */
  calculateProjectSummaries(): void {
    this.projectSummaries = this.projects.map(project => {
      const projectWorkData = this.workData.filter(data => data.projectId === project.id);
      
      const totalHours = projectWorkData.reduce((sum, data) => sum + data.hoursWorked, 0);
      const totalValue = projectWorkData.reduce((sum, data) => sum + data.monetaryValue, 0);
      const uniqueEmployeeIds = new Set(projectWorkData.map(data => data.employeeId));
      const employeeCount = uniqueEmployeeIds.size;
      
      return {
        projectId: project.id,
        projectName: project.name,
        projectStatus: project.status,
        totalHours,
        totalValue,
        employeeCount,
        averageHoursPerEmployee: employeeCount > 0 ? totalHours / employeeCount : 0,
        averageValuePerEmployee: employeeCount > 0 ? totalValue / employeeCount : 0
      };
    });
  }

  /**
   * Calculates overall totals across all projects.
   * 
   * This method aggregates the summary data to calculate total hours,
   * monetary value, and employee count across all projects in the system.
   * 
   * @returns {void}
   * @memberof ProjectsSummaryComponent
   * 
   * @example
   * ```typescript
   * // Calculate overall totals
   * this.calculateOverallTotals();
   * ```
   */
  calculateOverallTotals(): void {
    this.overallTotals = {
      totalHours: this.projectSummaries.reduce((sum, summary) => sum + summary.totalHours, 0),
      totalValue: this.projectSummaries.reduce((sum, summary) => sum + summary.totalValue, 0),
      totalEmployees: this.projectSummaries.reduce((sum, summary) => sum + summary.employeeCount, 0)
    };
  }

  /**
   * Creates and renders the Chart.js point styling chart with project data.
   * 
   * This method initializes the Chart.js chart with point styling to visualize
   * project data. It includes dual-axis configuration for hours and monetary value,
   * responsive design, and proper styling with point elements.
   * 
   * @returns {void}
   * @memberof ProjectsSummaryComponent
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
        
        this.chart = new Chart(ctx, {
          type: 'line',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Projects Summary - Hours vs Monetary Value',
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
                  text: 'Projects'
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
            },
            elements: {
              point: {
                radius: 8,
                hoverRadius: 12,
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2
              },
              line: {
                tension: 0.4
              }
            }
          }
        });
      }
    }
  }

  /**
   * Generates chart data for the projects summary visualization.
   * 
   * This method processes project summary data to create the chart datasets
   * for the point styling chart. It includes both hours and monetary value
   * data with proper styling for point elements.
   * 
   * @returns {any} Chart data structure with labels and datasets
   * @memberof ProjectsSummaryComponent
   * 
   * @example
   * ```typescript
   * // Get chart data for projects summary
   * const chartData = this.getChartData();
   * ```
   */
  getChartData(): any {    
    const projectNames = this.projectSummaries.map(summary => summary.projectName);
    const hoursData = this.projectSummaries.map(summary => summary.totalHours);
    const valueData = this.projectSummaries.map(summary => summary.totalValue);
    
    return {
      labels: projectNames,
      datasets: [
        {
          label: 'Total Hours',
          data: hoursData,
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 3,
          yAxisID: 'y',
          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 8,
          pointHoverRadius: 12
        },
        {
          label: 'Monetary Value ($)',
          data: valueData,
          backgroundColor: 'rgba(147, 51, 234, 0.8)',
          borderColor: 'rgba(147, 51, 234, 1)',
          borderWidth: 3,
          yAxisID: 'y1',
          pointBackgroundColor: 'rgba(147, 51, 234, 1)',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 8,
          pointHoverRadius: 12
        }
      ]
    };
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
   * @memberof ProjectsSummaryComponent
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
   * @memberof ProjectsSummaryComponent
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
}


