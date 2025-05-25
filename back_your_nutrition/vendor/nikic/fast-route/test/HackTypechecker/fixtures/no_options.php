<?php

namespace FastRoute\TestFixtures;

use FastRoute\Dispatcher;
use FastRoute\RouteCollector;

function no_options_simple(): Dispatcher
{
    return \FastRoute\simpleDispatcher(
        function (RouteCollector $collector) {
            // No se agregan rutas aquí
        }
    );
}

function no_options_cached(): Dispatcher
{
    return \FastRoute\cachedDispatcher(
        function (RouteCollector $collector) {
            // No se agregan rutas aquí
        }
    );
}
