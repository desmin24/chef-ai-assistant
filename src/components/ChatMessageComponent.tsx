
import React from 'react';
import { ChatMessage, MessageRole } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: ChatMessage;
}

export const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  const { role, text } = message;

  const getRoleSpecificStyling = () => {
    switch (role) {
      case MessageRole.USER:
        return 'bg-blue-500 text-white self-end rounded-l-xl rounded-tr-xl';
      case MessageRole.MODEL:
        return 'bg-green-500 text-white self-start rounded-r-xl rounded-tl-xl';
      case MessageRole.SYSTEM:
        return 'bg-gray-200 text-gray-700 self-center text-center italic text-sm rounded-xl';
      default:
        return 'bg-gray-300 text-black self-start rounded-r-xl rounded-tl-xl';
    }
  };

  const getIcon = () => {
    switch (role) {
      case MessageRole.USER:
        return <i className="fas fa-user-circle text-xl mr-2 text-blue-100" aria-hidden="true"></i>;
      case MessageRole.MODEL:
        return <i className="fas fa-robot text-xl mr-2 text-green-100" aria-hidden="true"></i>;
      case MessageRole.SYSTEM:
         return <i className="fas fa-info-circle text-base mr-2 text-gray-500" aria-hidden="true"></i>;
      default:
        return null;
    }
  }

  const baseClasses = "p-3 sm:p-4 max-w-lg md:max-w-xl lg:max-w-2xl shadow-md break-words";
  
  // System messages (initial greeting, non-error)
  if (role === MessageRole.SYSTEM && !text.startsWith("發生錯誤：")) {
     return (
      <div className={`${baseClasses} ${getRoleSpecificStyling()} mx-auto w-full sm:w-auto`} role="log" aria-live="polite">
        <div className="flex items-center justify-center">
         {getIcon()}
         <p className="text-xs sm:text-sm">{text}</p>
        </div>
      </div>
     );
  }
  
  // System error messages
  if (role === MessageRole.SYSTEM && text.startsWith("發生錯誤：")) {
     return (
      <div className={`${baseClasses} bg-red-100 text-red-700 self-center text-center italic text-sm rounded-xl mx-auto w-full sm:w-auto`} role="alert" aria-live="assertive">
        <div className="flex items-center justify-center">
         <i className="fas fa-exclamation-triangle text-base mr-2 text-red-500" aria-hidden="true"></i>
         <p className="text-xs sm:text-sm">{text}</p>
        </div>
      </div>
     );
  }

  // User and Model messages
  return (
    <div className={`flex ${role === MessageRole.USER ? 'justify-end' : 'justify-start'}`} role="log" aria-live="polite">
      <div className={`${baseClasses} ${getRoleSpecificStyling()} flex items-start`}>
        {getIcon()}
        <div className="prose prose-sm sm:prose-base prose-invert max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0.5">
           <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
