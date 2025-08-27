<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($conversationId)
    {
        $conversation = Conversation::findOrFail($conversationId);
        Gate::authorize('update', $conversation);

        $messages = Message::where('conversation_id', $conversationId)
                            ->orderBy('created_at', 'desc')
                            ->paginate(50);

        return response()->json($messages);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'content'         => 'required|string',
            'sender'          => 'required|array',
            'conversation_id' => 'required|exists:conversations,id',
        ]);


        // $conversation = Conversation::findOrFail($fields['conversation_id']);
        // Gate::authorize('update', $conversation);

        $message = Message::create($fields);

        return response()->json($message, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
