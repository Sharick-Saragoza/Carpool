import { Text, View } from 'react-native';
import Navbar from '../components/ui/navbar';


export default function Chat() {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Chat Page</Text>
            </View>
            <Navbar />
        </View>
    );
}
