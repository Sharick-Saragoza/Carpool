import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { getSupabaseClient } from '@/context/supabase';
import { Avatar, AvatarFallbackText, AvatarImage } from './ui/avatar';
import { Button, ButtonText } from './ui/button';

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
}

export default function UserAvatar({ url, size = 150, onUpload }: Props) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarSize = { height: size, width: size };
  const devMode = process.env.EXPO_PUBLIC_DEV_MODE === 'true';
  const supabase = !devMode ? getSupabaseClient() : null;

  useEffect(() => {
    if (!devMode && url) {
      if (url.startsWith('http')) {
        setAvatarUrl(url);
      } else {
        downloadImage(url);
      }
    } else if (devMode && url) {
      setAvatarUrl(url);
    }
  }, [url, devMode]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase!.storage
        .from('avatars')
        .download(path);
      if (error) throw error;

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message);
      }
    }

    return (
        <View>
            <View className='items-center mb-5'>
            <Avatar size='md' style={avatarSize}>
                <AvatarFallbackText>Avatar</AvatarFallbackText>
                <AvatarImage source={avatarUrl ? { uri: avatarUrl } : undefined} />
            </Avatar>
            </View>

            <View>
                <Button onPress={uploadAvatar} disabled={uploading}>
                    <ButtonText>{uploading ? 'Uploading ...' : 'Upload'}</ButtonText>
                </Button>
            </View>
        </View>
    );
}