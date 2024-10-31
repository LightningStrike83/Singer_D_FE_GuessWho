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

$router->get("/characters/all", "CharacterController@getAll");
$router->get("/characters/anna", "CharacterController@getAnna");
$router->post("/guess-who/add", "GuessWhoGameController@save");
$router->get("/characters/{game}", "CharacterController@getOne");
$router->get("/guess-who/{id}", "GuessWhoGameController@getOne");