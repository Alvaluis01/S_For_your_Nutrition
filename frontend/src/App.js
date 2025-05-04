import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Menu from './components/Menu';
import Acerca from './pages/Acerca';
import Contacto from './pages/Contacto';
import Ubicacion from './pages/Ubicacion';
import Login from './components/Login';
import Cliente from './components/Cliente';
import Admin from './components/Admin';
import LoginCliente from './pages/LoginCliente';
import ProductList from './pages/ProductList';
import Comprar from './pages/Comprar';
import Registrar from './pages/RegistroCliente';
import Ingresar from './pages/Ingresar';
import PaginaCliente from './pages/PaginaCliente'; // ✅ IMPORTACIÓN CORRECTA
import PaginaAdmin from './pages/PaginaAdmin';
import Carrito from './pages/Carrito';
import MiCuenta from './pages/MiCuenta';
import { CarritoProvider } from './context/CarritoContext';
import Pedidos from './pages/Pedidos';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Inventario from './pages/Inventario';

import Notificaciones from './pages/Notificaciones';


function App() {
  const userRole = localStorage.getItem('userRole');
  const location = window.location.pathname;
  const isClienteOrAdmin = location.startsWith('/cliente') || location.startsWith('/admin');
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2', // color azul típico de MUI
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });
  
  
return (
  //<ThemeProvider theme={theme}>
    <CarritoProvider>
      <Router>
        {!userRole && !isClienteOrAdmin && <Menu />}
        <Routes>
          {/* Rutas generales */}
          <Route path="/" element={<ProductList />} />
          <Route path="/acerca" element={<Acerca />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/ubicacion" element={<Ubicacion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/ingresar" element={<Ingresar />} />
          <Route path="/logincliente" element={<LoginCliente />} />
          <Route path="/cliente" element={userRole === 'cliente' ? <Cliente /> : <Navigate to="/logincliente" />} />
          <Route path="/admin" element={userRole === 'admin' ? <Admin /> : <Navigate to="/ingresar" />} />
          <Route path="/paginacliente" element={<PaginaCliente />} />
          <Route path="/paginaadmin" element={<PaginaAdmin />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/comprar" element={<Comprar />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/mi-cuenta" element={<MiCuenta />} />
          <Route path="/pedidos" element={<Pedidos />} />

          <Route path="/notificaciones" element={<Notificaciones />} />

          <Route path="/inventario" element={<Inventario />} />
        </Routes>
      </Router>
    </CarritoProvider>
  //</ThemeProvider>
);
}

export default App;
