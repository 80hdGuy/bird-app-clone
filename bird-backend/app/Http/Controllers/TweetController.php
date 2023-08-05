<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use Illuminate\Http\Request;

class TweetController extends Controller
{
    /**
     * Display a listing of the tweets from followed users.
     */
    public function index(Request $request)
    {
        $followers = $request->user()->follows->pluck('id');

        return Tweet::with('user:id,name,username,avatar')
            ->whereIn('user_id', $followers)
            ->latest('created_at')
            ->paginate(10);
    }

    /**
     * Show all tweets
     */
    public function all()
    {
        return Tweet::with('user:id,name,username,avatar')
        ->latest('created_at')
        ->paginate(10);
    }

    /**
     * Store a newly created tweet in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'body' => 'required',
        ]);

        return Tweet::create([
            'user_id' => $request->user()->id,
            'body' => $request->body,
        ]);
    }

    /**
     * Display the specified tweet.
     */
    public function show(Tweet $tweet)
    {
        return $tweet->load('user:id,name,username,avatar');
    }

    /**
     * Remove the specified tweet from storage.
     */
    public function destroy(Tweet $tweet)
    {
        abort_if($tweet->user_id !== auth()->user()->id, 403);
        return response()->json($tweet->delete(), 200);
    }
}
