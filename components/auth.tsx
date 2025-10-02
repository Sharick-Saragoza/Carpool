import { supabase } from '@/utils/supabase';
import React, { useState } from 'react';
import { Alert, AppState, View } from 'react-native';
import { Button, ButtonText } from './ui/button';
import { Input, InputField } from './ui/input';

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
});

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    async function signUpWithEmail() {
        setLoading(true);

        if(password.length < 6) {
            Alert.alert('Password should be at least 6 characters.');
            return;
        }

        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        console.log(error);

        if (error) Alert.alert(error.message);
        if (!session) Alert.alert('Please check your inbox for email verification!');
        setLoading(false);
    }

    return (
        <View>
            <View>
                <Input>
                    <InputField
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder='email@address.com'
                        autoCapitalize={'none'}
                    />
                </Input>

            </View>
            <View>
                <Input>
                    <InputField
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        placeholder='Password'
                        autoCapitalize={'none'}
                    />
                </Input>
            </View>
            <View>
                <Button
                    disabled={loading}
                    onPress={() => signInWithEmail()}
                >
                    <ButtonText>
                        Sign in
                    </ButtonText>
                </Button>
            </View>
            <View>
                <Button
                    disabled={loading}
                    onPress={() => signUpWithEmail()}

                    variant='solid'
                    size='md'
                    action='primary'>
                    <ButtonText>
                        Sign Up
                    </ButtonText>
                </Button>
            </View>
        </View>
    );
}