import type React from 'react';
import { ScrollView, View } from 'react-native';

interface ScreenWrapperProps {
  children: React.ReactNode;
}

export default function ScreenWrapper({ children }: ScreenWrapperProps) {
  return (
   <ScrollView
      className="px-6 pt-20 bg-gray-100">
      <View className="w-full max-w-screen-xl mx-auto">{children}</View>
    </ScrollView>
  );
}
