
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage, MessageRole } from './types';
import { generateRecipe } from './services/geminiService';
import { ChatMessageComponent } from './components/ChatMessageComponent';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [ingredientsInput, setIngredientsInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatHistory([
      {
        id: Date.now().toString(),
        role: MessageRole.SYSTEM,
        text: '你好！我是你的AI料理小幫手。請告訴我你冰箱裡有哪些食材，我來幫你設計一道簡單美味的料理吧！例如：雞蛋、番茄、洋蔥',
        timestamp: Date.now(),
      },
    ]);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!ingredientsInput.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: ingredientsInput.trim(),
      timestamp: Date.now(),
    };
    setChatHistory(prev => [...prev, userMessage]);
    setIngredientsInput('');
    setIsLoading(true);
    setError(null);

    try {
      const recipe = await generateRecipe(userMessage.text);
      const modelMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.MODEL,
        text: recipe,
        timestamp: Date.now(),
      };
      setChatHistory(prev => [...prev, modelMessage]);
    } catch (err) {
      console.error("Error generating recipe:", err);
      const errorMessage = err instanceof Error ? err.message : '無法生成食譜，請稍後再試。';
      setError(errorMessage);
      const systemErrorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.SYSTEM,
        text: `發生錯誤：${errorMessage}`,
        timestamp: Date.now(),
      };
      setChatHistory(prev => [...prev, systemErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [ingredientsInput, isLoading]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-green-200 via-teal-300 to-blue-400 p-2 sm:p-4">
      <header className="mb-4 p-3 sm:p-4 bg-white/80 backdrop-blur-md shadow-lg rounded-xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-700">
          <i className="fas fa-utensils mr-2"></i>清冰箱料理AI小幫手
        </h1>
      </header>

      <main ref={chatContainerRef} className="flex-grow overflow-y-auto mb-4 p-3 sm:p-4 bg-white/70 backdrop-blur-md shadow-xl rounded-xl space-y-3">
        {chatHistory.map((msg) => (
          <ChatMessageComponent key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-center py-2">
            <LoadingSpinner />
          </div>
        )}
      </main>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md text-sm">
          <strong>錯誤：</strong> {error}
        </div>
      )}

      <footer className="p-3 sm:p-4 bg-white/80 backdrop-blur-md shadow-lg rounded-xl">
        <form onSubmit={handleSubmit} className="flex items-start sm:items-center space-x-2">
          <textarea
            value={ingredientsInput}
            onChange={(e) => setIngredientsInput(e.target.value)}
            placeholder="請輸入你擁有的食材，用逗號分隔..."
            rows={2}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none shadow-sm text-sm sm:text-base"
            disabled={isLoading}
            aria-label="食材輸入框"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-3 h-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
            aria-label={isLoading ? "生成中" : "生成食譜"}
          >
            {isLoading ? <LoadingSpinner small /> : <><i className="fas fa-magic mr-0 sm:mr-2"></i><span className="hidden sm:inline">生成食譜</span></>}
          </button>
        </form>
      </footer>
    </div>
  );
};

export default App;
