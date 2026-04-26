"use client";

import {
  forwardRef,
  type RefObject,
  type Ref,
} from "react";
import MessageBubble from "./MessageBubble";
import PaywallCard from "./PaywallCard";
import ChatInput from "./ChatInput";
import Avatar from "./Avatar";
import {
  PALETTE,
  SUGGESTIONS,
  STAMPS,
  CHARACTER_NAME,
} from "@/lib/constants";

type ChatMessage = { role: "user" | "assistant"; content: string };

type Props = {
  messages: ChatMessage[];
  loading: boolean;
  showPaywall: boolean;
  error: string | null;
  onSuggestion: (s: string) => void;
  onShare: () => void;
  input: string;
  onInputChange: (s: string) => void;
  onSend: () => void;
  inputDisabled: boolean;
  paywallActive: boolean;
  inputRef: RefObject<HTMLInputElement>;
  remaining: number;
  promptsAllowed: number;
};

const ChatWindow = forwardRef<HTMLDivElement, Props>(function ChatWindow(
  {
    messages,
    loading,
    showPaywall,
    error,
    onSuggestion,
    onShare,
    input,
    onInputChange,
    onSend,
    inputDisabled,
    paywallActive,
    inputRef,
    remaining,
    promptsAllowed,
  },
  scrollRef: Ref<HTMLDivElement>
) {
  const showSuggestions = messages.length === 0 && !showPaywall;
  const lastAssistantIdx = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant" && messages[i].content.trim())
        return i;
    }
    return -1;
  })();

  return (
    <div className="rough-card chat-panel flex flex-col relative">
      <div className="stripe-accent stripe-left" />
      <div className="stripe-accent stripe-right" />

      {/* 1. Card header — № 001 · TOON RECORDINGS · EST. ALWAYS / SIDE A */}
      <div className="px-8 md:px-12 pt-6 md:pt-7 flex items-center justify-between">
        <span className="stamp" style={{ color: PALETTE.ink, opacity: 0.75 }}>
          № 001 · {STAMPS.label.toUpperCase()}
        </span>
        <span className="stamp" style={{ color: PALETTE.ink, opacity: 0.55 }}>
          SIDE A
        </span>
      </div>
      <div className="ink-divider mx-8 md:mx-12 mt-3 mb-2" />

      {/* 2. Scrollable messages area */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto px-8 md:px-12 py-4"
      >
        {messages.length === 0 && !showPaywall && (
          <div className="msg-in flex items-start gap-4 mb-6">
            <Avatar />
            <div className="flex-1">
              <p
                className="stamp mb-1"
                style={{ color: "rgba(10,10,10,0.7)" }}
              >
                {CHARACTER_NAME}
              </p>
              <p
                className="serif"
                style={{
                  color: PALETTE.ink,
                  fontSize: "1.2rem",
                  lineHeight: 1.4,
                }}
              >
                Eeh, howay pet — come in, come in! What can I dee for ye?
                Ask me anything — life, work, love, code, whatever's on yer
                mind. I've got time and I'm all ears, hinny.
              </p>
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <MessageBubble
            key={i}
            role={m.role}
            content={m.content}
            isLastAssistant={i === lastAssistantIdx}
            onShare={onShare}
          />
        ))}

        {loading && (
          <div className="msg-in flex items-start gap-4 mb-6">
            <Avatar />
            <div className="flex items-center gap-1 pt-3">
              {/* Loading dots: white / gold / white — the three kit colours. */}
              <span
                className="dot"
                style={{ color: PALETTE.primary, fontSize: 24 }}
              >
                ●
              </span>
              <span
                className="dot"
                style={{ color: PALETTE.gold, fontSize: 24 }}
              >
                ●
              </span>
              <span
                className="dot"
                style={{ color: PALETTE.primary, fontSize: 24 }}
              >
                ●
              </span>
            </div>
          </div>
        )}

        {error && (
          <p
            className="serif italic text-center my-4"
            style={{ color: PALETTE.gold, fontSize: "0.95rem" }}
          >
            {error}
          </p>
        )}

        {showPaywall && <PaywallCard />}
      </div>

      {/* 3. Suggestion chips — monochrome, all same black border, hover gold */}
      {showSuggestions && (
        <div className="px-8 md:px-12 pb-2 flex flex-wrap gap-2 justify-center">
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => onSuggestion(s)}
              className="chip serif"
              style={{ fontSize: "0.9rem" }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* 4. Prompt counter */}
      {!showPaywall && promptsAllowed > 0 && (
        <div className="flex justify-end px-8 md:px-12 pb-1">
          <span
            className="stamp"
            style={{
              color:
                remaining <= 1
                  ? PALETTE.gold
                  : "rgba(10,10,10,0.55)",
              fontSize: 9,
            }}
          >
            {remaining > 0
              ? `${remaining} question${remaining === 1 ? "" : "s"} remaining`
              : `${CHARACTER_NAME} needs a refill`}
          </span>
        </div>
      )}

      {/* 5. Input */}
      <div className="ink-divider mx-8 md:mx-12" />
      <div className="px-8 md:px-12 py-3">
        <ChatInput
          ref={inputRef}
          value={input}
          onChange={onInputChange}
          onSend={onSend}
          disabled={inputDisabled}
          paywallActive={paywallActive}
        />
      </div>
    </div>
  );
});

export default ChatWindow;
