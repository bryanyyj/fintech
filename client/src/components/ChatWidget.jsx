import { useState, useRef, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [open, messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { from: 'user', text: input };
    setMessages([...messages, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages(msgs => [...msgs, { from: 'bot', text: data.response }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Sorry, something went wrong.' }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        {!open && (
          <button
            className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-lg w-16 h-16 flex items-center justify-center hover:scale-110 transition-transform focus:outline-none"
            onClick={() => setOpen(true)}
            aria-label="Open chat"
          >
            <MessageCircle size={32} className="text-white" />
          </button>
        )}
        {/* Chat Window */}
        {open && (
          <div className="w-80 h-96 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col animate-pop-in">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-700 to-blue-700 rounded-t-2xl">
              <div className="font-bold text-white">ChatBot</div>
              <button onClick={() => setOpen(false)} className="text-gray-200 hover:text-white">
                <X size={22} />
              </button>
            </div>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-900">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`px-3 py-2 rounded-lg max-w-[70%] text-sm ${msg.from === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-purple-200'}`}>{msg.text}</div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-lg max-w-[70%] text-sm bg-gray-700 text-purple-200 animate-pulse">...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* Input */}
            <form
              className="p-3 border-t border-white/10 bg-gray-800 rounded-b-2xl flex gap-2"
              onSubmit={e => { e.preventDefault(); sendMessage(); }}
            >
              <input
                className="flex-1 rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                autoFocus={open}
                disabled={loading}
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-bold transition"
                disabled={!input.trim() || loading}
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
      <style>{`
        @keyframes pop-in {
          0% { transform: scale(0.7); opacity: 0; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.5s cubic-bezier(0.23, 1.2, 0.32, 1) 1;
        }
      `}</style>
    </>
  );
} 