// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
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
import OrderSuccess from './pages/OrderSuccess';
import OrderHistory from './pages/OrderHistory';

function AppContent() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#cdcdcd'}}>
      <Header />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PetShopLanding />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Buyer Routes */}
          <Route path="/buyer" element={<BuyerHome />} />
          <Route path="/buyer/dashboard" element={<BuyerHome />} />
          <Route path="/buyer-home" element={<BuyerHome />} />
          <Route path="/pets" element={<PetCatalog />} />
          <Route path="/pets/:id" element={<PetDetail />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<OrderHistory />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/dashboard" element={<AdminHome />} />
          <Route path="/admin/pets" element={<AdminPets />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<PetShopLanding />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;