<?php

use App\Models\Tweet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/tweets', function () {
    return Tweet::with('user:id,name,username,avatar')
        ->latest('created_at')
        ->paginate(10);
});

Route::get('/tweets/{tweet}', function (Tweet $tweet) {
    return $tweet->load('user:id,name,username,avatar');
});

Route::post('/tweets', function (Request $request) {
    $request->validate([
        'body' => 'required',
    ]);

    return Tweet::create([
        'user_id' => 1,
        'body' => $request->body,
    ]);
});

Route::get('/users/{user}', function (User $user) {
    return $user->only(
        'id',
        'name',
        'username',
        'avatar',
        'description',
        'location',
        'link',
        'linktext',
        'created_at'
    );
});

Route::get('/users/{user}/tweets', function (User $user) {
    return $user->tweets()->with('user')->latest()->paginate(10);
});

Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'The provided credentials are incorrect.',
        ]);
    }

    $token = $user->createToken($request->device_name)->plainTextToken;

    return response()->json([
        'token' => $token,
        'user' => $user->only('id', 'name', 'username', 'email', 'avatar'),
    ], 201);
});

Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();

    return response()->json('Logged out', 200);
});

Route::post('/register', function (Request $request) {
    sleep(2);
    $request->validate([
        'name' => 'required',
        'email' => 'required|email|unique:users',
        'username' => 'required|min:4|unique:users',
        'password' => 'required|min:6|confirmed',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'username' => $request->username,
        'password' => Hash::make($request->password),
    ]);

    return response()->json($user, 201);
});
