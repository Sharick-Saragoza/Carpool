import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  type NativeSyntheticEvent,
  type TextInputChangeEventData,
  View,
} from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { useSession } from '@/context/session-context';
import { getSupabaseClient } from '@/context/supabase';
import { getRecord } from '@/libs/getRecord';
import { getUserCars } from '@/libs/getUserCars';
import { saveCarData } from '@/libs/saveCarData';
import { showError } from '@/libs/showError';
import { updateRecord } from '@/libs/updateRecord';

import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { ChevronDownIcon } from '@/components/ui/icon';

export default function Account() {
  const session = useSession();
  const devMode = process.env.EXPO_PUBLIC_DEV_MODE === 'true';
  const [loading, setLoading] = useState(true);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [carId, setCarId] = useState<string>('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [seats, setSeats] = useState<number | null>(null);
  const [color, setColor] = useState('');

  interface Profile {
    full_name: string;
    phone: string;
    avatar_url: string;
    address: string;
    postal_code: string;
  }

  const userId = session.user.id;

  useEffect(() => {
    if (session.user) fetchUserData();
  }, [session]);

  async function fetchUserData() {
    try {
      setLoading(true);

      if (devMode) {
        // Mock profile and car for dev mode
        setFullName('Development User');
        setPhone('+1234567890');
        setAvatarUrl('');
        setAddress('123 Dev St');
        setPostalCode('00000');
        setCarId('dev-car-id');
        setBrand('DevBrand');
        setModel('DevModel');
        setSeats(4);
        setColor('Red');
        return;
      }

      const [profile, car] = await Promise.all([
        getRecord<Profile>('profiles', userId),
        getUserCars(userId),
      ]);

      if (profile) {
        setFullName(profile.full_name);
        setPhone(profile.phone);
        setAvatarUrl(profile.avatar_url);
        setAddress(profile.address);
        setPostalCode(profile.postal_code);
      }

      if (car) {
        setCarId(car.id);
        setBrand(car.brand);
        setModel(car.model);
        setSeats(car.seats);
        setColor(car.color);
      }
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  }

  const updateProfile = async () => {
    try {
      setLoading(true);

      if (devMode) {
        console.log('[DEV MODE] Profile updated:', {
          fullName,
          phone,
          address,
          postalCode,
          brand,
          model,
          seats,
          color,
        });
        Alert.alert('Profile updated! (dev mode)');
        return;
      }

      await updateRecord({
        session,
        table: 'profiles',
        data: {
          id: userId,
          full_name: fullName,
          phone: phone,
          address: address,
          postal_code: postalCode,
        },
      });

      if (brand || model || color || seats) {
        const id = await saveCarData({
          userId,
          carId,
          brand,
          model,
          seats: seats ?? 0,
          color,
        });
        setCarId(id);
      }

      Alert.alert('Profile updated successfully!');
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  // Typing voor onChange handler
  const handleInputChange =
    (setter: (text: string) => void) =>
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setter(e.nativeEvent.text);
    };

  const profile = [
    {
      disabled: false,
      label: 'Full Name',
      value: fullName,
      setter: setFullName,
    },
    {
      disabled: false,
      label: 'Phone',
      value: phone,
      setter: setPhone,
    },
    {
      disabled: false,
      label: 'Address',
      value: address,
      setter: setAddress,
    },
    {
      disabled: false,
      label: 'Postal Code',
      value: postalCode,
      setter: setPostalCode,
    },
  ];

  const car = [
    {
      disabled: false,
      label: 'Car Brand',
      value: brand,
      setter: setBrand,
    },
    {
      disabled: false,
      label: 'Model',
      value: model,
      setter: setModel,
    },
    {
      disabled: false,
      label: 'Color',
      value: color,
      setter: setColor,
    },
    {
      disabled: false,
      label: 'Seats',
      value: seats?.toString() || '',
      setter: (text: string) => setSeats(text ? parseInt(text) : null),
    },
  ];

  return (
    <View className='flex-1 justify-between'>
      <View>
        <View className='mt-6 mb-6 space-y-2'>
          {profile.map(({ disabled, label, value, setter }, i) => (
            <Input
              key={i}
              variant='outline'
              size='md'
              isDisabled={disabled}
              className='bg-white rounded-md border border-gray-300 px-3 py-2'
            >
              <InputField
                placeholder={label}
                value={value}
                onChange={handleInputChange(setter)}
                editable={!disabled}
                className='text-black'
              />
            </Input>
          ))}
        </View>

        <View className='mb-6 space-y-2'>
          {car.map(({ disabled, label, value, setter }, i) => {
            if (label === 'Car Brand' || label === 'Color') {
              return (
                <Select key={i} value={value} onValueChange={setter}>
                  <SelectTrigger
                    variant='outline'
                    size='md'
                    className='bg-white rounded-md border border-gray-300 px-3 py-2'
                  >
                    <SelectInput placeholder={label} />
                    <SelectIcon className='mr-3' as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      {label === 'Car Brand' ? (
                        <>
                          <SelectItem label='Toyota' value='Toyota' />
                          <SelectItem label='BMW' value='BMW' />
                          <SelectItem label='Tesla' value='Tesla' />
                        </>
                      ) : (
                        <>
                          <SelectItem label='Red' value='Red' />
                          <SelectItem label='Blue' value='Blue' />
                          <SelectItem label='Black' value='Black' />
                        </>
                      )}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              );
            } else {
              return (
                <Input
                  key={i}
                  variant='outline'
                  size='md'
                  isDisabled={disabled}
                  className='bg-white rounded-md border border-gray-300 px-3 py-2'
                >
                  <InputField
                    placeholder={label}
                    value={value}
                    onChange={handleInputChange(setter)}
                    editable={!disabled}
                    keyboardType={label === 'Seats' ? 'numeric' : 'default'}
                    className='text-black'
                  />
                </Input>
              );
            }
          })}
        </View>
      </View>

      <View className='flex-row justify-between space-x-4'>
        <Button
          onPress={updateProfile}
          isDisabled={loading}
          className='flex-1 bg-green-600 justify-center items-center rounded-md py-3'
        >
          {loading ? (
            <ActivityIndicator color='white' />
          ) : (
            <ButtonText className='text-white font-bold'>Update</ButtonText>
          )}
        </Button>

        <Button
          onPress={async () => {
            if (devMode) {
              console.log('[DEV MODE] Sign out skipped');
              Alert.alert('Signed out! (dev mode)');
              return;
            }
            const supabase = getSupabaseClient();
            if (!supabase) return;

            await supabase.auth.signOut();
          }}
          className='flex-1 bg-red-600 justify-center items-center rounded-md py-3'
        >
          <ButtonText className='text-white font-bold'>Sign out</ButtonText>
        </Button>
      </View>
    </View>
  );
}
