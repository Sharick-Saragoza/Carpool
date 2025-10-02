import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Navbar = () => {
    const router = useRouter();

    return (
        <View className='h-16 bg-gray-400 flex-row justify-around items-center px-5'>
            <TouchableOpacity onPress={() => router.push('/')}>
                <Ionicons name='globe' size={28} color='white' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/car')}>
                <Ionicons name='car-sport' size={28} color='white' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/chat')}>
                <Ionicons name='chatbubble' size={28} color='white' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/profile')}>
                <Ionicons name='person' size={28} color='white' />
            </TouchableOpacity>
        </View>
    );
};

export default Navbar;
