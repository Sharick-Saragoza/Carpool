import { Avatar, AvatarImage } from './ui/avatar';
import { Card } from './ui/card';
import { Heading } from './ui/heading';
import { Text } from './ui/text';
import { View } from './ui/view';

export function CarpoolCard({ time, startLocation, endLocation, avatar }) {
  return (
    <Card variant='elevated' className='mx-5 mt-5'>
      <View className='flex-row items-center'>
        <Avatar className='w-12 h-12 rounded-full mr-4'>
          <AvatarImage source={{ uri: avatar }} />
        </Avatar>

        <View className='flex-1'>
          <Heading size='md'>
            {startLocation} → {endLocation}
          </Heading>
          <Text size='sm' className='mt-1'>
            {time}
          </Text>
        </View>
      </View>
    </Card>
  );
}