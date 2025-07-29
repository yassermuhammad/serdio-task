import { UtilsService } from '@services/utils/utils.service';

export interface IUser {
  name: string;
  email: string;
  avatar: string;
  role: string;
  initials?: string;
}

export class User {
  name: string;
  email: string;
  avatar: string;
  initials: string;
  role: string;
  constructor(private user: IUser) {
    this.name = this.user.name;
    this.email = this.user.email;
    this.avatar = this.user.avatar;
    this.role = this.user.role;
    this.initials = this.getInitials(this.name);
  }

  /**
   * Get the initials of a name
   *
   * @param {string} name
   * @return {*}  {string}
   * @memberof User
   */
  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }
}
