import { supabase } from '@/utils/supabase';
import React, { useState } from 'react';
import { Alert, AppState, View } from 'react-native';
import { Button, ButtonText } from './ui/button';
import { FormControl, FormControlLabel, FormControlLabelText } from './ui/form-control';
import { Input, InputField } from './ui/input';
import { VStack } from './ui/vstack';

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
    const [repeatPassword, setRepeatPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

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

        if (repeatPassword != password) {
            Alert.alert('Passwords do not match');
            return;
        }

        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
            phone: phone,
            options: {
                data:{
                    full_name: fullName,
                    email: email,
                    phone: phone,
                },
            },
        });

        if (error) Alert.alert(error.message);
        if (!session) Alert.alert('Please check your inbox for email verification!');
        setLoading(false);
    }

    if (isSignUp) {
        return (
            <VStack className='m-10'>
                <FormControl
                    size='md'
                    isDisabled={false}
                    isReadOnly={false}
                    isRequired={true}
                >
                    <FormControlLabel>
                        <FormControlLabelText>
                            Email
                        </FormControlLabelText>
                    </FormControlLabel>
                    <Input className='my-1' size='md'>
                        <InputField
                            type='text'
                            placeholder='Email'
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </Input>
                </FormControl>

                <FormControl
                    size='md'
                    isDisabled={false}
                    isReadOnly={false}
                    isRequired={true}
                >
                    <FormControlLabel>
                        <FormControlLabelText>
                            Password
                        </FormControlLabelText>
                    </FormControlLabel>
                    <Input className='my-1' size='md'>
                        <InputField
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </Input>
                </FormControl>

                <FormControl
                    size='md'
                    isDisabled={false}
                    isReadOnly={false}
                    isRequired={true}
                >
                    <FormControlLabel>
                        <FormControlLabelText>
                            Repeat Password
                        </FormControlLabelText>
                    </FormControlLabel>
                    <Input className='my-1' size='md'>
                        <InputField
                            type='password'
                            placeholder='Repeat Password'
                            value={repeatPassword}
                            onChangeText={(text) => setRepeatPassword(text)}
                        />
                    </Input>
                </FormControl>

                <FormControl
                    size='md'
                    isDisabled={false}
                    isReadOnly={false}
                    isRequired={true}
                >
                    <FormControlLabel>
                        <FormControlLabelText>
                            Full name
                        </FormControlLabelText>
                    </FormControlLabel>
                    <Input className='my-1' size='md'>
                        <InputField
                            type='text'
                            placeholder='Full name'
                            value={fullName}
                            onChangeText={(text) => setFullName(text)}
                        />
                    </Input>
                </FormControl>

                <FormControl
                    size='md'
                    isDisabled={false}
                    isReadOnly={false}
                    isRequired={true}
                >
                    <FormControlLabel>
                        <FormControlLabelText>
                            Phone
                        </FormControlLabelText>
                    </FormControlLabel>
                    <Input className='my-1' size='md'>
                        <InputField
                            type='text'
                            placeholder='Phone'
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                        />
                    </Input>
                </FormControl>

                <View className='flex flex-row self-end'>
                    <Button
                        disabled={loading}
                        onPress={() => setIsSignUp(false)}
                        className='ml-4'
                        variant='outline'
                        size='md'
                        action='secondary'>
                        <ButtonText>
                            Back to Sign In
                        </ButtonText>
                    </Button>

                    <Button
                        disabled={loading}
                        onPress={() => signUpWithEmail()}
                        className='ml-4'
                        variant='solid'
                        size='md'
                        action='primary'>
                        <ButtonText>
                            Create Account
                        </ButtonText>
                    </Button>
                </View>
            </VStack>
        );
    }

    return (
        <VStack className='m-10'>
            <FormControl
                size='md'
                isDisabled={false}
                isReadOnly={false}
                isRequired={true}
            >
                <FormControlLabel>
                    <FormControlLabelText>
                        Email
                    </FormControlLabelText>
                </FormControlLabel>
                <Input className='my-1' size='md'>
                    <InputField
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />

                </Input>
            </FormControl>

            <FormControl
                size='md'
                isDisabled={false}
                isReadOnly={false}
                isRequired={true}
            >
                <FormControlLabel>
                    <FormControlLabelText>
                        Password
                    </FormControlLabelText>
                </FormControlLabel>
                <Input className='my-1' size='md'>
                    <InputField
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />

                </Input>
            </FormControl>
            <View className='flex flex-row self-end'>
                <Button
                    disabled={loading}
                    onPress={() => setIsSignUp(true)}

                    className='ml-4'
                    variant='solid'
                    size='md'
                    action='primary'>
                    <ButtonText>
                        Sign up
                    </ButtonText>
                </Button>
                <Button
                    disabled={loading}
                    onPress={() => signInWithEmail()}

                    className='ml-4'
                    variant='solid'
                    size='md'
                    action='primary'>
                    <ButtonText>
                        Sign In
                    </ButtonText>
                </Button>

            </View>
        </VStack>
    );
}