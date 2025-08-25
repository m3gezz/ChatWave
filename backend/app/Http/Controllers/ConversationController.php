<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ConversationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $conversations = Conversation::whereJsonContains('members', [$userId])->orderBy('created_at', 'desc')->get();

        $data = $conversations->map(function ($conversation) use($userId) {
            $members = User::whereIn('id', $conversation->members)->get(['id', 'username', 'email', 'avatar']);

            $members = $members->filter(fn($m) => $m->id !== $userId)->values();

            return [
                'id' => $conversation->id,
                'title' => $conversation->title,
                'group' => $conversation->group,
                'avatar' => $conversation->avatar,
                'members' => $members,
            ];
        });

        return response()->json($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'nullable|string',
            'avatar' => 'nullable|string',
            'members' => 'required|array|min:2',
            'group' => 'required|boolean',
        ]);

        if (!$fields['group']) {
            $existing = Conversation::where('group', false)
                ->whereJsonContains('members', [$fields['members'][0]])
                ->whereJsonContains('members', [$fields['members'][1]])
                ->first();

            if ($existing) {
                return response()->json($existing, 200);
            }
        }

        $fields['id_creator'] = $request->user()->id;

        $data = Conversation::create($fields);

        return response()->json($data, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Conversation $conversation)
    {
        Gate::authorize('update', $conversation);

        $members = User::whereIn('id', $conversation->members)->get(['id', 'username', 'email', 'avatar']);
        $creator = User::where('id', $conversation->id_creator)->get(['id', 'username', 'email', 'avatar']);

        $members = $members->filter(fn($m) => $m->id !== $request->user()->id)->values();

        $data = [
            'id' => $conversation->id,
            'title' => $conversation->title,
            'group' => $conversation->group,
            'avatar' => $conversation->avatar,
            'members' => $members,
            'creator' => $creator,
        ];

        return response()->json($data, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Conversation $conversation)
    {
        Gate::authorize('update', $conversation);

        $fields = $request->validate([
            'title' => 'sometimes|required|string',
            'members' => 'sometimes|required|array|min:1',
        ]);

        $conversation->update($fields);
        return response()->json($conversation, 200);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conversation $conversation)
    {
        Gate::authorize('update', $conversation);

        $conversation->delete();

        return response()->json(['message' => 'Deleted successfully'], 200);
    }
}
