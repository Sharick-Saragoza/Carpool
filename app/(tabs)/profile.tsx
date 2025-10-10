import Account from '@/components/Account';
import React from 'react';
import { View } from 'react-native';

export default function ProfileScreen() {
    return (
        <View className='flex-1 justify-center items-center'>
            <Account />
        </View>
    );
}