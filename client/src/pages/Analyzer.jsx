import { useState, useRef, useEffect } from 'react';

function formatAIResponse(text) {
  // Try to extract Score, Reason, Tip
  const match = text.match(/Score[:：]?\s*(\d+\/?10?)\s*\n?Reason[:：]?\s*([\s\S]*?)\nTip[:：]?\s*([\s\S]*)/i);
  if (match) {
    return (
      <div className="text-sm">
        <div className="mb-4"><strong>Score:</strong> {match[1]}</div>
        <div className="mb-4"><strong>Reason:</strong> {match[2].trim()}</div>
        <div><strong>Tip:</strong> {match[3].trim()}</div>
      </div>
    );
  }
  // fallback: just return the text
  return <span className="text-sm">{text}</span>;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your AI Assistant. How can I help you with your finances today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setLoading(true);
    setError(null);
    const userMessage = input;
    setInput('');
    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setMessages(msgs => [...msgs, { sender: 'ai', text: data.response }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { sender: 'ai', text: 'Sorry, there was an error connecting to the advisor.' }]);
      setError('Error connecting to AI backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto mt-20 bg-gray-800 p-8 rounded-xl shadow-md flex flex-col h-[70vh]">
        <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">🤖 AI Assistant</h2>
        <div className="flex-1 overflow-y-auto mb-4 px-2" style={{ scrollbarWidth: 'thin' }}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-3 py-2 rounded-lg max-w-md break-words leading-relaxed border border-gray-600 text-sm ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white self-end'
                  : 'bg-gray-700 text-indigo-200 self-start'
              }`}>
                {msg.sender === 'ai' ? formatAIResponse(msg.text) : msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="mb-3 flex justify-start">
              <div className="px-3 py-2 rounded-lg max-w-md bg-gray-700 text-indigo-200 animate-pulse border border-gray-600 text-sm">
                Thinking...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-indigo-500"
            autoFocus
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-semibold transition-colors"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
        {error && (
          <div className="text-red-400 text-center mt-2">{error}</div>
        )}
      </div>
    </div>
  );
}
