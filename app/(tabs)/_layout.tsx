import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#9ca3af',
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#6b7280',
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name='explore'
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='globe' size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='drive'
                options={{
                    title: 'Drive',
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
                    title: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='person' size={28} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}