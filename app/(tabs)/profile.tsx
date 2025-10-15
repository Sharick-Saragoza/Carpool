import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';
import Account from '@/components/Account';

export default function ProfileScreen() {
  return (
    <ScrollView>
      <Account />
    </ScrollView>
  );
}
