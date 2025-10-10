import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Auth from '@/components/Auth';
import { useAuth } from '@/context/useAuth';

export default function Index() {
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
    return <Auth />;
  }

  if (session) {
    return <Redirect href="/(tabs)/explore" />;
  }
}
