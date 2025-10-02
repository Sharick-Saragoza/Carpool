import { supabase } from '@/utils/supabase';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, ButtonText } from './ui/button';
import { Input, InputField } from './ui/input';

export default function Account({ session }: { session: Session }) {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [website, setWebsite] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        if (session) getProfile();
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');

            const { data, error, status } = await supabase
                .from('profiles')
                .select('username, website, avatar_url')
                .eq('id', session?.user.id)
                .single();
            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUsername(data.username);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile({
        username,
        website,
        avatar_url,
    }: {
        username: string
        website: string
        avatar_url: string
    }) {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');

            const updates = {
                id: session?.user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date(),
            };

            const { error } = await supabase.from('profiles').upsert(updates);

            if (error) {
                throw error;
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <View>
            <View>
                <Input isDisabled={true} >
                    <InputField
                        placeholder='Email'
                        value={session?.user?.email}
                    />
                </Input>
            </View>
            <View>
                <Input >
                    <InputField
                        placeholder='Username'
                        value={username || ''}
                        onChangeText={(text) => setUsername(text)}
                    />
                </Input>
            </View>
            <View>
                <Input>
                    <InputField
                        placeholder='Website'
                        value={website || ''}
                        onChangeText={(text) => setWebsite(text)}
                    />
                </Input>
            </View>

            <View>
                <Button
                    onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
                    isDisabled={loading}>
                    <ButtonText>
                        {loading ? 'Loading ...' : 'Update'}
                    </ButtonText>
                </Button>

            </View>

            <View>
                <Button
                    onPress={() => supabase.auth.signOut()}
                >
                    <ButtonText>
                        Signout
                    </ButtonText>
                </Button>
            </View>
        </View>
    );
}