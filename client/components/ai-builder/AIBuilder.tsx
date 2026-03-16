import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Sparkles, Loader, AlertCircle, CheckCircle, Send, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { AIBuilderSidebar } from "./AIBuilderSidebar";

interface GeneratedLayout {
  title: string;
  subtitle: string;
  sections: Array<{
    id: string;
    type: string;
    title?: string;
    description?: string;
    content?: string;
    items?: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
  }>;
}

interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  isThinking?: boolean;
  builderSections?: BuilderSection[];
}

interface BuilderSection {
  id: string;
  title: string;
  description: string;
  expanded: boolean;
  items: string[];
}

interface AIBuilderProps {
  onBack?: () => void;
  onGenerateComplete?: (layout: GeneratedLayout) => void;
}

const AI_MODELS = [
  "Claude Haiku 4.5",
  "Sonnet 4.5",
  "GPT 5.3",
  "Grok 4.1",
];

const DUMMY_BUILDER_SECTIONS: BuilderSection[] = [
  {
    id: "hero-section",
    title: "Hero Section",
    description: "Eye-catching landing section with headline and CTA",
    expanded: false,
    items: ["Headline", "Subheadline", "Hero Image", "Primary CTA Button", "Secondary Button"],
  },
  {
    id: "features-section",
    title: "Features Section",
    description: "Showcase your product features in an organized grid",
    expanded: false,
    items: ["Feature 1: Fast Performance", "Feature 2: Easy Integration", "Feature 3: 24/7 Support", "Feature 4: Analytics"],
  },
  {
    id: "pricing-section",
    title: "Pricing Section",
    description: "Display pricing tiers and plan comparisons",
    expanded: false,
    items: ["Starter Plan - $29/mo", "Professional Plan - $99/mo", "Enterprise Plan - Custom"],
  },
  {
    id: "testimonials",
    title: "Testimonials",
    description: "Customer success stories and social proof",
    expanded: false,
    items: ["John Doe - CEO", "Jane Smith - Marketing Director", "Mike Johnson - Product Manager"],
  },
  {
    id: "cta-section",
    title: "Call to Action",
    description: "Final conversion push section",
    expanded: false,
    items: ["Headline", "Description", "Email Input", "CTA Button"],
  },
];

