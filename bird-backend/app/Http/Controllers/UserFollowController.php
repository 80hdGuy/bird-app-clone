<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserFollowController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(User $user)
    {
        auth()->user()->follow($user);

        return response()->json('Followed', 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        auth()->user()->unfollow($user);

        return response()->json('Unfollowed', 201);
    }

    /**
     * Display the specified user profile.
     */
    public function isFollowing(User $user)
    {
        return response()->json(auth()->user()->isFollowing($user), 200);
    }
}
