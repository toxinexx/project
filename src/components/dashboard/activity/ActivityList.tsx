import React from 'react';
import { ActivityListItem } from './ActivityListItem';
import { Activity } from '../../../types/activity';

interface ActivityListProps {
  activities: Activity[];
}

export function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="divide-y max-h-[500px] overflow-y-auto">
      {activities.length > 0 ? (
        activities.map((activity) => (
          <ActivityListItem key={activity.id} activity={activity} />
        ))
      ) : (
        <div className="p-6 text-center text-gray-500">
          No activity found for the selected filter
        </div>
      )}
    </div>
  );
}