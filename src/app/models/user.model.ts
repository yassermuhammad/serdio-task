import { UtilsService } from '@services/utils/utils.service';

/**
 * Interface representing user information in the application.
 * 
 * This interface defines the structure for user data including
 * personal information, authentication details, and display preferences.
 * Used for user management and header display functionality.
 * 
 * @interface IUser
 * @property {string} name - User's full name
 * @property {string} email - User's email address
 * @property {string} avatar - URL to user's avatar image
 * @property {string} role - User's role in the application
 * @property {string} [initials] - User's initials (optional)
 * 
 * @example
 * ```typescript
 * const userData: IUser = {
 *   name: 'John Doe',
 *   email: 'john.doe@example.com',
 *   avatar: 'https://via.placeholder.com/150',
 *   role: 'Admin',
 *   initials: 'JD'
 * };
 * ```
 * 
 * @author Yasser Abdel-Maksoud
 * @since 1.0.0
 */
export interface IUser {
  name: string;
  email: string;
  avatar: string;
  role: string;
  initials?: string;
}

/**
 * User class for managing user information and functionality.
 * 
 * This class provides a structured way to handle user data with
 * additional functionality like generating initials from the user's name.
 * It wraps the IUser interface and adds computed properties.
 * 
 * @class User
 * @implements {IUser}
 * 
 * @example
 * ```typescript
 * // Create user instance
 * const userData: IUser = {
 *   name: 'John Doe',
 *   email: 'john.doe@example.com',
 *   avatar: 'https://via.placeholder.com/150',
 *   role: 'Admin'
 * };
 * 
 * const user = new User(userData);
 * console.log(user.initials); // Output: 'JD'
 * ```
 * 
 * @author Yasser Abdel-Maksoud
 * @since 1.0.0
 */
export class User {
  /**
   * User's full name.
   * 
   * @type {string}
   * @memberof User
   */
  name: string;

  /**
   * User's email address.
   * 
   * @type {string}
   * @memberof User
   */
  email: string;

  /**
   * URL to user's avatar image.
   * 
   * @type {string}
   * @memberof User
   */
  avatar: string;

  /**
   * User's computed initials from their name.
   * 
   * @type {string}
   * @memberof User
   */
  initials: string;

  /**
   * User's role in the application.
   * 
   * @type {string}
   * @memberof User
   */
  role: string;

  /**
   * Initializes a new User instance.
   * 
   * Creates a new User object with the provided user data and
   * automatically generates initials from the user's name.
   * 
   * @param {IUser} user - User data object
   * @memberof User
   * 
   * @example
   * ```typescript
   * const userData: IUser = {
   *   name: 'John Doe',
   *   email: 'john.doe@example.com',
   *   avatar: 'https://via.placeholder.com/150',
   *   role: 'Admin'
   * };
   * 
   * const user = new User(userData);
   * ```
   */
  constructor(private user: IUser) {
    this.name = this.user.name;
    this.email = this.user.email;
    this.avatar = this.user.avatar;
    this.role = this.user.role;
    this.initials = this.getInitials(this.name);
  }

  /**
   * Generates initials from a full name.
   * 
   * Takes a full name string and extracts the first letter of each
   * word to create initials. The result is converted to uppercase.
   * 
   * @param {string} name - The full name to generate initials from
   * @returns {string} Uppercase initials (e.g., 'JD' for 'John Doe')
   * @memberof User
   * 
   * @example
   * ```typescript
   * // Generate initials
   * const initials = this.getInitials('John Doe'); // Returns: 'JD'
   * const initials2 = this.getInitials('Mary Jane Smith'); // Returns: 'MJS'
   * 
   * // Use in template
   * <div class="user-initials">{{ user.initials }}</div>
   * ```
   */
  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }
}
