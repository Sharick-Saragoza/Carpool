import { Avatar } from './ui/avatar';
import { Card } from './ui/card';
import { Heading } from './ui/heading';
import { Text } from './ui/text';
import { View } from './ui/view';

export function CarpoolCard({ profileImage, from, to, time }) {
  return (
    <Card size="md" variant="elevated" className="my-2 p-3 bg-red-500">
      <View className="flex-row items-center">
        <Avatar
          source={{ uri: profileImage }}
          className="w-12 h-12 rounded-full mr-4"
        />

        <View className="flex-1">
          <Heading size="md">
            {from} → {to}
          </Heading>
          <Text size="sm" className="mt-1">
            {time}
          </Text>
        </View>
      </View>
    </Card>
  );
}
