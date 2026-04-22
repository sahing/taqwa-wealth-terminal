import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

// Public pages
import PublicLayout from '@/components/brand/PublicLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Opportunities from '@/pages/Opportunities';
import ProjectDetail from '@/pages/ProjectDetail';
import WhyTaqwa from '@/pages/WhyTaqwa';
import Legal from '@/pages/Legal';
import Blog from '@/pages/Blog';
import BlogDetail from '@/pages/BlogDetail';
import TestimonialsPage from '@/pages/TestimonialsPage';
import Contact from '@/pages/Contact';

// Investor
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardOverview from '@/pages/dashboard/Overview';
import MyInvestments from '@/pages/dashboard/Investments';
import Payments from '@/pages/dashboard/Payments';
import Documents from '@/pages/dashboard/Documents';
import KYCPage from '@/pages/dashboard/KYCPage';
import Profile from '@/pages/dashboard/Profile';

// Admin
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import ProjectsAdmin from '@/pages/admin/ProjectsAdmin';
import LeadsAdmin from '@/pages/admin/LeadsAdmin';
import InvestorsAdmin from '@/pages/admin/InvestorsAdmin';
import BlogsAdmin from '@/pages/admin/BlogsAdmin';
import TestimonialsAdmin from '@/pages/admin/TestimonialsAdmin';
import PaymentsAdmin from '@/pages/admin/PaymentsAdmin';
import SettingsAdmin from '@/pages/admin/SettingsAdmin';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-onyx">
        <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') return <UserNotRegisteredError />;
    if (authError.type === 'auth_required') { navigateToLogin(); return null; }
  }

  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/opportunities/:id" element={<ProjectDetail />} />
        <Route path="/why-taqwa" element={<WhyTaqwa />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Investor Dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="investments" element={<MyInvestments />} />
        <Route path="payments" element={<Payments />} />
        <Route path="documents" element={<Documents />} />
        <Route path="kyc" element={<KYCPage />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<ProjectsAdmin />} />
        <Route path="leads" element={<LeadsAdmin />} />
        <Route path="investors" element={<InvestorsAdmin />} />
        <Route path="blogs" element={<BlogsAdmin />} />
        <Route path="testimonials" element={<TestimonialsAdmin />} />
        <Route path="payments" element={<PaymentsAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App