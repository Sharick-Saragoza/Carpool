import { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Avatar } from '@/components/ui/avatar';



export default function ExploreScreen() {

  const [searchQuery, setSearchQuery] = useState('');

  return (
  <SafeAreaView className='flex-1'>
      <View className='flex-1 bg-gray-100 w-full mx-auto'>
        <View className='pb-6'>
          <Text className='text-3xl font-bold text-gray-800 mx-auto'>
            Berichten
          </Text>
        </View>

        {/* Main Card */}
        <Card className='flex-1 rounded-2xl shadow-lg bg-[#9ca3af] border-0 mx-4 mb-4'>
          {/* Zoeken functie */}
          <View className='mb-0'>
            <TextInput
              placeholder='Zoeken...'
              value={searchQuery}
              onChangeText={setSearchQuery}
              className='bg-white border border-gray-300 rounded-xl px-4 py-3 text-lg'
              placeholderTextColor='#9CA3AF'
            />
          </View>

          <ScrollView>
            {/* Chat cards */}
            <View className='mt-5'>
              <Card size="md" variant="elevated" className="p-3">
                <View className="flex-row items-center">
                  <Avatar
                    // source={{ uri: profileImage }}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <View className="flex-1">
                    <Heading size="md">
                      Naam
                    </Heading>
                    <Text size="sm" className="mt-1">
                      Laatste bericht preview...
                    </Text>
                  </View>
                </View>
              </Card>        
            </View>
          </ScrollView>
        </Card>
      </View>
    </SafeAreaView>
  );
}