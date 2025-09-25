# 🏥 BenCare - Patient Management System

A modern, full-stack healthcare patient management system built with Next.js, Prisma, and MySQL. BenCare provides a comprehensive solution for managing patient information, appointments, and healthcare workflows.

## ✨ Features

### 🎯 Core Functionality

- **Patient Registration**: Complete patient onboarding with detailed medical information
- **Appointment Management**: Schedule, track, and manage patient appointments
- **Admin Dashboard**: Comprehensive admin interface for healthcare providers
- **User Management**: Secure user authentication and role-based access
- **Real-time Status Tracking**: Track appointment statuses (pending, scheduled, cancelled)

### 🔧 Technical Features

- **Modern UI/UX**: Built with Tailwind CSS and Radix UI components
- **Type Safety**: Full TypeScript implementation with Prisma ORM
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Form Validation**: Robust form handling with React Hook Form and Zod
- **File Upload**: Secure document and image upload capabilities
- **Error Monitoring**: Integrated Sentry for production error tracking

## 🚀 Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Backend

- **Prisma** - Database ORM and migrations
- **MySQL** - Primary database
- **NextAuth.js** - Authentication
- **Server Actions** - Server-side data operations

### Development & Deployment

- **Vercel** - Hosting and deployment
- **Sentry** - Error monitoring and performance tracking
- **ESLint & Prettier** - Code quality and formatting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MySQL** database (local or cloud)
- **Git**

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ben-care-patient-management.git
cd ben-care-patient-management
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

```bash
# Copy the environment template
cp env.example .env.local

# Edit the environment variables
nano .env.local
```

### 4. Database Configuration

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/healthcare_db"

# Authentication
NEXTAUTH_SECRET="your_nextauth_secret_here"
NEXTAUTH_URL="http://localhost:3000"

# Admin Access
NEXT_PUBLIC_ADMIN_PASSKEY="your_secure_passkey"

# Error Monitoring (Optional)
SENTRY_DSN="https://your-sentry-dsn@sentry.io/project-id"
```

## 📊 Database Schema

### Core Models

#### Users

- Basic user information and authentication
- Links to patients and appointments

#### Patients

- Comprehensive patient profiles
- Medical history and emergency contacts
- Privacy and consent management

#### Appointments

- Appointment scheduling and tracking
- Status management (pending, scheduled, cancelled)
- Physician and patient associations

### Database Relationships

```
User (1) ──→ (Many) Patient
User (1) ──→ (Many) Appointment
Patient (1) ──→ (Many) Appointment
```

## 🎨 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes
│   ├── patients/           # Patient management pages
│   └── page.tsx            # Home page
├── components/             # Reusable UI components
│   ├── forms/              # Form components
│   ├── table/              # Data table components
│   └── ui/                 # Base UI components
├── lib/                    # Utility functions and configurations
│   ├── actions/            # Server actions
│   └── db.ts              # Database connection
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
└── types/                  # TypeScript type definitions
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**

   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

2. **Set Environment Variables**
   - `DATABASE_URL`: Your production database connection
   - `NEXTAUTH_SECRET`: Generate a secure secret
   - `NEXTAUTH_URL`: Your production URL
   - `NEXT_PUBLIC_ADMIN_PASSKEY`: Secure admin passkey

3. **Deploy Database**
   ```bash
   npx prisma migrate deploy
   ```

### Alternative Deployment Options

- **Railway**: See `railway-setup.md`
- **PlanetScale**: See `PLANETSCALE_SETUP.md`
- **PostgreSQL**: See `POSTGRES_SETUP.md`

## 📱 Usage

### For Patients

1. **Registration**: Complete the patient registration form
2. **Appointment Booking**: Schedule appointments with healthcare providers
3. **Status Tracking**: Monitor appointment status and updates

### For Administrators

1. **Access Admin**: Use the admin passkey to access the dashboard
2. **Patient Management**: View and manage patient records
3. **Appointment Oversight**: Track and manage all appointments
4. **Analytics**: Monitor system usage and statistics

## 🔒 Security Features

- **Data Privacy**: HIPAA-compliant data handling
- **Secure Authentication**: NextAuth.js integration
- **Input Validation**: Comprehensive form validation with Zod
- **Error Monitoring**: Production error tracking with Sentry
- **Admin Protection**: Secure admin access with passkey authentication

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Build verification
npm run build
```

## 📈 Performance

- **Server-Side Rendering**: Optimized page loads
- **Database Optimization**: Efficient queries with Prisma
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic bundle optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the GitHub repository
- Check the deployment guides in the `/docs` folder
- Review the troubleshooting section in `DEPLOYMENT_GUIDE.md`

## 🗺️ Roadmap

- [ ] Patient portal with login
- [ ] Email notifications
- [ ] SMS reminders
- [ ] Calendar integration
- [ ] Medical records management
- [ ] Multi-language support
- [ ] Mobile app development

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Database management with [Prisma](https://prisma.io/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

**BenCare** - Modernizing healthcare patient management, one appointment at a time. 🏥✨
