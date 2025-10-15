import DateTimePicker from '@react-native-community/datetimepicker';
import { SearchIcon } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { View } from '@/components/ui/view';

export default function CreateCarpool() {
  const [page, setPage] = useState<number>(1);
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode('date')
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const renderContent = () => {
    if (page === 1) {
      return (
        <ScrollView>
          <View>
            <Card className='flex-1'>
              <Input>
                <InputSlot className='pl-3'>
                  <InputIcon as={SearchIcon} />
                </InputSlot>
                <InputField placeholder='Voer het volledige address in' />
              </Input>
            </Card>

            <Card>
              <Input>
                <InputSlot className='pl-3'>
                  <InputIcon as={SearchIcon} />
                </InputSlot>
                <InputField placeholder='Voer het volledige address in' />
              </Input>
            </Card>

            <Card>
              <Input>
                <InputSlot className='pl-3'>
                  <InputIcon as={SearchIcon} />
                </InputSlot>
                <InputField placeholder='Voer het volledige address in' />
              </Input>
            </Card>
          </View>
        </ScrollView>
      );
    }

    if (page === 2) {
      return (
        <View className='flex-1'>
          <SafeAreaView>
            <Button onPress={showDatepicker}>
              <ButtonText>show time</ButtonText>
            </Button>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </SafeAreaView>
        </View>
      );
    }

    if (page === 3) {
      return (
        <View className='flex-1'>
          <Card>
            <Input>
              <InputSlot className='pl-3'>
                <InputIcon as={SearchIcon} />
              </InputSlot>
              <InputField placeholder='Voer het volledige address in3' />
            </Input>
          </Card>
        </View>
      );
    }
  };

  return (
    <View className='flex-1'>
      {renderContent()}

      <View className='bg-gray-400 p-4 flex flex-row gap-5'>
        {page !== 1 && (
          <Button className='flex-1' onPress={() => setPage(page - 1)}>
            <ButtonText>Back</ButtonText>
          </Button>
        )}
        <Button className='flex-1' onPress={() => setPage(page + 1)}>
          <ButtonText>next</ButtonText>
        </Button>
      </View>
    </View>
  );
}
