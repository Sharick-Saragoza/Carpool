import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Link } from  '@/components/ui/link';
import ScreenWrapper from '@/components/ScreenWrapper';

export default function ExploreScreen() {
  const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState<Date >(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleConfirm = (date: Date) => {
    setSelected(date);
    setShowPicker(false);
  };

  return (
    <ScreenWrapper>
    {/* Header Card */}
      <Card className="w-full p-6 rounded-2xl shadow-lg bg-white border-0">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-2xl font-bold text-gray-800">Ritten overzicht</Text>
            <Text className="text-gray-500 mt-1">Bekijk de ritten op een specifieke datum</Text>
          </View>
          <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
            <Text className="text-gray-600 font-bold">🚗</Text>
          </View>
        </View>

        <View className="rounded-xl  mb-2">
          {/* Datum selecteren */}
          <Pressable
            onPress={() => setShowPicker(true)}
            className="bg-white border border-gray-200 rounded-xl p-4 flex-row items-center justify-between active:bg-blue-50"
          >
            <View className="flex-row items-center">
              <Text className="text-lg mr-3">📅</Text>
              <Text className={`text-lg ${selected ? "text-gray-800" : "text-gray-400"}`}>
                {selected ? selected.toLocaleDateString('nl-NL') : "Selecteer een datum"}
              </Text>
            </View>
            <Text className="text-gray-600 font-semibold">Wijzigen</Text>
          </Pressable>
        </View>

        <Modal
        visible={showPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}
        >
          <View className="flex-1 justify-end bg-black/50">
            <View className="bg-white rounded-t-3xl p-6 max-h-3/4">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-xl font-bold text-gray-800">Selecteer datum</Text>
                <Pressable 
                  onPress={() => setShowPicker(false)}
                  className="w-8 h-8 items-center justify-center"
                >
                  <Text className="text-2xl text-gray-400">×</Text>
                </Pressable>
              </View>
              
              <DateTimePicker
                mode="single"
                date={selected}
                onChange={({ date }) => date && handleConfirm(date)}
                styles={defaultStyles}
              />

              <View className="flex-row gap-3 mt-6">
                <Pressable
                  onPress={() => setShowPicker(false)}
                  className="flex-1 border border-gray-300 rounded-xl py-4"
                >
                  <Text className="text-center text-gray-600 font-medium">Annuleren</Text>
                </Pressable>
                <Pressable
                  onPress={() => selected && handleConfirm(selected)}
                  className="flex-1 bg-gray-500 rounded-xl py-4"
                >
                  <Text className="text-center text-white font-medium">Bevestigen</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* Geselecteerde data laten zien */}
        {selected && (
          <View className="mt-3 rounded-lg py-3 flex-row items-center">
            <Text className="font-medium">
              {selected.toLocaleDateString('nl-NL', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </View>
        )}
        <Card className='bg-gray-100 flex-1'>
          <View className='flex-row items-center w-full'>
            <Avatar></Avatar>
            <View className='flex-1 flex-row justify-between'>
              <View className='ml-4'>
                <Text>Van: Assen</Text>
                <Text>Naar: Groningen</Text>
              </View>
              <View>
                <Text>Om: 14:00</Text>
                <Link><Text className='text-blue-700'>Meer over</Text></Link>
              </View>
            </View>
          </View>
        </Card>
      </Card>   
    </ScreenWrapper>
  );
}