import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Account from '@/components/Account';
import UserAvatar from '@/components/UserAvatar';
import { showError } from '@/libs/showError';
import { updateRecord } from '@/libs/updateRecord';
import { useState } from 'react';
import { useSession } from '@/context/session-context';
import { Card } from '@/components/ui/card';

export default function ProfileScreen() {
  const [avatarUrl, setAvatarUrl] = useState('');
  const devMode = process.env.EXPO_PUBLIC_DEV_MODE === 'true';
  const session = useSession();
  const userId = session.user.id;

  const handleAvatarUpload = async (url: string) => {
    setAvatarUrl(url);

    if (devMode) {
      console.log('[DEV MODE] Avatar uploaded:', url);
      Alert.alert('Avatar updated! (dev mode)');
      return;
    }

    try {
      await updateRecord({
        session,
        table: 'profiles',
        data: { id: userId, avatar_url: url },
      });
      Alert.alert('Avatar updated!');
    } catch (error) {
      showError(error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView className='flex-1'>
        <Card className='flex-1 bg-gray-400 m-3'>
          <UserAvatar size={125} url={avatarUrl} onUpload={handleAvatarUpload} />
          <Account />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
