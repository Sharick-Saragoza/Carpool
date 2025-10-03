import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
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
                name='explore'
                options={{
                    title: 'Ritten',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='map' size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='drive'
                options={{
                    title: 'Rijden',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='car-sport' size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='chat'
                options={{
                    title: 'Chat',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='chatbubble' size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profiel',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='person' size={28} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}