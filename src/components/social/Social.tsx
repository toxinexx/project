import React from 'react';
import { SocialAccounts } from './SocialAccounts';
import { SocialPostComposer } from './SocialPostComposer';
import { ScheduledPosts } from './ScheduledPosts';
import { SocialAnalytics } from './SocialAnalytics';

export function Social() {
  return (
    <div className="space-y-6 py-6">
      <SocialAccounts />
      <SocialPostComposer />
      
      {/* Posts and Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScheduledPosts />
        <SocialAnalytics />
      </div>
    </div>
  );
}