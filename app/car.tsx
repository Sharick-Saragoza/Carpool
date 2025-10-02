import { Text, View } from 'react-native';
import Navbar from '../components/ui/navbar';


export default function Car() {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Car Page</Text>
            </View>
            <Navbar />
        </View>
    );
}
