import { useState, useRef, useEffect } from 'react';
import mapBg from '../img/good_map.jpg';

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

// Investment locations on the map
const investmentLocations = [
  {
    id: 'stocks',
    name: 'Stock Market District',
    icon: '📈',
    position: { top: '16%', left: '15%' },
    description: 'Ownership shares in publicly traded companies',
    risk: 'High',
    return: 'High',
    timeHorizon: '5+ years',
    details: 'Stocks represent ownership in a company. When you buy a stock, you are purchasing a small piece of that company. Stock prices can be volatile but historically provide higher returns over the long term.',
    color: 'bg-blue-500'
  },
  {
    id: 'bonds',
    name: 'Government Bonds Plaza',
    icon: '📋',
    position: { top: '13%', left: '38%' },
    description: 'Fixed-income securities that pay regular interest',
    risk: 'Low-Medium',
    return: 'Low-Medium',
    timeHorizon: '1-10 years',
    details: 'Bonds are loans you make to companies or governments. They pay regular interest and return your principal at maturity. Generally safer than stocks but with lower potential returns.',
    color: 'bg-green-500'
  },
  {
    id: 'real-estate',
    name: 'Real Estate Valley',
    icon: '🏠',
    position: { top: '10%', left: '80%' },
    description: 'Property investments for rental income or appreciation',
    risk: 'Medium-High',
    return: 'Medium-High',
    timeHorizon: '5+ years',
    details: 'Real estate investing can include rental properties, REITs, or real estate crowdfunding. It provides income through rent and potential appreciation, but requires significant capital and management.',
    color: 'bg-orange-500'
  },
  {
    id: 'etfs',
    name: 'ETF Exchange Center',
    icon: '📊',
    position: { top: '38%', left: '18%' },
    description: 'Exchange-traded funds that track market indices',
    risk: 'Medium',
    return: 'Medium',
    timeHorizon: '3+ years',
    details: 'ETFs are baskets of securities that trade like stocks. They offer diversification and typically have lower fees than mutual funds. Great for beginners and passive investors.',
    color: 'bg-purple-500'
  },
  {
    id: 'mutual-funds',
    name: 'Mutual Funds Tower',
    icon: '🏦',
    position: { top: '38%', left: '62%' },
    description: 'Pooled investment funds managed by professionals',
    risk: 'Medium',
    return: 'Medium',
    timeHorizon: '3+ years',
    details: 'Mutual funds pool money from many investors to buy a diversified portfolio. They are professionally managed and offer instant diversification, but often have higher fees than ETFs.',
    color: 'bg-indigo-500'
  },
  {
    id: 'crypto',
    name: 'Crypto Mining District',
    icon: '₿',
    position: { top: '60%', left: '82%' },
    description: 'Digital currencies and blockchain assets',
    risk: 'Very High',
    return: 'Very High',
    timeHorizon: '1+ years',
    details: 'Cryptocurrencies are digital assets that use blockchain technology. They can offer high returns but are extremely volatile and speculative. Only invest what you can afford to lose.',
    color: 'bg-yellow-500'
  },
  {
    id: 'savings',
    name: 'Savings Harbor',
    icon: '💰',
    position: { top: '68%', left: '28%' },
    description: 'Interest-bearing accounts with higher rates',
    risk: 'Very Low',
    return: 'Low',
    timeHorizon: 'Short-term',
    details: 'High-yield savings accounts offer better interest rates than traditional savings accounts. They are FDIC-insured and perfect for emergency funds or short-term goals.',
    color: 'bg-emerald-500'
  },
  {
    id: 'cds',
    name: 'CD Island',
    icon: '📜',
    position: { top: '65%', left: '60%' },
    description: 'Time deposits with guaranteed returns',
    risk: 'Very Low',
    return: 'Low',
    timeHorizon: '3 months - 5 years',
    details: 'CDs are time deposits that offer guaranteed returns for locking your money away for a set period. They are FDIC-insured and great for conservative investors.',
    color: 'bg-teal-500'
  }
];

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your AI Financial Assistant. Explore the investment map and ask me about any investment option!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
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

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedLocation(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto mt-20">
        <h1 className="text-4xl font-bold text-indigo-400 mb-8 text-center">Investment World Map</h1>
        
        <div className="flex gap-6 h-[70vh]">
          {/* Investment Map - 70% */}
          <div className="w-[70%] bg-gray-800 rounded-xl shadow-md p-6 relative overflow-hidden">
            <h2 className="text-2xl font-bold text-indigo-400 mb-6">Explore Investment Opportunities</h2>
            {/* Map Background with real image, zoomed out */}
            <div
              className="relative w-full h-[60vh] rounded-lg border-2 border-gray-600"
              style={{
                backgroundImage: `url(${mapBg})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              {/* Investment Location Icons */}
              {investmentLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationClick(location)}
                  className={`absolute ${location.color} hover:scale-110 transition-all duration-200 p-3 rounded-full shadow-lg border-2 border-white hover:border-yellow-300 cursor-pointer group`}
                  style={{ top: location.position.top, left: location.position.left }}
                >
                  <span className="text-2xl">{location.icon}</span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {location.name}
                  </div>
                </button>
              ))}
              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-3 rounded-lg text-xs">
                <div className="font-bold mb-2">Legend:</div>
                <div className="flex gap-2">
                  <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded">High Risk</span>
                  <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">Medium Risk</span>
                  <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded">Low Risk</span>
                </div>
              </div>
            </div>

            {/* Popup Modal */}
            {showPopup && selectedLocation && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-6 rounded-xl max-w-md w-full mx-4 border border-gray-600">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{selectedLocation.icon}</span>
                      <h3 className="text-xl font-bold text-indigo-300">{selectedLocation.name}</h3>
                    </div>
                    <button
                      onClick={closePopup}
                      className="text-gray-400 hover:text-white text-2xl"
                    >
                      ×
                    </button>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{selectedLocation.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-red-500/20 p-3 rounded-lg">
                      <div className="text-red-300 font-semibold">Risk Level</div>
                      <div className="text-white">{selectedLocation.risk}</div>
                    </div>
                    <div className="bg-green-500/20 p-3 rounded-lg">
                      <div className="text-green-300 font-semibold">Return Potential</div>
                      <div className="text-white">{selectedLocation.return}</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/20 p-3 rounded-lg mb-4">
                    <div className="text-blue-300 font-semibold">Time Horizon</div>
                    <div className="text-white">{selectedLocation.timeHorizon}</div>
                  </div>
                  
                  <p className="text-sm text-gray-300 leading-relaxed">{selectedLocation.details}</p>
                  
                  <button
                    onClick={closePopup}
                    className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Got it!
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* AI Chatbot - 30% */}
          <div className="w-[30%] bg-gray-800 rounded-xl shadow-md p-6 flex flex-col">
            <h2 className="text-xl font-bold text-indigo-400 mb-4">🤖 AI Assistant</h2>
            
            <div className="flex-1 overflow-y-auto mb-4 px-2" style={{ scrollbarWidth: 'thin' }}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-3 py-2 rounded-lg max-w-full break-words leading-relaxed border border-gray-600 text-xs ${
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
                  <div className="px-3 py-2 rounded-lg max-w-full bg-gray-700 text-indigo-200 animate-pulse border border-gray-600 text-xs">
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
                placeholder="Ask about investments..."
                className="flex-1 p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-indigo-500 text-xs"
                autoFocus
                disabled={loading}
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-semibold transition-colors text-xs"
                disabled={loading}
              >
                {loading ? '...' : 'Send'}
              </button>
            </form>
            
            {error && (
              <div className="text-red-400 text-center mt-2 text-xs">{error}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
