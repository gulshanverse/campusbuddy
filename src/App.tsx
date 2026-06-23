import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Layouts
import { AppLayout } from './components/layout/AppLayout';

// Auth pages (each manages its own AuthLayout internally)
import { LoginPage } from './features/auth/LoginPage';
import { RegisterPage } from './features/auth/RegisterPage';
import { VerificationPage } from './features/auth/VerificationPage';

// Landing
import { LandingPage } from './features/landing/LandingPage';

// App pages
import { DashboardPage } from './features/dashboard/DashboardPage';
import { StudyBuddyPage } from './features/study-buddy/StudyBuddyPage';
import { HackathonPage } from './features/hackathon/HackathonPage';
import { ClubsPage } from './features/clubs/ClubsPage';
import { ClubDetail } from './features/clubs/ClubDetail';
import { EventsPage } from './features/events/EventsPage';
import { EventDetail } from './features/events/EventDetail';
import { ChatPage } from './features/chat/ChatPage';
import { ProfilePage } from './features/profiles/ProfilePage';
import { EditProfilePage } from './features/profiles/EditProfilePage';
import { AdminDashboard } from './features/admin/AdminDashboard';

// Components
import { ToastProvider } from './components/shared/Toast';

// ─── Route Guards ──────────────────────────────────────────────────────────────

/** Redirect to /login if not authenticated */
const PrivateRoute: React.FC = () => {
  const { user } = useAuthStore();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

/** Redirect to /dashboard if already logged in */
const PublicRoute: React.FC = () => {
  const { user } = useAuthStore();
  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

// ─── Root App ─────────────────────────────────────────────────────────────────

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>

          {/* ── Public landing (no auth) ── */}
          <Route path="/" element={<LandingPage />} />

          {/* ── Auth routes (redirect if logged-in) ── */}
          <Route element={<PublicRoute />}>
            <Route path="/login"    element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* ── Verification (needs auth, but not full layout) ── */}
          <Route element={<PrivateRoute />}>
            <Route path="/verify" element={<VerificationPage />} />
          </Route>

          {/* ── Protected app routes wrapped in sidebar shell ── */}
          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout><Outlet /></AppLayout>}>
              <Route path="/dashboard"    element={<DashboardPage />} />
              <Route path="/study-buddy"  element={<StudyBuddyPage />} />
              <Route path="/hackathon"    element={<HackathonPage />} />
              <Route path="/clubs"        element={<ClubsPage />} />
              <Route path="/clubs/:id"    element={<ClubDetail />} />
              <Route path="/events"       element={<EventsPage />} />
              <Route path="/events/:id"   element={<EventDetail />} />
              <Route path="/chat"         element={<ChatPage />} />
              <Route path="/profile"      element={<ProfilePage />} />
              <Route path="/profile/:id"  element={<ProfilePage />} />
              <Route path="/profile/edit" element={<EditProfilePage />} />
              <Route path="/admin"        element={<AdminDashboard />} />
            </Route>
          </Route>

          {/* ── Catch-all ── */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
