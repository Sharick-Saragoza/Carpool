import { useSession } from '@/context/session-context';
import { supabase } from '@/context/supabase';
import { getRecord } from '@/libs/getRecord';
import { getUserCars } from '@/libs/getUserCars';
import { saveCarData } from '@/libs/saveCarData';
import { showError } from '@/libs/showError';
import { updateRecord } from '@/libs/updateRecord';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, ButtonText } from './ui/button';
import { Input, InputField } from './ui/input';

export default function Account() {
    const session = useSession();
    const [loading, setLoading] = useState(true);

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    const [carId, setCarId] = useState<string>('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [seats, setSeats] = useState<number>(0);
    const [color, setColor] = useState('');

    interface Profile {
        full_name: string;
        phone: string;
        avatar_url: string;
        address: string;
        postal_code: string;
    }

    useEffect(() => {
        if (session.user) fetchUserData();
    }, [session]);

    const userId = session.user.id;

    async function fetchUserData() {
        try {
            setLoading(true);

            const [profile, car] = await Promise.all([
                getRecord<Profile>('profiles', session.user.id),
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

            await updateRecord({
                session,
                table: 'profiles',
                data: {
                    id: session.user.id,
                    full_name: fullName,
                    phone: phone,
                    address: address,
                    postal_code: postalCode,
                    avatar_url: avatarUrl,
                },
            });

            const id = await saveCarData({ userId, carId, brand, model, seats, color });
            setCarId(id);

            Alert.alert('Profile updated successfully!');
        } catch (error) {
            showError(error);
        } finally {
            setLoading(false);
        }
    };

    const profile = [
        { isdisabled: true, placeholder: 'Full Name', value: fullName, setter: setFullName },
        { isdisabled: true, placeholder: 'Phone', value: phone, setter: setPhone },
        { isdisabled: true, placeholder: 'Address', value: address, setter: setAddress },
        { isdisabled: true, placeholder: 'Postal Code', value: postalCode, setter: setPostalCode },

    ];

    const car = [
        { isdisabled: true, placeholder: 'Car Brand', value: brand, setter: setBrand },
        { isdisabled: true, placeholder: 'Model', value: model, setter: setModel },
        { isdisabled: true, placeholder: 'Color', value: color, setter: setColor },
        { isdisabled: true, placeholder: 'Seats', value: seats, setter: setSeats },

    ];

    return (
        <View>
            <View className='mb-20'>
                {profile.map(({ isdisabled, placeholder, value, setter }) => (
                    <Input isDisabled={isdisabled}>
                        <InputField
                            placeholder={placeholder}
                            value={value}
                            onChangeText={setter}
                        />
                    </Input>
                ))}
            </View>

            <View>
                {car.map(({ isdisabled, placeholder, value, setter }) => (
                    <Input isDisabled={isdisabled}>
                        <InputField
                            placeholder={placeholder}
                            value={value}
                            onChangeText={setter}
                        />
                    </Input>
                ))}
            </View>

            <View>
                <Button
                    onPress={updateProfile}
                    disabled={loading}
                >
                    <ButtonText>{loading ? 'Loading ...' : 'Update'}</ButtonText>
                </Button>
            </View>

            <View>
                <Button onPress={() => supabase.auth.signOut()}>
                    <ButtonText>Sign out</ButtonText>
                </Button>
            </View>
        </View>
    );
};