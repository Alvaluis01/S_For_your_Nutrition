<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('/clientes', 'ClienteController@index');

$router->get('/clientes/{id}', 'ClienteController@show');
$router->post('/clientes', 'ClienteController@store');
$router->put('/clientes/{id}', 'ClienteController@update');
$router->delete('/clientes/{id}', 'ClienteController@destroy');

$router->get('/personas', 'PersonaController@index');
$router->post('/personas', 'PersonaController@store');
$router->get('/personas/{id}', 'PersonaController@show');
$router->put('/personas/{id}', 'PersonaController@update');
$router->delete('/personas/{id}', 'PersonaController@destroy');

$router->get('/gestorPedidos', 'GestorPedidoController@index');
$router->get('/gestorPedidos/{id}', 'GestorPedidoController@show');
$router->post('/gestorPedidos', 'GestorPedidoController@store');
$router->put('/gestorPedidos/{id}', 'GestorPedidoController@update');
$router->delete('/gestorPedidos/{id}', 'GestorPedidoController@destroy');

$router->get('/cantidadIngredientes', 'CantidadIngredienteController@index');
$router->get('/cantidadIngredientes/{id}', 'CantidadIngredienteController@show');
$router->post('/cantidadIngredientes', 'CantidadIngredienteController@store');
$router->put('/cantidadIngredientes/{id}', 'CantidadIngredienteController@update');
$router->delete('/cantidadIngredientes/{id}', 'CantidadIngredienteController@destroy');

$router->get('/departamentos', 'DepartamentoController@index');
$router->get('/departamentos/{id}', 'DepartamentoController@show');
$router->post('/departamentos', 'DepartamentoController@store');
$router->put('/departamentos/{id}', 'DepartamentoController@update');
$router->delete('/departamentos/{id}', 'DepartamentoController@destroy');

$router->get('/ciudades', 'CiudadController@index');
$router->get('/ciudades/{id}', 'CiudadController@show');
$router->post('/ciudades', 'CiudadController@store');
$router->put('/ciudades/{id}', 'CiudadController@update');
$router->delete('/ciudades/{id}', 'CiudadController@destroy');

$router->get('/ingredientes', 'IngredienteController@index');
$router->get('/ingredientes/{id}', 'IngredienteController@show');
$router->post('/ingredientes', 'IngredienteController@store');
$router->put('/ingredientes/{id}', 'IngredienteController@update');
$router->delete('/ingredientes/{id}', 'IngredienteController@destroy');

$router->get('/inventarios', 'InventarioController@index');
$router->get('/inventarios/{id}', 'InventarioController@show');
$router->post('/inventarios', 'InventarioController@store');
$router->put('/inventarios/{id}', 'InventarioController@update');
$router->delete('/inventarios/{id}', 'InventarioController@destroy');

$router->get('/metodoPagos', 'MetodoPagoController@index');
$router->get('/metodoPagos/{id}', 'MetodoPagoController@show');
$router->post('/metodoPagos', 'MetodoPagoController@store');
$router->put('/metodoPagos/{id}', 'MetodoPagoController@update');
$router->delete('/metodoPagos/{id}', 'MetodoPagoController@destroy');

$router->get('/productos', 'ProductoController@index');
$router->get('/productos/{id}', 'ProductoController@show');
$router->post('/productos', 'ProductoController@store');
$router->put('/productos/{id}', 'ProductoController@update');
$router->delete('/productos/{id}', 'ProductoController@destroy');

$router->get('/repartidores', 'RepartidorController@index');
$router->get('/repartidores/{id}', 'RepartidorController@show');
$router->post('/repartidores', 'RepartidorController@store');
$router->put('/repartidores/{id}', 'RepartidorController@update');
$router->delete('/repartidores/{id}', 'RepartidorController@destroy');

$router->get('/tiposCompra', 'TipoCompraController@index');
$router->get('/tiposCompra/{id}', 'TipoCompraController@show');
$router->post('/tiposCompra', 'TipoCompraController@store');
$router->put('/tiposCompra/{id}', 'TipoCompraController@update');
$router->delete('/tiposCompra/{id}', 'TipoCompraController@destroy');

$router->get('/seccionesMenu', 'SeccionMenuController@index');
$router->get('/seccionesMenu/{id}', 'SeccionMenuController@show');
$router->post('/seccionesMenu', 'SeccionMenuController@store');
$router->put('/seccionesMenu/{id}', 'SeccionMenuController@update');
$router->delete('/seccionesMenu/{id}', 'SeccionMenuController@destroy');

$router->get('/programasFidelizacion', 'ProgramaFidelizacionController@index');
$router->get('/programasFidelizacion/{id}', 'ProgramaFidelizacionController@show');
$router->post('/programasFidelizacion', 'ProgramaFidelizacionController@store');
$router->put('/programasFidelizacion/{id}', 'ProgramaFidelizacionController@update');
$router->delete('/programasFidelizacion/{id}', 'ProgramaFidelizacionController@destroy');

$router->get('/menus', 'MenuController@index');
$router->get('/menus/{id}', 'MenuController@show');
$router->post('/menus', 'MenuController@store');
$router->put('/menus/{id}', 'MenuController@update');
$router->delete('/menus/{id}', 'MenuController@destroy');

$router->get('/pedidos', 'PedidoController@index');
$router->get('/pedidos/{id}', 'PedidoController@show');
$router->post('/pedidos', 'PedidoController@store');
$router->put('/pedidos/{id}', 'PedidoController@update');
$router->delete('/pedidos/{id}', 'PedidoController@destroy');

$router->get('/facturas', 'FacturaController@index');
$router->get('/facturas/{id}', 'FacturaController@show');
$router->post('/facturas', 'FacturaController@store');
$router->put('/facturas/{id}', 'FacturaController@update');
$router->delete('/facturas/{id}', 'FacturaController@destroy');

$router->get('/notificaciones', 'NotificacionController@index');
$router->get('/notificaciones/{id}', 'NotificacionController@show');
$router->post('/notificaciones', 'NotificacionController@store');
$router->put('/notificaciones/{id}', 'NotificacionController@update');
$router->delete('/notificaciones/{id}', 'NotificacionController@destroy');

$router->get('/ingredientesAdicionales', 'IngredienteAdicionalController@index');
$router->get('/ingredientesAdicionales/{id}', 'IngredienteAdicionalController@show');
$router->post('/ingredientesAdicionales', 'IngredienteAdicionalController@store');
$router->put('/ingredientesAdicionales/{id}', 'IngredienteAdicionalController@update');
$router->delete('/ingredientesAdicionales/{id}', 'IngredienteAdicionalController@destroy');
