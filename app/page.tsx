"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Send, MessageSquare, Sparkles, Users, LogOut } from "lucide-react";
import ThreeBackground from "../components/three-background";

interface Message {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isJoined) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 2000);
      return () => clearInterval(interval);
    }
  }, [isJoined]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages");
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsJoined(true);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          text: newMessage.trim(),
        }),
      });

      if (response.ok) {
        setNewMessage("");
        await fetchMessages();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  if (!isJoined) {
    return (
      <>
        <ThreeBackground />
        <div className="min-h-screen flex items-center justify-center p-4 relative">

          <div className="relative w-full max-w-md">
            {/* Floating animation wrapper */}
            <div className="animate-float">
              <Card className="backdrop-blur-2xl bg-slate-900/80 border-slate-700/50 shadow-2xl">
                <CardHeader className="text-center space-y-6 pb-8">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-50 animate-pulse" />
                      <div className="relative bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-full">
                        <Sparkles className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-4xl font-bold text-white">
                      Global Chat
                    </CardTitle>
                    <p className="text-slate-300 text-sm">
                      Join the conversation with people around the world
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleJoin} className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="text-lg h-12 backdrop-blur-xl bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:bg-slate-800/70 focus:border-blue-500/50 transition-all"
                        maxLength={20}
                        autoFocus
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 border-0 shadow-lg shadow-blue-500/50 transition-all duration-300 hover:scale-[1.02] text-white font-semibold"
                      size="lg"
                      disabled={!username.trim()}
                    >
                      <Users className="mr-2 h-5 w-5" />
                      Join Chat
                    </Button>
                  </form>

                  <div className="pt-4 flex items-center justify-center gap-2 text-slate-400 text-xs">
                    <Users className="h-3 w-3" />
                    <span>Connect with everyone instantly</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ThreeBackground />
      <div className="min-h-screen p-4 relative">

        <div className="relative max-w-5xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
          <Card className="flex-1 flex flex-col backdrop-blur-2xl bg-slate-900/80 border-slate-700/50 shadow-2xl overflow-hidden">
            {/* Header */}
            <CardHeader className="border-b border-slate-700/50 bg-slate-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-md opacity-50 animate-pulse" />
                    <div className="relative bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-full">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-white">
                      Global Chat
                    </CardTitle>
                    <p className="text-sm text-slate-300 mt-1 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-white font-medium">{username}</span>
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsJoined(false);
                    setMessages([]);
                  }}
                  className="backdrop-blur-xl bg-slate-800/50 border-slate-600/50 text-white hover:bg-slate-700/70 hover:scale-105 transition-all duration-300"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Leave
                </Button>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-6 bg-slate-900/40" ref={scrollRef}>
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4">
                      <MessageSquare className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="text-slate-300 text-lg">No messages yet</p>
                    <p className="text-slate-400 text-sm mt-1">Be the first to say hello!</p>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 animate-slide-in ${
                        message.username === username ? "flex-row-reverse" : ""
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <Avatar className={`${getAvatarColor(message.username)} ring-2 ring-slate-700 shadow-lg`}>
                        <AvatarFallback className="text-white font-bold">
                          {getInitials(message.username)}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`flex flex-col max-w-md ${
                          message.username === username ? "items-end" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5 px-1">
                          <span className={`text-sm font-semibold ${
                            message.username === username ? "text-blue-400" : "text-cyan-400"
                          }`}>
                            {message.username}
                          </span>
                          <span className="text-xs text-slate-400">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div
                          className={`rounded-2xl px-4 py-3 break-words transition-all duration-300 hover:scale-[1.02] ${
                            message.username === username
                              ? "bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                              : "bg-slate-800/80 text-white border border-slate-600/50 shadow-lg"
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <CardContent className="border-t border-slate-700/50 pt-4 bg-slate-800/50">
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={isLoading}
                  maxLength={500}
                  autoFocus
                  className="flex-1 h-12 backdrop-blur-xl bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:bg-slate-700/70 focus:border-blue-500/50 transition-all"
                />
                <Button
                  type="submit"
                  disabled={!newMessage.trim() || isLoading}
                  className="h-12 w-12 p-0 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 shadow-lg shadow-blue-500/50 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
