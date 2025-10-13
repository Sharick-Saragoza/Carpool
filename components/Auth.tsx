import { useEffect, useState } from 'react';
import { Alert, AppState, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { getSupabaseClient } from '@/context/supabase';

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
    <View>
      <TextInput
        label="Email"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        disabled={loading}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        disabled={loading}
        secureTextEntry
      />

      {isSignUp && (
          <View>
              <TextInput
                label="Repeat Password"
                placeholder="Repeat Password"
                value={repeatPassword}
                onChangeText={setRepeatPassword}
                disabled={loading}
                secureTextEntry
              />
    
              <TextInput
                label="Full Name"
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
                disabled={loading}
                autoCapitalize="words"
              />
    
              <TextInput
                label="Phone"
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                disabled={loading}
              />

          </View>
      )}

      
        {isSignUp && (
          <View className="flex flex-row self-end mt-4">

            <Button 
              disabled={loading} 
              onPress={() => setIsSignUp(false)}
              mode='contained'
            >
              Back to Sign In
            </Button>
            
            <Button 
              disabled={loading} 
              onPress={() => signUpWithEmail()}
              mode='contained'
            >
              Sign Up
            </Button>
          </View>
          
        )}

        {!isSignUp && (
          <View className="flex flex-row self-end mt-4">

          <Button
            disabled={loading}
            onPress={() => setIsSignUp(true)}
            loading={loading}
            mode='contained'
          >
            Create Account
          </Button>

          <Button
            disabled={loading}
            onPress={() => signInWithEmail()}
            loading={loading}
            mode='contained'
          >
            Sign In
          </Button>
        </View>
        )}
      
    </View>
  );
}
