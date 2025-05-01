import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  // Asegúrate de que BrowserRouter esté importado
import Menu from './components/Menu';
import Main from './pages/ProductList';
import Acerca from './pages/Acerca';
import Contacto from './pages/Contacto';
import Ubicacion from './pages/Ubicacion';
import Login from './components/Login';
import Cliente from './components/Cliente';
import Admin from './components/Admin';
import LoginCliente from './pages/LoginCliente';
import LoginAdmin from './pages/LoginAdmin';
import ProductList from './pages/ProductList';  // Importa ProductList
import Comprar from './pages/Comprar';
import Registrar from './pages/RegistroCliente';
import Ingresar from './pages/Ingresar';


function App() {
  return (
    <Router> {/* Asegúrate de usar BrowserRouter aquí */}
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const userRole = localStorage.getItem('userRole');  // Obtener el rol desde localStorage
  const location = window.location.pathname;  // Obtener la ruta actual

  const isClienteOrAdmin = location.startsWith('/cliente') || location.startsWith('/admin');

  return (
    <>
      {/* Solo muestra el Menu si NO está autenticado */}
      {!userRole && !isClienteOrAdmin && <Menu />}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/ubicacion" element={<Ubicacion />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productos" element={<ProductList />} /> 

        {/* Rutas para cliente y admin */}
        <Route path="/cliente" element={userRole === 'cliente' ? <Cliente /> : <Navigate to="/logincliente" />} />
        <Route path="/admin" element={userRole === 'admin' ? <Admin /> : <Navigate to="/loginadmin" />} />
        <Route path="/logincliente" element={<LoginCliente />} />
        <Route path="/loginadmin" element={<LoginAdmin />} />
        <Route path="/comprar" element={<Comprar />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/ingresar" element={<Ingresar />} />
        
      </Routes>
    </>
  );
}

export default App;
