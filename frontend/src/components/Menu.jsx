import { useAuth } from '../context/AuthContext';

function Menu() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <nav>
        <a href="/inicio">Inicio</a>
        <a href="/quienes-somos">Quiénes somos</a>
        <a href="/login">Iniciar sesión</a>
      </nav>
    );
  }

  // Si está logueado como cliente
  if (user.Rol === 'cliente') {
    return (
      <nav>
        <a href="/PaginaCliente">Inicio Cliente</a>
        <a href="/pedidos">Pedidos</a>
        <button onClick={logout}>Cerrar sesión</button>
      </nav>
    );
  }

  // Si está logueado como admin
  if (user.Rol === 'admin') {
    return (
      <nav>
        <a href="/PaginaAdmin">Panel de Administración</a>
        <a href="/productos">Productos</a>
        <button onClick={logout}>Cerrar sesión</button>
      </nav>
    );
  }

  return null;
}

export default Menu;
