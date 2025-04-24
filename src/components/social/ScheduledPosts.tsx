import React from 'react';
import { Calendar, Clock, Facebook, Instagram, MessageCircle, Send, Edit2, Trash2 } from 'lucide-react';
import { ThreeDButton } from '../ui/3DButton';

interface ScheduledPost {
  id: string;
  content: string;
  scheduledFor: string;
  platforms: string[];
  image?: string;
  status: 'scheduled' | 'published' | 'failed';
  stats?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export function ScheduledPosts() {
  // Sample scheduled posts
  const posts: ScheduledPost[] = [
    {
      id: '1',
      content: 'Exciting news! Join us for our upcoming webinar on business growth strategies. Limited spots available!',
      scheduledFor: '2025-04-15T14:00:00',
      platforms: ['facebook', 'instagram'],
      status: 'scheduled'
    },
    {
      id: '2',
      content: 'Check out our latest blog post on industry trends and insights.',
      scheduledFor: '2025-04-14T10:00:00',
      platforms: ['facebook'],
      status: 'published',
      stats: {
        likes: 45,
        comments: 12,
        shares: 8
      }
    },
    {
      id: '3',
      content: 'Special offer for our social media followers! Use code SOCIAL20 for 20% off.',
      scheduledFor: '2025-04-13T15:30:00',
      platforms: ['instagram', 'facebook'],
      status: 'published',
      stats: {
        likes: 89,
        comments: 23,
        shares: 15
      }
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="w-4 h-4 text-[#1877F2]" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-[#DD2A7B]" />;
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4 text-[#25D366]" />;
      default:
        return <Send className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: ScheduledPost['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="crm-tile">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Scheduled Posts</h2>
        <p className="text-sm text-gray-600 mt-1">Manage your upcoming and published posts</p>
      </div>

      <div className="divide-y">
        {posts.map((post) => (
          <div key={post.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {post.platforms.map((platform) => (
                    <span key={platform} className="p-1 bg-gray-100 rounded">
                      {getPlatformIcon(platform)}
                    </span>
                  ))}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </div>

                <p className="text-gray-800">{post.content}</p>

                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.scheduledFor).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(post.scheduledFor).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {post.stats && (
                  <div className="mt-3 flex items-center gap-6">
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">{post.stats.likes}</span>
                      <span className="text-gray-500"> likes</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">{post.stats.comments}</span>
                      <span className="text-gray-500"> comments</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">{post.stats.shares}</span>
                      <span className="text-gray-500"> shares</span>
                    </div>
                  </div>
                )}
              </div>

              {post.status === 'scheduled' && (
                <div className="flex items-center gap-2 ml-4">
                  <ThreeDButton
                    variant="secondary"
                    size="sm"
                    icon={Edit2}
                    isCircle
                    title="Edit post"
                  />
                  <ThreeDButton
                    variant="danger"
                    size="sm"
                    icon={Trash2}
                    isCircle
                    title="Delete post"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}