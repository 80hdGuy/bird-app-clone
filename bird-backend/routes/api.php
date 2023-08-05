<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TweetController;
use App\Http\Controllers\UserFollowController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/tweets', [TweetController::class,'index'])->name('tweet.index');
    Route::get('/tweets_all', [TweetController::class, 'all'])->name('tweet.all');
    Route::get('/tweets/{tweet}', [TweetController::class, 'show'])->name('tweet.show');
    Route::post('/tweets', [TweetController::class, 'store'])->name('tweet.store');
    Route::delete('/tweets/{tweet}', [TweetController::class, 'destroy'])->name('tweet.delete');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/follow/{user}', [UserFollowController::class, 'store'])->name('user.follow');
    Route::post('/unfollow/{user}', [UserFollowController::class, 'destroy'])->name('user.unfollow');
    Route::get('/is_following/{user}', [UserFollowController::class, 'isFollowing'])->name('user.isFollowing');
});

Route::post('/users/{user}', [UserProfileController::class, 'show'])->name('user.profile.show');

Route::get('/users/{user}/tweets', [UserController::class, 'tweets'])->name('user.profile.tweets');

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'destroy'])->name('logout');

Route::post('/register', [AuthController::class, 'store'])->name('register');
