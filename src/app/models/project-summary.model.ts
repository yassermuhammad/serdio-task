/**
 * Interface for project summary data.
 *
 * Contains aggregated data for each project including totals and averages.
 *
 * @interface ProjectSummary
 * @memberof ProjectsSummaryComponent
 */
export interface ProjectSummary {
  projectId: number;
  projectName: string;
  projectStatus: string;
  totalHours: number;
  totalValue: number;
  employeeCount: number;
  averageHoursPerEmployee: number;
  averageValuePerEmployee: number;
}

/**
 * Interface for overall totals across all projects.
 *
 * Contains the sum of all hours, monetary value, and employee count.
 *
 * @interface OverallTotals
 * @memberof ProjectsSummaryComponent
 */
export interface OverallTotals {
  totalHours: number;
  totalValue: number;
  totalEmployees: number;
}
