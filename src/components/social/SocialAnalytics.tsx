import React from 'react';
import { BarChart2, TrendingUp, Users, MessageSquare, Share2, Eye, ArrowUp, ArrowDown } from 'lucide-react';
import { StatCard } from '../ui/StatCard';
import { SimpleLineChart } from '../ui/charts/SimpleLineChart';

export function SocialAnalytics() {
  // Enhanced analytics data with trends
  const stats = [
    { 
      icon: Users, 
      title: 'Total Followers', 
      value: '2.5K', 
      trend: '+12%',
      isPositive: true,
      color: 'bg-blue-100', 
      textColor: 'text-blue-600' 
    },
    { 
      icon: MessageSquare, 
      title: 'Engagement Rate', 
      value: '34.2%', 
      trend: '+8.5%',
      isPositive: true,
      color: 'bg-purple-100', 
      textColor: 'text-purple-600' 
    },
    { 
      icon: Share2, 
      title: 'Avg. Reach', 
      value: '12.4K', 
      trend: '-2.3%',
      isPositive: false,
      color: 'bg-green-100', 
      textColor: 'text-green-600' 
    },
    { 
      icon: Eye, 
      title: 'Impressions', 
      value: '45.8K', 
      trend: '+15.7%',
      isPositive: true,
      color: 'bg-amber-100', 
      textColor: 'text-amber-600' 
    }
  ];

  // Enhanced chart data with more metrics
  const chartData = [
    { date: 'Mon', followers: 2100, engagement: 720, impressions: 4200 },
    { date: 'Tue', followers: 2200, engagement: 850, impressions: 4500 },
    { date: 'Wed', followers: 2350, engagement: 940, impressions: 4800 },
    { date: 'Thu', followers: 2400, engagement: 780, impressions: 4300 },
    { date: 'Fri', followers: 2450, engagement: 890, impressions: 4600 },
    { date: 'Sat', followers: 2480, engagement: 920, impressions: 4900 },
    { date: 'Sun', followers: 2500, engagement: 856, impressions: 4580 }
  ];

  return (
    <div className="crm-tile p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <BarChart2 className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Social Analytics</h2>
          <p className="text-sm text-gray-600">Performance metrics across platforms</p>
        </div>
      </div>

      {/* Stats Grid - Now in 2x2 layout */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl border border-gray-100 shadow-sm 
              hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.isPositive ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  {stat.trend}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-800">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">
                  {stat.title}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Growth Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-800">Growth Trends</h3>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-green-600">+15.3% Overall Growth</span>
          </div>
        </div>
        
        <div className="h-64">
          <SimpleLineChart
            data={chartData}
            lines={[
              { key: 'followers', color: '#8B5CF6', name: 'Followers' },
              { key: 'engagement', color: '#60A5FA', name: 'Engagement' },
              { key: 'impressions', color: '#F59E0B', name: 'Impressions' }
            ]}
            xAxisKey="date"
          />
        </div>
      </div>
    </div>
  );
}