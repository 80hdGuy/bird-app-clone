<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserProfileController extends Controller
{
    /**
     * Display the specified user profile.
     */
    public function show(User $user)
    {
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
    }

    /**
     * Display the specified user tweets.
     */
    public function tweets(User $user)
    {
        return $user->tweets()->with('user')->latest()->paginate(10);
    }
}
