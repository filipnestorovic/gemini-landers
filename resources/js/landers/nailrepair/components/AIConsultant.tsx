
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Camera, Sparkles, Loader2, User, Bot } from 'lucide-react';
import type { ChatMessage } from "../types";
import { ChatRole } from "../types";
import { sendMessageToGemini } from '../services/geminiService';

interface AIConsultantProps {
    systemInstruction: string;
    initialMessage: string;
    isFooterVisible?: boolean;
}

export const AIConsultant: React.FC<AIConsultantProps> = ({ systemInstruction, initialMessage, isFooterVisible = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [attachedImage, setAttachedImage] = useState<string | null>(null);

    // Set initial message on mount
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{ id: '1', role: ChatRole.MODEL, text: initialMessage }]);
        }
    }, [initialMessage]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if ((!inputText.trim() && !attachedImage) || isTyping) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: ChatRole.USER,
            text: inputText,
            image: attachedImage || undefined
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setAttachedImage(null);
        setIsTyping(true);

        try {
            const responseText = await sendMessageToGemini(messages, inputText, systemInstruction, attachedImage || undefined);

            const aiMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: ChatRole.MODEL,
                text: responseText
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsTyping(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAttachedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Dynamic positioning class:
    // - On mobile (default): if footer visible -> move up (bottom-24), else standard (bottom-6)
    // - On desktop (sm): always standard (bottom-6) because sticky footer is hidden
    const positionClass = isFooterVisible ? 'bottom-24 sm:bottom-6' : 'bottom-6';

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className={`fixed right-6 z-40 bg-brand-600 hover:bg-brand-700 text-white rounded-full p-4 shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 group ring-4 ring-white/30 ${positionClass}`}
                >
                    <Sparkles className="w-6 h-6 animate-pulse" />
                    <span className="font-medium hidden group-hover:block pr-2">Medeiva Savetnik</span>
                </button>
            )}

            {isOpen && (
                <div className={`fixed right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl flex flex-col border border-brand-100 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 ${positionClass}`}>
                    <div className="bg-brand-700 p-4 flex justify-between items-center text-white shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Medeiva Ekspert</h3>
                                <p className="text-xs text-brand-100 opacity-90">AI Podrška</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-3 ${msg.role === ChatRole.USER ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                                    msg.role === ChatRole.USER ? 'bg-gray-300' : 'bg-brand-100'
                                }`}>
                                    {msg.role === ChatRole.USER ? <User className="w-5 h-5 text-gray-600" /> : <Sparkles className="w-5 h-5 text-brand-600" />}
                                </div>

                                <div
                                    className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                                        msg.role === ChatRole.USER
                                            ? 'bg-brand-600 text-white rounded-tr-none'
                                            : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                    }`}
                                >
                                    {msg.image && (
                                        <div className="mb-2 rounded-lg overflow-hidden border border-white/20">
                                            <img src={msg.image} alt="Uploaded" className="w-full h-auto object-cover" />
                                        </div>
                                    )}
                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-100 flex-shrink-0 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-brand-600" />
                                </div>
                                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1">
                                    <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 bg-white border-t border-gray-100">
                        {attachedImage && (
                            <div className="flex items-center gap-2 mb-3 p-2 bg-brand-50 rounded-lg border border-brand-100 animate-in fade-in slide-in-from-bottom-2">
                                <img src={attachedImage} alt="Preview" className="h-12 w-12 object-cover rounded-md" />
                                <div className="flex-1 overflow-hidden">
                                    <span className="text-xs font-semibold text-brand-800 block">Slika spremna za slanje</span>
                                    <span className="text-xs text-brand-500 truncate block">Klikni na strelicu da pošalješ</span>
                                </div>
                                <button onClick={() => setAttachedImage(null)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        )}

                        <div className="flex gap-2 items-center">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="p-3 bg-gray-100 rounded-full text-gray-500 hover:text-brand-600 hover:bg-brand-50 transition-all"
                                title="Pošalji sliku"
                            >
                                <Camera className="w-5 h-5" />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />

                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Pitajte nas bilo šta..."
                                    className="w-full bg-gray-50 border-gray-200 focus:bg-white focus:border-brand-500 focus:ring-brand-500 rounded-full px-5 py-3 text-sm pr-12 transition-all outline-none border"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={(!inputText && !attachedImage) || isTyping}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-brand-600 text-white rounded-full hover:bg-brand-700 disabled:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
                                >
                                    {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
