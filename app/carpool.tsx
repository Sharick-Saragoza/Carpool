import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text as CustomText } from "@/components/ui/text";

export default function MakeCarpool() {
  return (
    <View className="flex-1 p-4">
      {/* Plus knop */}
      <View className="flex-row items-center space-x-2.5 mb-4">
        <TouchableOpacity className="w-10 h-10 rounded-lg bg-blue-600 justify-center items-center">
          <Text className="text-white text-2xl font-bold leading-7">+</Text>
        </TouchableOpacity>
        <Text>Maak een carpool aan</Text>
      </View>

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
