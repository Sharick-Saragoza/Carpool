import type React from 'react';
import { ScrollView, View } from 'react-native';

interface ScreenWrapperProps {
  children: React.ReactNode;
}

export default function ScreenWrapper({ children }: ScreenWrapperProps) {
  return (
   <ScrollView
      className="mx-5 bg-gray-100">
      <View className="w-full mx-auto">{children}</View>
    </ScrollView>
  );
}
