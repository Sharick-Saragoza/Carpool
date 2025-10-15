import { Redirect, Tabs } from 'expo-router';
import {
  Car,
  CircleUser,
  Map as MapIcon,
  MessageCircle,
} from 'lucide-react-native';
import { View } from 'react-native';
import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { sessionContext } from '@/context/session-context';
import { useAuth } from '@/context/useAuth';

export default function TabLayout() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Spinner />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <sessionContext.Provider value={{ session }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#9ca3af',
            height: 60,
            paddingBottom: 12,
            paddingTop: 12,
          },
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#6b7280',
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Ritten',
            tabBarIcon: ({ color }) => <Icon as={MapIcon} color={color} />,
          }}
        />
        <Tabs.Screen
          name="drive"
          options={{
            title: 'Rijden',
            tabBarIcon: ({ color }) => <Icon as={Car} color={color} />,
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: 'Chat',
            tabBarIcon: ({ color }) => (
              <Icon as={MessageCircle} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profiel',
            tabBarIcon: ({ color }) => <Icon as={CircleUser} color={color} />,
          }}
        />
      </Tabs>
    </sessionContext.Provider>
  );
}
