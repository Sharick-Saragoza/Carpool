import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { View } from 'react-native';
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
            height: 100,
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
            tabBarIcon: ({ color }) => (
              <Ionicons name="map" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="drive"
          options={{
            title: 'Rijden',
            tabBarIcon: ({ color }) => (
              <Ionicons name="car-sport" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: 'Chat',
            tabBarIcon: ({ color }) => (
              <Ionicons name="chatbubble" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profiel',
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </sessionContext.Provider>
  );
}
