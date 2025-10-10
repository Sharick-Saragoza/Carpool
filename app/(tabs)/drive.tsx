import React from 'react';
import { Image, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';

export default function MakeCarpool() {
  return (
    <View className="flex-1 p-4">
      {/* Plus button */}
      <IconButton
        icon="plus"
        mode="contained"
        size={20}
        iconColor="white"
        containerColor="#2563eb"
        onPress={() => console.log('Pressed')}
      />

      {/* Carpool Card */}
      <CarpoolCard
        profileImage="https://randomuser.me/api/portraits/men/32.jpg"
        from="Amsterdam"
        to="Utrecht"
        time="08:00 - 09:00"
      />
    </View>
  );
}

function CarpoolCard({ profileImage, from, to, time }) {
  return (
    <Card mode="elevated" className="my-2 p-3">
      <Card.Content>
        <View className="flex-row items-center">
          {/* Profile image */}
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              className="w-12 h-12 rounded-full mr-4"
            />
          ) : (
            <IconButton icon="account" size={24} className="mr-2" />
          )}

          {/* Info right */}
          <View className="flex-1">
            <Text variant="titleMedium" className="font-bold">
              {from} → {to}
            </Text>
            <Text variant="bodyMedium" className="mt-1 text-gray-600">
              {time}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}
