import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import PetShopLanding from './pages/PetShopLanding';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BuyerHome from './pages/BuyerHome';
import AdminHome from './pages/AdminHome';
import AdminPets from './pages/AdminPets';
import AdminUsers from './pages/AdminUsers';
import AdminOrders from './pages/AdminOrders';
import PetCatalog from './pages/PetCatalog';
import PetDetail from './pages/PetDetail';
import ShoppingCart from './pages/ShoppingCart';
import Wishlist from './pages/Wishlist';
import OrderSuccess from './pages/OrderSuccess';
import OrderHistory from './pages/OrderHistory';
import './App.css';

const AuthWrapper = ({ children }) => {
  const [auth, setAuth] = useState({ checking: true, isAuthenticated: false, user: null });
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      setAuth({
        checking: false,
        isAuthenticated: !!token,
        user
      });
    };
    checkAuth();
  }, [location]);

  if (auth.checking) {
    return <LoadingSpinner fullPage />;
  }

  return children(auth);
};

const ProtectedRoute = ({ children, requiredRole }) => (
  <AuthWrapper>
    {(auth) => {
      if (!auth.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
      }
      if (requiredRole && auth.user?.role !== requiredRole) {
        return <Navigate to="/" replace />;
      }
      return children;
    }}
  </AuthWrapper>
);

const PublicRoute = ({ children }) => (
  <AuthWrapper>
    {(auth) => (auth.isAuthenticated ? <Navigate to="/buyer" replace /> : children)}
  </AuthWrapper>
);

function AppContent() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PetShopLanding />} />
          
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          
          <Route path="/signup" element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          } />
          
          {/* Buyer Routes */}
          <Route path="/buyer" element={
            <ProtectedRoute>
              <BuyerHome />
            </ProtectedRoute>
          } />
          
          <Route path="/pets" element={<PetCatalog />} />
          <Route path="/pets/:id" element={<PetDetail />} />
          
          <Route path="/cart" element={
            <ProtectedRoute>
              <ShoppingCart />
            </ProtectedRoute>
          } />
          
          <Route path="/wishlist" element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          } />
          
          <Route path="/checkout/success" element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          } />
          
          <Route path="/orders" element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminHome />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/pets" element={
            <ProtectedRoute requiredRole="admin">
              <AdminPets />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/users" element={
            <ProtectedRoute requiredRole="admin">
              <AdminUsers />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/orders" element={
            <ProtectedRoute requiredRole="admin">
              <AdminOrders />
            </ProtectedRoute>
          } />
          
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}