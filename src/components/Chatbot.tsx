import React, { useState, useRef, useEffect, useMemo } from "react";
import { MessageCircle, X, Send, Loader2, Calendar, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CALENDLY_URL } from "@/components/CalendlyEmbed";
import { TrackedExternalLink } from "@/components/TrackedExternalLink";
import { setChatOpen } from "@/lib/chatOpenStore";

// Retell voice agent "Sam". Answers questions and takes details; does NOT book.
const VOICE_AGENT_DISPLAY = "(289) 513-5284";
const VOICE_AGENT_TEL = "+12895135284";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// Helper to render URLs as clickable links
const renderMessageContent = (content: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = content.split(urlRegex);
  
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-80 transition-opacity"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

// Generate a unique session ID
const generateSessionId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/website-chat`;

export const Chatbot = () => {
  const [isOpen, setIsOpenState] = useState(false);

  // Mirror open state out so StickyBookButton can get out of this corner.
  const setIsOpen = (open: boolean) => {
    setIsOpenState(open);
    setChatOpen(open);
  };
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey, I'm here to answer anything about Saltarelli Web Studio — websites, AI agents, automations, pricing. " +
        "Ask away, or book a Free Demo and Adam will walk you through it in 15 minutes.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Generate session ID once when component mounts
  const sessionId = useMemo(() => generateSessionId(), []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const streamChat = async (userMessage: string) => {
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: newMessages,
          session_id: sessionId,
          source_url: window.location.origin
        }),
      });

      if (!resp.ok || !resp.body) {
        throw new Error("Failed to start stream");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantContent = "";
      let streamDone = false;

      // Add initial assistant message
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: assistantContent };
                return updated;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            `Sorry, I'm having trouble connecting right now. You can book a Free Demo directly: ${CALENDLY_URL}` +
            ` — or talk to Sam, our AI assistant, at ${VOICE_AGENT_DISPLAY}.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput("");
    streamChat(userMessage);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent shadow-glow flex items-center justify-center text-white"
            aria-label="Open chat"
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-120px)] rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-border/50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-white text-sm">Chat with us</h3>
                  <p className="text-white/70 text-xs">Ask about our services</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X size={18} className="text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/95 backdrop-blur-xl">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                      msg.role === "user"
                        ? "bg-gradient-to-r from-primary to-accent text-white rounded-br-md"
                        : "bg-card/80 text-foreground border border-border/50 rounded-bl-md"
                    )}
                  >
                    {msg.content ? (
                      renderMessageContent(msg.content)
                    ) : (
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 size={14} className="animate-spin" />
                        Thinking...
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies — only while the conversation is still just the greeting,
                so the visitor has somewhere to go without thinking of a question. */}
            {messages.length === 1 && (
              <div className="flex gap-2 px-3 pb-1 bg-background/95 backdrop-blur-xl">
                <TrackedExternalLink
                  href={CALENDLY_URL}
                  trackingLabel="chat_book_demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/20"
                >
                  <Calendar size={13} />
                  Book a free demo
                </TrackedExternalLink>
                <TrackedExternalLink
                  href={`tel:${VOICE_AGENT_TEL}`}
                  trackingLabel="chat_call_sam"
                  className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-card"
                >
                  <Phone size={13} />
                  Talk to Sam by phone
                </TrackedExternalLink>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 bg-card/80 backdrop-blur-xl border-t border-border/50">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  disabled={isLoading}
                  className="flex-1 bg-background/50 border border-border/50 rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="rounded-full w-10 h-10 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
