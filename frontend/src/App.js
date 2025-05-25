import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';
import Menu from './components/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Páginas principales
import Login from './components/Login';
import IndexProduct from './pages/IndexProduct';
import ProductList from './pages/ProductList';
import Comprar from './pages/Comprar';
import Carrito from './pages/Carrito';

// Páginas de información
import Acerca from './pages/Acerca';
import Contacto from './pages/Contacto';

// Sistema de autenticación
import LoginCliente from './pages/LoginCliente';
import LoginAdmin from './pages/LoginAdmin';
import LoginBatidos from './pages/LoginBatidos';
import Registrar from './pages/RegistroCliente';
import Ingresar from './pages/Ingresar';
import IngresarAdmin from './pages/IngresarAdmin';
import IngresarBatidos from './pages/IngresarBatidos';

// Páginas de usuarios
import Cliente from './components/Cliente';
import Admin from './components/Admin';
import PaginaCliente from './pages/PaginaCliente';
import PaginaAdmin from './pages/PaginaAdmin';
import PaginaBatidos from './pages/PaginaBatidos';

// Gestión de cuentas
import MiCuentaCliente from './pages/MiCuentaCliente';
import MiCuentaAdmin from './pages/MiCuentaAdmin';

// Funcionalidades adicionales
import Pedidos from './pages/Pedidos';
import Inventario from './pages/Inventario';
import Notificaciones from './pages/Notificaciones';

function App() {
  const userRole = localStorage.getItem('userRole');
  const location = window.location.pathname;
  const isClienteOrAdmin = location.startsWith('/cliente') || 
                          location.startsWith('/admin'); 
                          

  return (
    <CarritoProvider>
      <Router>
        <Menu />
        <Routes>
          {/* Rutas públicas */}
          <Route index element={<IndexProduct />} />
          <Route path="productos" element={<ProductList />} />
          <Route path="comprar" element={<Comprar />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="/acerca" element={<Acerca />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          
          {/* Sistema de autenticación */}
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/ingresar" element={<Ingresar />} />
          <Route path="/logincliente" element={<LoginCliente />} />
          <Route path="/loginadmin" element={<LoginAdmin />} />
          <Route path="/loginbatidos" element={<LoginBatidos />} />
          <Route path="/ingresaradmin" element={<IngresarAdmin />} />
          <Route path="/ingresarbatidos" element={<IngresarBatidos />} />

          {/* Rutas protegidas por rol */}
          <Route path="/cliente" element={userRole === 'cliente' ? <Cliente /> : <Navigate to="/logincliente" />} />
          <Route path="/admin" element={userRole === 'admin' ? <Admin /> : <Navigate to="/ingresar" />} />
          <Route path="/batidos" element={userRole === 'batidos' ? <PaginaBatidos /> : <Navigate to="/loginbatidos" />} />
          
          {/* Páginas específicas */}
          <Route path="/paginacliente" element={<PaginaCliente />} />
          <Route path="/paginaadmin" element={<PaginaAdmin />} />
          <Route path="/paginabatidos" element={<PaginaBatidos />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/indexproduct" element={<IndexProduct />} />
          
          {/* Gestión de cuentas */}
          <Route path="/micuentaadmin" element={<MiCuentaAdmin />} />
          <Route path="/micuentacliente" element={<MiCuentaCliente />} />
          
          {/* Funcionalidades adicionales */}
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/inventario" element={<Inventario />} />
        </Routes>
      </Router>
    </CarritoProvider>
  );
}

export default App;