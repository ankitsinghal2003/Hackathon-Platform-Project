import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Rules from './pages/Rules';
import Schedule from './pages/Schedule';
import Leaderboard from './pages/Leaderboard';
import NotFound from './pages/NotFound';

// Participant
import Dashboard from './components/participant/Dashboard';
import Profile from './components/participant/Profile';
import TeamManagement from './components/participant/TeamManagement';
import CreateTeam from './components/participant/CreateTeam';
import JoinTeam from './components/participant/JoinTeam';
import ProjectSubmission from './components/participant/ProjectSubmission';

// Judge
import JudgeDashboard from './components/judge/JudgeDashboard';
import ProjectList from './components/judge/ProjectList';
import ProjectDetails from './components/judge/ProjectDetails';

// Admin
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import CategoryManager from './components/admin/CategoryManager';
import SubmissionsList from './components/admin/SubmissionsList';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/leaderboard" element={<Leaderboard />} />

              {/* Participant Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/team"
                element={
                  <ProtectedRoute>
                    <TeamManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/team/create"
                element={
                  <ProtectedRoute>
                    <CreateTeam />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/team/join"
                element={
                  <ProtectedRoute>
                    <JoinTeam />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/submit"
                element={
                  <ProtectedRoute>
                    <ProjectSubmission />
                  </ProtectedRoute>
                }
              />

              {/* Judge Routes */}
              <Route
                path="/judge"
                element={
                  <ProtectedRoute allowedRoles={['judge', 'admin']}>
                    <JudgeDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/judge/projects"
                element={
                  <ProtectedRoute allowedRoles={['judge', 'admin']}>
                    <ProjectList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/judge/projects/:id"
                element={
                  <ProtectedRoute allowedRoles={['judge', 'admin']}>
                    <ProjectDetails />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/categories"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <CategoryManager />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/submissions"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <SubmissionsList />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>

            {/* Toast notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1e293b',
                  color: '#fff',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;