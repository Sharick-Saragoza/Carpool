import { Text, View } from 'react-native';
import { Card } from '../../components/ui/card';

export default function DriveScreen() {
    return (
        <View>
            <Text className='text-7xl font-bold mb-4'>Jouw Ritten</Text>
            <Card>
                <Text>Rit Toevoegen</Text>
            </Card>
        </View>
    );
}