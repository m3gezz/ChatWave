<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Queue\SerializesModels;

class MessageDeleted implements ShouldBroadcastNow
{
    use InteractsWithSockets, SerializesModels;

    public $messageId;
    public $conversationId;

    public function __construct(Message $message)
    {
        // For delete, we usually just need IDs
        $this->messageId = $message->id;
        $this->conversationId = $message->conversation_id;
    }

    public function broadcastOn()
    {
        return new Channel('conversation.' . $this->conversationId);
    }

    public function broadcastAs()
    {
        return 'MessageDeleted';
    }
}
