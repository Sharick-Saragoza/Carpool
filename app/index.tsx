import { Redirect } from 'expo-router';
import Auth from '@/components/Auth';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/context/useAuth';

export default function Index() {
  const { session, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!session) {
    return <Auth />;
  }

  if (session) {
    return <Redirect href="/(tabs)/explore" />;
  }
}
