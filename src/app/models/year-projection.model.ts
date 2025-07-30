/**
 * Interface for year projection data.
 *
 * Contains projected hours, monetary value, and other metrics
 * for the remainder of the year.
 *
 * @interface YearProjection
 * @memberof YearProjectionComponent
 */
export interface YearProjection {
  totalProjectedHours: number;
  totalProjectedValue: number;
  activeProjects: number;
  activeEmployees: number;
  averageHoursPerMonth: number;
  averageValuePerMonth: number;
  remainingMonths: number;
  monthlyBreakdown: MonthlyProjection[];
}

/**
 * Interface for monthly projection data.
 *
 * Contains projected metrics for each remaining month of the year.
 *
 * @interface MonthlyProjection
 * @memberof YearProjectionComponent
 */
export interface MonthlyProjection {
  month: string;
  monthIndex: number;
  projectedHours: number;
  projectedValue: number;
  cumulativeHours: number;
  cumulativeValue: number;
}
