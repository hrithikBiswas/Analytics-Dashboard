# Analytics Dashboard

A responsive, production-ready Admin Analytics Dashboard built with Next.js, TypeScript, and Tailwind CSS that visualizes business data using interactive charts and reusable UI components.

## 🎯 Features

### Core Dashboard Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Collapsible Sidebar**: Navigation menu that adapts to screen size
- **KPI Cards**: Key performance indicators with growth trends
- **Interactive Charts**: Revenue trends, orders, user distribution, and traffic sources
- **Advanced Filtering**: Date range and user type filters
- **Real-time Data**: Simulated API with loading and error states

### UI/UX Features

- **Dark/Light Theme Toggle**: Switch between themes with smooth transitions
    <!-- - **CSV Export**: Download dashboard data in CSV format -->
- **Loading States**: Skeleton loaders for better perceived performance
- **Error Handling**: Graceful error recovery with retry functionality
- **Micro-interactions**: Hover effects, transitions, and animations
- **Mobile Optimized**: Touch-friendly interface with mobile menu

### Performance Features

- **Component Memoization**: Optimized rendering with React.memo
- **State Management**: Efficient state management with Zustand
- **Code Organization**: Clean, scalable architecture
- **Type Safety**: Full TypeScript implementation

## 🛠 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: Zustand with persist middleware
- **Icons**: Lucide React
- **Data Fetching**: Mock API with simulated delays

## 📁 Project Structure

```
admin-analytics-dashboard/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── stats/        # Statistics endpoint
│   │   │   ├── revenue/      # Revenue data endpoint
│   │   │   ├── orders/       # Orders data endpoint
│   │   │   ├── users/        # Users data endpoint
│   │   │   └── traffic/      # Traffic data endpoint
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Main dashboard page
│   ├── components/
│   │   ├── charts/           # Chart components
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── OrdersChart.tsx
│   │   │   ├── UserDistributionChart.tsx
│   │   │   └── TrafficSourceChart.tsx
│   │   ├── layout/           # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   └── ui/               # UI components
│   │       ├── KPICard.tsx
│   │       └── FilterSection.tsx
│   ├── lib/
│   │   └── api.ts            # API utilities
│   ├── store/
│   │   └── dashboardStore.ts # Zustand store
│   └── types/
│       └── index.ts          # TypeScript types
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/hrithikBiswas/Analytics-Dashboard.git
cd analytics-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📡 API Endpoints

All API endpoints are located in `src/app/api/` and support query parameters for filtering:

### Query Parameters

- `dateRange`: `7days` | `30days` | `12months`
- `userType`: `all` | `free` | `premium` | `enterprise`

### Available Endpoints

#### GET /api/stats

Returns dashboard statistics (KPI data)

```typescript
{
    totalRevenue: number;
    totalUsers: number;
    totalOrders: number;
    conversionRate: number;
    revenueChange: number;
    usersChange: number;
    ordersChange: number;
    conversionChange: number;
}
```

#### GET /api/revenue

Returns revenue data over time

```typescript
Array<{
    month: string;
    revenue: number;
    orders: number;
}>;
```

#### GET /api/orders

Returns orders data

```typescript
Array<{
    month: string;
    orders: number;
}>;
```

#### GET /api/users

Returns user distribution data

```typescript
Array<{
    name: string;
    value: number;
    color: string;
}>;
```

#### GET /api/traffic

Returns traffic source data

```typescript
Array<{
    source: string;
    value: number;
    color: string;
}>;
```

## 🎨 Features Implementation

### Responsive Design

- **Mobile**: Sidebar collapses to overlay, stacked cards
- **Tablet**: Optimized grid layout
- **Desktop**: Full sidebar, multi-column grid

### Theme Toggle

- Persistent dark/light mode
- Smooth transitions
- System preference detection

### State Management (Zustand)

```typescript
// Global state includes:
- filters: { dateRange, userType }
- theme: 'light' | 'dark'
- sidebarCollapsed: boolean
- loading: boolean
- error: string | null
```

### Performance Optimizations

- **Memoized Components**: React.memo for all components
- **Lazy Loading**: Dynamic imports for heavy components
- **Optimized Re-renders**: Zustand selective subscriptions
- **Code Splitting**: Next.js automatic code splitting

### Loading States

- Skeleton loaders for all data components
- Smooth fade-in animations
- Loading indicators

### Error Handling

- Try-catch blocks in API calls
- User-friendly error messages
- Graceful fallbacks

## 🎯 Evaluation Criteria Coverage

### ✅ Code Quality

- Clean, readable code with consistent formatting
- Comprehensive TypeScript types
- Proper error handling
- ESLint configuration

### ✅ Component Reusability

- Modular component architecture
- Reusable KPICard component
- Generic chart components
- Shared UI elements

### ✅ State Management

- Zustand for global state
- Efficient state updates
- Proper data flow

### ✅ Performance

- Memoized components (React.memo)
- Optimized re-renders
- Lazy loading ready
- Proper key usage in lists

### ✅ Responsiveness

- Mobile-first approach
- Breakpoint-based layouts
- Touch-friendly interactions
- Collapsible navigation

### ✅ UX/UI

- Smooth animations and transitions
- Loading states
- Empty states consideration
- Hover effects and micro-interactions
- Consistent design language

## 🎨 Design Decisions

### Color Palette

- **Primary**: Blue tones for main actions
- **Success**: Emerald for positive metrics
- **Danger**: Red for negative metrics
- **Neutral**: Gray scale for backgrounds

### Typography

- **Font**: Inter (system font fallback)
- **Hierarchy**: Clear heading levels
- **Readability**: Optimized line heights and spacing

### Animations

- **Duration**: 200-500ms for smooth transitions
- **Easing**: Ease-out for natural feel
- **Types**: Fade, slide, and scale animations

## 🔄 Data Flow

```
User Action → Filter Change → Zustand Store Update →
API Call → Data Fetch → State Update → Component Re-render
```

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌟 Bonus Features

### Implemented

- ✅ Dark/Light theme toggle
- ✅ Skeleton loading states
- ✅ Smooth animations
- ✅ Responsive notifications dropdown
- ✅ Search bar (UI ready)

### Future Enhancements

- [ ] Role-based dashboard views
- [ ] CSV export functionality
- [ ] Real-time data updates (WebSocket)
- [ ] Advanced analytics filtering
- [ ] User authentication

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Author

**Your Name**

- GitHub: https://github.com/hrithikBiswas
- Email: mr.hrithikbiswas@gmail.com
