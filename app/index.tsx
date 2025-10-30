import { Redirect } from 'expo-router';
import { View } from 'react-native';
import Auth from '@/components/Auth';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/context/useAuth';

export default function Index() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <Spinner />
      </View>
    );
  }

  if (!session) {
    return <Auth />;
  }

  if (session) {
    return <Redirect href='/(tabs)/explore' />;
  }
}
