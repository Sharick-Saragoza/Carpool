import React, { useEffect, useState } from 'react';
import { Alert, AppState, View } from 'react-native';
import { getSupabaseClient } from '@/context/supabase';
import { Button, ButtonSpinner, ButtonText } from './ui/button';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from './ui/form-control';
import { Input, InputField } from './ui/input';
import { VStack } from './ui/vstack';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const devMode = process.env.EXPO_PUBLIC_DEV_MODE === 'true';

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      const supabase = getSupabaseClient();
      if (!supabase) return;

      if (state === 'active') {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    });

    return () => subscription.remove();
  }, []);

  async function signInWithEmail() {
    if (devMode) {
      console.log('[DEV MODE] Sign In skipped', { email, password });
      Alert.alert('Signed in (dev mode)');
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) return;

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    if (password.length < 6) {
      Alert.alert('Password should be at least 6 characters.');
      return;
    }

    if (repeatPassword !== password) {
      Alert.alert('Passwords do not match');
      return;
    }

    if (devMode) {
      console.log('[DEV MODE] Sign Up skipped', {
        email,
        password,
        fullName,
        phone,
      });
      Alert.alert('Account created (dev mode)');
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) return;

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      phone,
      options: {
        data: { full_name: fullName, email, phone },
      },
    });

    if (error) Alert.alert(error.message);
    if (!data.session)
      Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <VStack className='m-10'>
      <FormControl
        size='md'
        isDisabled={loading}
        isReadOnly={loading}
        isRequired
      >
        <FormControlLabel>
          <FormControlLabelText>Email</FormControlLabelText>
        </FormControlLabel>
        <Input className='my-1' size='md'>
          <InputField
            type='text'
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
          />
        </Input>
      </FormControl>

      <FormControl
        size='md'
        isDisabled={loading}
        isReadOnly={loading}
        isRequired
      >
        <FormControlLabel>
          <FormControlLabelText>Password</FormControlLabelText>
        </FormControlLabel>
        <Input className='my-1' size='md'>
          <InputField
            type='password'
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
          />
        </Input>
      </FormControl>

      {isSignUp && (
        <>
          <FormControl
            size='md'
            isDisabled={loading}
            isReadOnly={loading}
            isRequired
          >
            <FormControlLabel>
              <FormControlLabelText>Repeat Password</FormControlLabelText>
            </FormControlLabel>
            <Input className='my-1' size='md'>
              <InputField
                type='password'
                placeholder='Repeat Password'
                value={repeatPassword}
                onChangeText={setRepeatPassword}
              />
            </Input>
          </FormControl>

          <FormControl
            size='md'
            isDisabled={loading}
            isReadOnly={loading}
            isRequired
          >
            <FormControlLabel>
              <FormControlLabelText>Full name</FormControlLabelText>
            </FormControlLabel>
            <Input className='my-1' size='md'>
              <InputField
                type='text'
                placeholder='Full name'
                value={fullName}
                onChangeText={setFullName}
              />
            </Input>
          </FormControl>

          <FormControl
            size='md'
            isDisabled={loading}
            isReadOnly={false}
            isRequired
          >
            <FormControlLabel>
              <FormControlLabelText>Phone</FormControlLabelText>
            </FormControlLabel>
            <Input className='my-1' size='md'>
              <InputField
                type='text'
                placeholder='Phone'
                value={phone}
                onChangeText={setPhone}
              />
            </Input>
          </FormControl>
        </>
      )}

      <View className='flex flex-row self-end mt-4'>
        <Button
          disabled={loading}
          onPress={() => {
          isSignUp ? setIsSignUp(false) : setIsSignUp(true);
          }}          
          className='ml-4'
          variant='solid'
          size='md'
          action='primary'
        >
          {loading && <ButtonSpinner color='gray' />}
          <ButtonText>{isSignUp ? 'Terug naar Login' : 'Aanmelden'}</ButtonText>
        </Button>

        <Button
          disabled={loading}
          onPress={isSignUp ? signUpWithEmail : signInWithEmail}
          className='ml-4'
          variant='solid'
          size='md'
          action='primary'
        >
          {loading && <ButtonSpinner color='gray' />}
          <ButtonText>{isSignUp ? 'Creëer Account' : 'Login'}</ButtonText>
        </Button>

      </View>
    </VStack>
  );
}
