import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { sessionContext } from '@/context/session-context';
import { useAuth } from '@/context/useAuth';

export default function TabLayout() {
  const { session, loading } = useAuth();
  const theme = useTheme();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={theme.colors.primary} />
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
            backgroundColor: theme.colors.surface,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
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
