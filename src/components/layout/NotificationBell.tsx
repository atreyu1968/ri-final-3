import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useForumConfigStore } from '../../stores/forumConfigStore';
import { useChatConfigStore } from '../../stores/chatConfigStore';
import { useAuthStore } from '../../stores/authStore';

const NotificationBell = () => {
  const { user } = useAuthStore();
  const { config: forumConfig } = useForumConfigStore();
  const { config: chatConfig } = useChatConfigStore();
  const [notifications, setNotifications] = useState<{
    chat: number;
    forum: number;
  }>({ chat: 0, forum: 0 });

  useEffect(() => {
    // Poll for notifications every 30 seconds
    const interval = setInterval(async () => {
      if (chatConfig.enabled) {
        // Fetch chat notifications
        try {
          const response = await fetch(`${chatConfig.settings.url}/api/v1/notifications`, {
            headers: {
              'Authorization': `Bearer ${user?.id}`,
            }
          });
          if (response.ok) {
            const data = await response.json();
            setNotifications(prev => ({ ...prev, chat: data.unread }));
          }
        } catch (error) {
          console.error('Error fetching chat notifications:', error);
        }
      }

      if (forumConfig.enabled) {
        // Fetch forum notifications
        try {
          const response = await fetch(`${forumConfig.settings.url}/notifications.json`, {
            headers: {
              'Api-Key': forumConfig.settings.apiKey,
              'Api-Username': user?.email || '',
            }
          });
          if (response.ok) {
            const data = await response.json();
            setNotifications(prev => ({ ...prev, forum: data.unread }));
          }
        } catch (error) {
          console.error('Error fetching forum notifications:', error);
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [chatConfig, forumConfig, user]);

  const totalNotifications = notifications.chat + notifications.forum;

  return (
    <div className="relative">
      <button className="p-2 text-gray-400 hover:text-gray-200 focus:outline-none">
        <Bell className="w-6 h-6" />
        {totalNotifications > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {totalNotifications}
          </span>
        )}
      </button>
    </div>
  );
};

export default NotificationBell;