import React, { useState, useCallback } from 'react';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Settings,
  PenTool,
  Image as ImageIcon,
  MessageSquare,
  TrendingUp,
  Menu,
  X,
  ChevronDown,
  Plus,
  Loader2,
} from 'lucide-react';
import { ImageLibrary } from './components/ImageLibrary';
import { ScheduleModal } from './components/ScheduleModal';
import { templates, aiTools } from './data';
import { Post } from './types';
import { generatePostContent, improveContent, generateHook } from './lib/openai';

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: PenTool, label: 'Post Generator' },
    { icon: FileText, label: 'My Posts' },
    { icon: Calendar, label: 'Schedule' },
    { icon: ImageIcon, label: 'Media Library' },
    { icon: MessageSquare, label: 'Templates' },
    { icon: TrendingUp, label: 'Analytics' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div
        className={`fixed top-0 left-0 h-full bg-white w-64 shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-600">PostGenius</h1>
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <nav className="p-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg mb-1"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('linkedin-post');
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isImageLibraryOpen, setIsImageLibraryOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const generateContent = async () => {
    setIsGenerating(true);
    const template = templates.find(t => t.id === selectedTemplate);
    
    try {
      const generatedContent = await generatePostContent(
        template?.name || 'LinkedIn post',
        'your industry or topic' // You can add a topic input field to make this dynamic
      );
      setContent(generatedContent);
    } catch (error) {
      console.error('Error:', error);
      // You might want to add error state and display it to the user
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAITool = async (toolId: string) => {
    setIsGenerating(true);
    try {
      const tool = aiTools.find(t => t.id === toolId);
      
      if (tool?.id === 'hook') {
        const hook = await generateHook(content || 'your topic');
        setContent(prev => `${hook}\n\n${prev}`);
      } else if (tool?.id === 'improve') {
        const improvedContent = await improveContent(content);
        setContent(improvedContent);
      }
    } catch (error) {
      console.error('Error:', error);
      // You might want to add error state and display it to the user
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageSelect = (url: string) => {
    setSelectedImages(prev => [...prev, url]);
  };

  const handleSchedule = (date: Date) => {
    const newPost: Post = {
      id: Date.now().toString(),
      content,
      status: 'scheduled',
      createdAt: new Date(),
      scheduledFor: date,
      images: selectedImages,
    };
    setPosts(prev => [newPost, ...prev]);
    setContent('');
    setSelectedImages([]);
  };

  const handleSaveDraft = () => {
    const newPost: Post = {
      id: Date.now().toString(),
      content,
      status: 'draft',
      createdAt: new Date(),
      images: selectedImages,
    };
    setPosts(prev => [newPost, ...prev]);
    setContent('');
    setSelectedImages([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-10">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-4">
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=32&h=32&q=80"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span>John Doe</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Post Generator</h1>
            <p className="text-gray-600">Create engaging posts for your LinkedIn audience</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose Template
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          selectedTemplate === template.id
                            ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                            : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        {template.name}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedImages.length > 0 && (
                  <div className="mb-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {selectedImages.map((url, index) => (
                        <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                          <img
                            src={url}
                            alt={`Selected ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== index))}
                            className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Content
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-64 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Start typing or use AI to generate your post..."
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                    onClick={generateContent}
                    disabled={isGenerating}
                  >
                    {isGenerating && <Loader2 size={16} className="animate-spin" />}
                    <span>Generate with AI</span>
                  </button>
                  <button
                    onClick={() => setIsImageLibraryOpen(true)}
                    className="bg-white text-gray-700 px-6 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Add Media
                  </button>
                  <button
                    onClick={() => setIsScheduleModalOpen(true)}
                    className="bg-white text-gray-700 px-6 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Schedule
                  </button>
                  <button
                    onClick={handleSaveDraft}
                    className="bg-white text-gray-700 px-6 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Save Draft
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">AI Tools</h3>
                <div className="space-y-3">
                  {aiTools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleAITool(tool.id)}
                      disabled={isGenerating}
                      className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 disabled:opacity-50"
                    >
                      {tool.emoji} {tool.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Recent Posts</h3>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Plus size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-600">
                          {post.status === 'scheduled'
                            ? `Scheduled for ${post.scheduledFor?.toLocaleDateString()}`
                            : `${post.status.charAt(0).toUpperCase() + post.status.slice(1)}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm text-gray-800 line-clamp-2">{post.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ImageLibrary
        isOpen={isImageLibraryOpen}
        onClose={() => setIsImageLibraryOpen(false)}
        onSelectImage={handleImageSelect}
      />

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleSchedule}
      />
    </div>
  );
}

export default App;