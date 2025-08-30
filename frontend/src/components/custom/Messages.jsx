import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useMainContext } from "../../contexts/MainContext";
import { Client } from "../../axios/axios";
import Spinner from "../animations/Spinner";
import { FaComment } from "react-icons/fa6";

export default function Messages() {
  const {
    user,
    token,
    conversationId,
    conversationObject,
    messages,
    handleMessages,
  } = useMainContext();
  const [page, setPage] = useState(2);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await Client.get(
        `/api/conversations/${conversationId}/messages`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleMessages(response.data.data);
      setLastPage(response.data.last_page);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessagesHistory = async () => {
    if (page > lastPage) return;

    const container = containerRef.current;
    const oldScrollHeight = container.scrollHeight;
    const oldScrollTop = container.scrollTop;
    setLoadingHistory(true);
    try {
      const response = await Client.get(
        `/api/conversations/${conversationId}/messages?page=${page}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      handleMessages((prev) => [...prev, ...response.data.data]);
      setPage((prev) => prev + 1);

      requestAnimationFrame(() => {
        container.scrollTop =
          container.scrollHeight - oldScrollHeight + oldScrollTop;
      });
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleScroll = () => {
    if (containerRef.current?.scrollTop === 0 && page <= lastPage) {
      fetchMessagesHistory();
    }
  };

  useEffect(() => {
    if (!conversationId) return;
    fetchMessages();
  }, [conversationId]);

  return (
    <main
      onScroll={handleScroll}
      ref={containerRef}
      className="flex flex-col flex-1 py-5 gap-0.5 overflow-y-scroll"
    >
      <div className="text-center mb-4 flex items-center justify-center gap-1">
        <FaComment />
        This conversation was created by
        <strong>
          {conversationObject.creator &&
          conversationObject.creator[0].username === user.username
            ? "You"
            : conversationObject.creator[0].username}
        </strong>
      </div>
      {loadingHistory && <Spinner />}
      {loading ? (
        <div className="h-1/2 flex items-center justify-center text-center w-[90%] mx-auto">
          <Spinner />
        </div>
      ) : messages.length ? (
        [...messages]
          .reverse()
          .map((message) => <Message message={message} key={message.id} />)
      ) : (
        <div className="h-1/2 flex items-center justify-center text-center w-[90%] mx-auto">
          <div>
            Don't Be Shy And Say <strong>HI</strong>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </main>
  );
}
