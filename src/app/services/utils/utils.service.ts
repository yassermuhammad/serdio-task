import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }
/**
 * Get the initials of a name
 *
 * @param {string} name
 * @return {*}  {string}
 * @memberof UtilsService
 */
getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}
