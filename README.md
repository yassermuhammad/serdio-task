# 📊 Timesheet Dashboard

A comprehensive Angular-based timesheet management system that provides real-time project tracking, employee management, and financial analytics. This dashboard offers powerful insights into project performance, employee productivity, and year-end projections.

## 🌟 Live Demo

**🔗 [View Live Application](https://yassermuhammad.github.io/serdio-task/)**

## ✨ Features

### 📋 Employee Management
- **Employee Grid**: Complete employee listing with pagination
- **25+ Employee Records**: Comprehensive mock data for testing
- **Search & Filter**: Easy employee lookup and filtering
- **No Data Handling**: Graceful handling of empty states

### 📈 Project Analytics
- **Project Breakdown Chart**: Interactive Chart.js visualization
- **Real-time Filtering**: Filter by specific projects
- **Performance Metrics**: Total hours, value, and employee counts
- **Dynamic Updates**: Real-time chart updates on project selection

### 📊 Projects Summary
- **Point Styling Charts**: Beautiful Chart.js line charts with dual Y-axis
- **Comprehensive Totals**: Sum of all hours and monetary values
- **Project Status Tracking**: Visual status indicators (Completed, In Progress, Planning)
- **Employee Analytics**: Average hours and value per employee

### 🔮 Year Projection
- **Forecasting Engine**: Predicts year-end totals based on historical data
- **Monthly Breakdown**: Detailed monthly projections
- **Active Project Tracking**: Real-time active project monitoring
- **Financial Planning**: Total projected hours and monetary values

## 🛠️ Technology Stack

### Frontend Framework
- **Angular 17**: Latest Angular framework with standalone components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework for modern UI

### Data Visualization
- **Chart.js**: Professional charts and graphs
- **Point Styling**: Custom chart configurations
- **Dual Y-axis**: Hours and monetary value visualization

### Development Tools
- **Angular CLI**: Development and build tools
- **PostCSS**: CSS processing
- **GitHub Actions**: CI/CD automation

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yassermuhammad/serdio-task.git
   cd serdio-task
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

### Build Commands

```bash
# Development build
npm run build

# Production build
npm run build:prod

# Run tests
npm test

# Run linting
npm run lint
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── employee-grid/          # Employee management
│   │   ├── project-chart/          # Project analytics
│   │   ├── projects-summary/       # Projects overview
│   │   ├── year-projection/        # Year forecasting
│   │   └── navbar/                 # Navigation
│   ├── services/
│   │   ├── employee/               # Employee data service
│   │   ├── projects/               # Project data service
│   │   ├── theme/                  # Theme management
│   │   └── utils/                  # Utility functions
│   ├── models/                     # TypeScript interfaces
│   └── constants/                  # Application constants
├── assets/                         # Static assets
└── styles.scss                     # Global styles
```

## 🎯 Key Components

### Employee Grid Component
- **Pagination**: Handles large datasets efficiently
- **Search**: Real-time employee filtering
- **Responsive Design**: Works on all device sizes
- **Empty States**: User-friendly no-data messages

### Project Chart Component
- **Interactive Charts**: Chart.js with custom styling
- **Project Filtering**: Dynamic project selection
- **Real-time Stats**: Live updates of project metrics
- **Performance Optimized**: Efficient chart rendering

### Projects Summary Component
- **Dual-axis Charts**: Hours and monetary value visualization
- **Comprehensive Totals**: Overall project statistics
- **Status Tracking**: Visual project status indicators
- **Detailed Tables**: Complete project breakdown

### Year Projection Component
- **Forecasting Engine**: Predictive analytics
- **Monthly Breakdown**: Detailed monthly projections
- **Active Project Monitoring**: Real-time project tracking
- **Financial Planning**: Year-end financial predictions

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v3 for styling:
- **Utility-first**: Rapid UI development
- **Custom Configuration**: Optimized for the project
- **Responsive Design**: Mobile-first approach

### Chart.js Integration
- **Custom Styling**: Point styling and dual Y-axis
- **Performance**: Optimized chart rendering
- **Responsive**: Charts adapt to container size

## 🚀 Deployment

### GitHub Pages
The application is automatically deployed to GitHub Pages:
- **URL**: https://yassermuhammad.github.io/serdio-task/
- **Auto-deployment**: Triggers on push to main branch
- **CI/CD**: GitHub Actions workflow

### Build Configuration
```json
{
  "build:prod": "ng build --configuration production --base-href=/serdio-task/"
}
```

## 📊 Data Sources

### Mock Data Services
- **Employee Service**: 25+ employee records with detailed information
- **Projects Service**: 5 projects with comprehensive work data
- **Work Data**: Employee-project assignments with hours and values

### Data Models
```typescript
interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  hireDate: Date;
  salary: number;
}

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  startDate: Date;
  endDate: Date;
  budget: number;
}
```

## 🎨 UI/UX Features

### Modern Design
- **Clean Interface**: Minimalist, professional design
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Enhanced user experience
- **Accessibility**: WCAG compliant design

### Color Scheme
- **Primary**: Blue (#3B82F6) for charts and highlights
- **Secondary**: Purple (#9333EA) for monetary values
- **Status Colors**: Green (completed), Yellow (in progress), Blue (planning)

## 🔍 Performance

### Optimization Features
- **Lazy Loading**: Components load on demand
- **Bundle Optimization**: Efficient code splitting
- **Chart Performance**: Optimized chart rendering
- **Memory Management**: Proper cleanup and disposal

### Bundle Size
- **Main Bundle**: ~462KB (compressed)
- **Polyfills**: ~33KB
- **Styles**: ~23KB
- **Total**: ~520KB (within acceptable limits)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Yasser Abdel-Maksoud**
- GitHub: [@yassermuhammad](https://github.com/yassermuhammad)
- Project: [Timesheet Dashboard](https://github.com/yassermuhammad/serdio-task)

## 🙏 Acknowledgments

- **Angular Team**: For the amazing framework
- **Chart.js**: For powerful data visualization
- **Tailwind CSS**: For the utility-first CSS framework
- **GitHub**: For hosting and CI/CD services

---

**⭐ Star this repository if you find it helpful!**
