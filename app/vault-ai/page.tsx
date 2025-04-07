"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Send, Paperclip, Mic, ImageIcon, ThumbsUp, ThumbsDown, Copy, Bot, AlertCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"

type Message = {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function VaultAI() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm Vault AI, your gaming assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        content: input,
        sender: "user",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMessage])
      setInput("")

      // Simulate AI typing
      setIsTyping(true)

      // Simulate AI response after a delay
      setTimeout(() => {
        const aiResponses = [
          "I can help you find information about that game. What specific details are you looking for?",
          "Based on your gaming preferences, you might enjoy trying these indie titles that were released recently.",
          "That's an interesting question about game development. Here's what I know about game engines and their capabilities.",
          "The strategy you're describing could work, but have you considered this alternative approach? It might be more effective.",
        ]

        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: randomResponse,
          sender: "ai",
          timestamp: new Date(),
        }

        setIsTyping(false)
        setMessages((prev) => [...prev, aiMessage])
      }, 1500)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col relative">
        {/* API Integration Notice */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 mx-4 md:mx-6 mt-4 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">API Integration Coming Soon</h3>
              <p className="text-xs text-amber-700 dark:text-amber-400">
                This is a demo interface. Full API integration with advanced AI capabilities will be available soon.
              </p>
            </div>
          </div>
        </div>

        {/* Chat interface container */}
        <div className="flex-1 flex flex-col mx-4 md:mx-6 my-4">
          {/* Chat header */}
          <div className="bg-white dark:bg-zinc-800 rounded-t-lg border border-zinc-200 dark:border-zinc-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="font-medium">Vault AI</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Gaming assistant</p>
              </div>
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Model: Vault AI 1.0</div>
          </div>

          {/* Messages area - scrollable */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-900 border-x border-zinc-200 dark:border-zinc-700"
          >
            <div className="p-4 space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="flex items-start gap-3 max-w-[80%]">
                    {message.sender === "ai" ? (
                      <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                    ) : (
                      <div className="order-2 flex-shrink-0 mt-1">
                        {user?.profileImage ? (
                          <div className="h-8 w-8 rounded-full overflow-hidden">
                            <img
                              src={user.profileImage || "/placeholder.svg"}
                              alt={user.username}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="bg-zinc-200 dark:bg-zinc-700 p-2 rounded-full h-8 w-8 flex items-center justify-center">
                            <User className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                          </div>
                        )}
                      </div>
                    )}

                    <div
                      className={`rounded-lg p-4 ${
                        message.sender === "user"
                          ? "bg-purple-600 text-white order-1"
                          : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{message.sender === "user" ? "You" : "Vault AI"}</span>
                        <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                      </div>
                      <p className="whitespace-pre-wrap">{message.content}</p>

                      {message.sender === "ai" && (
                        <div className="mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-600 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700">
                              <ThumbsUp size={14} />
                            </button>
                            <button className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700">
                              <ThumbsDown size={14} />
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700">
                              <Copy size={14} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="rounded-lg p-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Vault AI</span>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full animate-pulse delay-100"></div>
                          <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full animate-pulse delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input area - fixed at bottom */}
          <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-b-lg p-4">
            <form onSubmit={handleSend} className="flex flex-col gap-4">
              <div className="relative">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about gaming..."
                  className="min-h-[80px] pr-24 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSend(e)
                    }
                  }}
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                  <button
                    type="button"
                    className="p-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    title="Attach file"
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    title="Voice input"
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    title="Upload image"
                  >
                    <ImageIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Press Enter to send, Shift+Enter for new line
                </p>

                <Button type="submit" disabled={!input.trim() || isTyping}>
                  {isTyping ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