export const AIBuilder: React.FC<AIBuilderProps> = ({ onBack, onGenerateComplete }) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedLayout, setGeneratedLayout] = useState<GeneratedLayout | null>(null);
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleGenerateLayout = async () => {
    if (!prompt.trim()) {
      setError("Please enter a description for your landing page");
      return;
    }

    setError(null);
    setIsGenerating(true);
    setShowSidebar(false); // Hide sidebar when user sends a message

    // Add user message to chat
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      type: "user",
      content: prompt.trim(),
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);

    // Add thinking message
    const thinkingMessage: ChatMessage = {
      id: `thinking-${Date.now()}`,
      type: "assistant",
      content: "Thinking",
      timestamp: new Date(),
      isThinking: true,
    };

    setChatMessages((prev) => [...prev, thinkingMessage]);

    try {
      // Simulate delay for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Replace thinking message with builder sections
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        type: "assistant",
        content: "I've designed your landing page with the following sections:",
        timestamp: new Date(),
        builderSections: DUMMY_BUILDER_SECTIONS.map((section) => ({
          ...section,
          expanded: false,
        })),
      };

      setChatMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== thinkingMessage.id);
        return [...filtered, assistantMessage];
      });

      setPrompt(""); // Clear prompt after successful generation
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while generating the layout");
      // Remove thinking message on error
      setChatMessages((prev) => prev.filter((msg) => msg.id !== thinkingMessage.id));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseGenerated = () => {
    if (generatedLayout && onGenerateComplete) {
      onGenerateComplete(generatedLayout);
    }
  };

  const handleNewGeneration = () => {
    setGeneratedLayout(null);
    setError(null);
    setPrompt("");
  };

  if (generatedLayout) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-10 h-10 bg-valasys-orange rounded-xl flex items-center justify-center text-white shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
                Design Generated Successfully
              </h1>
              <p className="text-gray-500 mt-1">Your AI-powered landing page design is ready to use</p>
            </div>
            <Button
              onClick={onBack}
              variant="outline"
              className="rounded-2xl px-6 py-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          </div>

          {/* Generated Design Preview */}
          <Card className="border border-gray-100 shadow-lg rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-valasys-orange/10 to-orange-100/50 border-b">
              <CardTitle className="text-2xl">{generatedLayout.title}</CardTitle>
              <CardDescription className="text-base mt-2">{generatedLayout.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 pb-12 space-y-6">
              {generatedLayout.sections.map((section, index) => (
                <div
                  key={section.id}
                  className="p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:border-valasys-orange/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-valasys-orange text-white font-bold text-sm">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 capitalize">{section.type}</h3>
                  </div>

                  {section.title && <h4 className="font-bold text-gray-900 mb-2">{section.title}</h4>}

                  {section.description && (
                    <p className="text-sm text-gray-600 mb-3">{section.description}</p>
                  )}

                  {section.content && <p className="text-sm text-gray-700 mb-3 italic">{section.content}</p>}

                  {section.items && section.items.length > 0 && (
                    <div className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="p-3 bg-white rounded-lg border border-gray-100">
                          <h5 className="font-semibold text-gray-900">{item.title}</h5>
                          <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center py-8">
            <Button
              onClick={handleNewGeneration}
              variant="outline"
              className="px-8 py-6 rounded-xl font-bold"
            >
              Generate Another
            </Button>
            <Button
              onClick={handleUseGenerated}
              className="px-8 py-6 rounded-xl font-bold bg-valasys-orange hover:bg-valasys-orange/90 text-white shadow-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Use This Design
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Chat View
  if (chatMessages.length > 0) {
    return (
      <>
        <style>{`
          body, html {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          body::-webkit-scrollbar,
          html::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <DashboardLayout>
        <div className="flex h-screen overflow-hidden bg-white" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {/* Left Chat Sidebar */}
          <div className="w-96 border-r border-gray-200 flex flex-col bg-white">
            {/* Header */}
            <div className="border-b border-gray-200 bg-white flex items-center justify-between px-3 py-2">
              <h2 className="text-base font-bold text-gray-900">AI Builder Chat</h2>
              <Button
                onClick={onBack}
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-2 p-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2",
                    message.type === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.type === "assistant" && (
                    <div className="flex-shrink-0 w-6 h-6 bg-valasys-orange rounded-full flex items-center justify-center text-white">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={cn(
                      "max-w-xs rounded-lg p-3 text-sm",
                      message.type === "user"
                        ? "bg-valasys-orange text-white rounded-br-none"
                        : "bg-gray-100 text-gray-900 rounded-bl-none"
                    )}
                  >
                    {message.isThinking ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">Thinking</span>
                        <div className="flex gap-0.5">
                          <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                          <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {message.content && <p className="text-xs">{message.content}</p>}

                        {/* Builder Sections */}
                        {message.builderSections && message.builderSections.length > 0 && (
                          <div className="space-y-2 mt-2">
                            {message.builderSections.map((section) => (
                              <div
                                key={section.id}
                                className="border border-gray-300 rounded-md overflow-hidden bg-white"
                              >
                                <button
                                  onClick={() => toggleSection(section.id)}
                                  className="w-full px-3 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                  <div className="flex items-center gap-2 text-left">
                                    <div className="flex-shrink-0">
                                      {expandedSections.has(section.id) ? (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                      ) : (
                                        <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                                      )}
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-gray-900 text-xs">{section.title}</h4>
                                      <p className="text-xs text-gray-600">{section.description}</p>
                                    </div>
                                  </div>
                                  <ChevronDown
                                    className={cn(
                                      "w-4 h-4 text-gray-400 transition-transform flex-shrink-0",
                                      expandedSections.has(section.id) && "transform rotate-180"
                                    )}
                                  />
                                </button>

                                {/* Expanded Content */}
                                {expandedSections.has(section.id) && (
                                  <div className="px-3 py-2 bg-gray-50 border-t border-gray-300 space-y-1">
                                    {section.items.map((item, index) => (
                                      <div key={index} className="flex items-center gap-1.5 text-xs text-gray-700">
                                        <div className="w-1 h-1 bg-valasys-orange rounded-full" />
                                        {item}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="border-t border-gray-200 bg-white p-2">
              <div className="relative">
                <Textarea
                  placeholder="Ask for refinements..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isGenerating}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-valasys-orange focus:border-valasys-orange text-xs resize-none pr-24"
                />
                <div className="absolute bottom-2 right-2 flex gap-1 items-center">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    disabled={isGenerating}
                    className="px-2 py-1 rounded-md bg-white text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-valasys-orange cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {AI_MODELS.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                  <Button
                    onClick={handleGenerateLayout}
                    disabled={isGenerating || !prompt.trim()}
                    size="icon"
                    className={cn(
                      "w-6 h-6 rounded-md transition-all",
                      isGenerating || !prompt.trim()
                        ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                        : "bg-valasys-orange hover:bg-valasys-orange/90 text-white"
                    )}
                    title="Send"
                  >
                    {isGenerating ? (
                      <Loader className="w-3 h-3 animate-spin" />
                    ) : (
                      <Send className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Loader Section */}
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-gray-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-valasys-orange border-r-valasys-orange animate-spin"></div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900">Building your design</h3>
                <p className="text-sm text-gray-600 mt-1">Generating your landing page...</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
      </>
    );
  }

  // Initial View
  return (
    <DashboardLayout>
      <div className="flex h-screen overflow-hidden">
        {/* Left Sidebar */}
        <AIBuilderSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 overflow-hidden">
          {/* Greeting Section */}
          <div className="text-center mb-12 mt-8">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-valasys-orange rounded-xl flex items-center justify-center text-white shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Afternoon, <span className="text-valasys-orange">Rupali</span>
            </h1>

            {/* Subheading */}
            <p className="text-gray-600 text-lg">How can I help you today?</p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="rounded-xl border-red-200 bg-red-50 mb-6 max-w-2xl">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Input Section */}
          <div className="w-full max-w-2xl">
            <div className="relative">
              <Textarea
                placeholder="Type your landing page description..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isGenerating}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-valasys-orange focus:border-valasys-orange text-base resize-none pr-40"
              />
              {/* Model Dropdown and Send Button at Bottom Right */}
              <div className="absolute bottom-3 right-3 flex gap-2 items-center">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={isGenerating}
                  className="px-3 py-1 rounded-md bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-valasys-orange cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {AI_MODELS.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
                <Button
                  onClick={handleGenerateLayout}
                  disabled={isGenerating || !prompt.trim()}
                  size="icon"
                  className={cn(
                    "w-8 h-8 rounded-md transition-all",
                    isGenerating || !prompt.trim()
                      ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                      : "bg-valasys-orange hover:bg-valasys-orange/90 text-white"
                  )}
                  title="Send"
                >
                  {isGenerating ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
