import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeGridComponent } from '@components/employee-grid/employee-grid.component';
import { HeaderComponent } from '@components/header/header.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { ProjectChartComponent } from '@components/project-chart/project-chart.component';

@Component({
  selector: 'sred-ts-root',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, EmployeeGridComponent, ProjectChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'timesheet-dashboard';
}
