import { ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { CarpoolCard } from '@/components/CarpoolCard';
import { View } from '@/components/ui/view';

export default function MakeCarpool() {
  return (
    <ScrollView>
      <View className="flex-1 p-4">
        <TouchableOpacity className="w-10 h-10 rounded-lg bg-blue-600 justify-center items-center">
          <Svg width="20" height="20" viewBox="0 0 24 24">
            <Line
              x1="12"
              y1="5"
              x2="12"
              y2="19"
              stroke="white"
              strokeWidth="3"
            />
            <Line
              x1="5"
              y1="12"
              x2="19"
              y2="12"
              stroke="white"
              strokeWidth="3"
            />
          </Svg>
        </TouchableOpacity>

        {/* Carpool Card */}
        <CarpoolCard
          profileImage="https://randomuser.me/api/portraits/men/32.jpg"
          from="Amsterdam"
          to="Utrecht"
          time="08:00 - 09:00"
        />
      </View>
    </ScrollView>
  );
}
