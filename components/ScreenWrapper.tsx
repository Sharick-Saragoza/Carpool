import type React from 'react';
import { ScrollView, View } from 'react-native';

interface ScreenWrapperProps {
  children: React.ReactNode;
}

export default function ScreenWrapper({ children }: ScreenWrapperProps) {
  return (
    <ScrollView
      className='flex-1 bg-white'
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 60,
      }}
    >
      <View className='w-full max-w-screen-xl mx-auto'>{children}</View>
    </ScrollView>
  );
}
