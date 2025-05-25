<?php

namespace FastRoute\TestFixtures;

use FastRoute\Dispatcher;
use FastRoute\RouteParser\Std as RouteParserStd;
use FastRoute\DataGenerator\GroupCountBased as DataGeneratorGroupCountBased;
use FastRoute\Dispatcher\GroupCountBased as DispatcherGroupCountBased;
use FastRoute\RouteCollector;

function all_options_simple(): Dispatcher
{
    return \FastRoute\simpleDispatcher(
        function (RouteCollector $collector) {
            // Puedes agregar rutas aquí si quieres
        },
        [
            'routeParser' => RouteParserStd::class,
            'dataGenerator' => DataGeneratorGroupCountBased::class,
            'dispatcher' => DispatcherGroupCountBased::class,
            'routeCollector' => RouteCollector::class,
        ]
    );
}

function all_options_cached(): Dispatcher
{
    return \FastRoute\cachedDispatcher(
        function (RouteCollector $collector) {
            // Puedes agregar rutas aquí si quieres
        },
        [
            'routeParser' => RouteParserStd::class,
            'dataGenerator' => DataGeneratorGroupCountBased::class,
            'dispatcher' => DispatcherGroupCountBased::class,
            'routeCollector' => RouteCollector::class,
            'cacheFile' => '/dev/null', // o la ruta que quieras para tu cache
            'cacheDisabled' => false,
        ]
    );
}
