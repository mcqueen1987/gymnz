<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group([
    'middleware' => 'auth:api'
], function () {
    Route::get('coach', 'CoachController@getCoachInfoByUserId');

    Route::get('gym/{gym}/customer', 'GymController@getCustomerList');
    Route::get('gym/{gym}/available', 'GymController@getAvailableTime');

    Route::get('user/{user}/coursebalance', 'OrderController@getCustomerCourseBalance');
    Route::get('user/{user}/orders', 'OrderController@getCustomerOrders');

    Route::resource('org', 'OrganizationController');
    Route::resource('gym', 'GymController');
    Route::resource('gym.coach', 'CoachController');
    Route::resource('gym.order', 'OrderController');

    Route::resource('gym.schedule', 'ScheduleController');
    Route::get('gym/{gym}/schedule/{schedule}/complete', 'ScheduleController@complete');
});
