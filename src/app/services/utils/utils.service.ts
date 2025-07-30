import { Injectable } from '@angular/core';

/**
 * UtilsService provides utility functions for common operations
 * such as currency formatting and data formatting across the application.
 * 
 * This service centralizes common formatting operations to ensure
 * consistency across all components and reduce code duplication.
 * 
 * @example
 * ```typescript
 * // Inject the service
 * constructor(private utilsService: UtilsService) {}
 * 
 * // Format currency
 * const formattedAmount = this.utilsService.formatCurrency(75000);
 * // Returns: "$75,000.00"
 * 
 * // Format hourly rate
 * const formattedRate = this.utilsService.formatHourlyRate(36.06);
 * // Returns: "$36.06"
 * ```
 * 
 * @author Yasser Abdel-Maksoud
 * @since 1.0.0
 */
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  /**
   * Formats a numeric amount as currency for display.
   * 
   * Converts a number to a properly formatted currency string with
   * appropriate symbols, commas, and decimal places based on the
   * US locale. Used for displaying monetary values throughout the
   * application.
   * 
   * @param {number} amount - The numeric amount to format as currency
   * @returns {string} Formatted currency string (e.g., "$75,000.00")
   * @memberof UtilsService
   * 
   * @example
   * ```typescript
   * // Format annual salary
   * const salary = this.utilsService.formatCurrency(75000);
   * // Returns: "$75,000.00"
   * 
   * // Format project value
   * const projectValue = this.utilsService.formatCurrency(125000);
   * // Returns: "$125,000.00"
   * 
   * // Format small amounts
   * const smallAmount = this.utilsService.formatCurrency(42.50);
   * // Returns: "$42.50"
   * ```
   */
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  /**
   * Formats an hourly rate as currency with consistent decimal places.
   * 
   * Converts a numeric hourly rate to a formatted currency string
   * with exactly 2 decimal places. This ensures consistent display
   * of hourly rates across the application.
   * 
   * @param {number} rate - The hourly rate to format (e.g., 36.06)
   * @returns {string} Formatted hourly rate string (e.g., "$36.06")
   * @memberof UtilsService
   * 
   * @example
   * ```typescript
   * // Format employee hourly rate
   * const hourlyRate = this.utilsService.formatHourlyRate(36.06);
   * // Returns: "$36.06"
   * 
   * // Format consultant rate
   * const consultantRate = this.utilsService.formatHourlyRate(125.50);
   * // Returns: "$125.50"
   * 
   * // Format with trailing zeros
   * const rateWithZeros = this.utilsService.formatHourlyRate(40.00);
   * // Returns: "$40.00"
   * ```
   */
  formatHourlyRate(rate: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(rate);
  }
  
}
