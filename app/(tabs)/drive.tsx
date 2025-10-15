import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text as CustomText } from '@/components/ui/text';

export default function MakeCarpool() {
  return (
    <ScrollView>
        <View className="flex-1 p-4">
        {/* Plus knop */}
        <TouchableOpacity className="w-10 h-10 rounded-lg bg-blue-600 justify-center items-center">
            <Svg width="20" height="20" viewBox="0 0 24 24">
            <Line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="3" />
            <Line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="3" />
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

function CarpoolCard({ profileImage, from, to, time }) {
  return (
    <Card size="md" variant="elevated" className="my-2 p-3 bg-red-500">
      <View className="flex-row items-center">
        {/* Profielfoto */}
        <Image
          source={{ uri: profileImage }}
          className="w-12 h-12 rounded-full mr-4"
        />

        {/* Info rechts */}
        <View className="flex-1">
          <Heading size="md">
            {from} → {to}
          </Heading>
          <CustomText size="sm" className="mt-1">
            {time}
          </CustomText>
        </View>
      </View>
    </Card>
  );
}
