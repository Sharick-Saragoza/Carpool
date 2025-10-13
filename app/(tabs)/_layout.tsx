import { MaterialCommunityIcons } from '@expo/vector-icons';
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
            height: 60,
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
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="map" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="drive"
          options={{
            title: 'Rijden',
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="car-sports"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: 'Chat',
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="chat" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profiel',
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="account"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </sessionContext.Provider>
  );
}
