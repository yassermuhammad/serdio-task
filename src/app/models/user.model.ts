import { UtilsService } from '@services/utils/utils.service';

/**
 * Interface representing user data in the application.
 * 
 * This interface defines the structure for user information including
 * personal details, authentication data, and display preferences.
 * Used for user management and profile display throughout the application.
 * 
 * @interface IUser
 * @property {string} name - User's full name
 * @property {string} email - User's email address
 * @property {string} avatar - URL to user's avatar image
 * @property {string} role - User's role in the system
 * @property {string} [initials] - Optional user initials for display
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
 * User class that wraps user data and provides utility methods.
 * 
 * This class extends the IUser interface and provides additional
 * functionality such as generating user initials and managing
 * user-related operations. Used for user display and management.
 * 
 * @class User
 * @implements {IUser}
 * 
 * @example
 * ```typescript
 * // Create user from interface data
 * const userData: IUser = {
 *   name: 'John Doe',
 *   email: 'john.doe@example.com',
 *   avatar: 'https://via.placeholder.com/150',
 *   role: 'Admin'
 * };
 * 
 * const user = new User(userData);
 * console.log(user.initials); // 'JD'
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
   * User's initials generated from their name.
   * 
   * @type {string}
   * @memberof User
   */
  initials: string;

  /**
   * User's role in the system.
   * 
   * @type {string}
   * @memberof User
   */
  role: string;

  /**
   * Initializes a new User instance with the provided user data.
   * 
   * The constructor takes an IUser object and initializes all
   * properties, including generating the user's initials from
   * their full name.
   * 
   * @param {IUser} user - User data to initialize the User instance
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
   * // user.name = 'John Doe'
   * // user.initials = 'JD'
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
   * Generates user initials from their full name.
   * 
   * Takes a full name and extracts the first letter of each word,
   * converting them to uppercase. This is used for avatar fallbacks
   * and user identification.
   * 
   * @param {string} name - Full name to generate initials from
   * @returns {string} Uppercase initials (e.g., 'JD' for 'John Doe')
   * @memberof User
   * 
   * @example
   * ```typescript
   * const user = new User(userData);
   * const initials = user.getInitials('John Doe');
   * console.log(initials); // 'JD'
   * 
   * const initials2 = user.getInitials('Mary Jane Wilson');
   * console.log(initials2); // 'MJW'
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
