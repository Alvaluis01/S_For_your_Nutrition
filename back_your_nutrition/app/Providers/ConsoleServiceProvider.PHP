<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ConsoleServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton('Illuminate\Contracts\Console\Kernel', 'App\Console\Kernel');
        $this->app->singleton('Illuminate\Contracts\Debug\ExceptionHandler', 'App\Exceptions\Handler');
    }
}

