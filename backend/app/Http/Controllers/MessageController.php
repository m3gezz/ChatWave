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
                            ->orderBy('created_at')
                            ->get();

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
            'id_conversation' => 'required|exists:conversations,id',
        ]);


        $conversation = Conversation::findOrFail($fields['id_conversation']);
        Gate::authorize('update', $conversation);

        $message = Message::create([
            'content'         => $fields['content'],
            'sender'          => $fields['sender'],
            'conversation_id' => $fields['id_conversation'],
        ]);

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
