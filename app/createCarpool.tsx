import DateTimePicker from '@react-native-community/datetimepicker';
import { SearchIcon } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@/components/ui/slider';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import ScreenWrapper from '@/components/ScreenWrapper';

export default function CreateCarpool() {
  const [page, setPage] = useState<number>(1);
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [seats, setSeats] = useState(1);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handleSliderChange = (value: number) => {
    setSeats(value);
  };

  const renderContent = () => {
    if (page === 1) {
      return (
        <ScreenWrapper>
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
        </ScreenWrapper>
      );
    }

    if (page === 2) {
      return (
        <ScreenWrapper>
          <View className='flex-1'>
            <Button onPress={showDatepicker}>
              <ButtonText>show Date</ButtonText>
            </Button>

            <Button onPress={showTimepicker}>
              <ButtonText>show Time</ButtonText>
            </Button>
            {show && (
              <DateTimePicker
                testID='dateTimePicker'
                value={date}
                mode={mode as any}
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </View>
        </ScreenWrapper>
      );
    }

    if (page === 3) {
      return (
        <ScreenWrapper>
        <View className='flex-1 p-4'>
            <Card className='p-4 mb-5'>
              <Text className='text-center text-lg font-semibold mb-4'>
                Aantal zitplaatsen: {seats}
              </Text>
              <Slider
                defaultValue={0}
                value={seats}
                onChange={handleSliderChange}
                step={1}
                minValue={1}
                maxValue={10}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Card>

            <Card className='mb-5'>
              <Text className='text-center text-lg font-semibold mb-4'>
                Voorkeuren
              </Text>
              <Box className='flex flex-row'>
                <Button variant='outline' className='flex-1'>
                  <ButtonText>test</ButtonText>
                </Button>
                <Button variant='outline' className='flex-1'>
                  <ButtonText>test</ButtonText>
                </Button>
              </Box>
            </Card>

            <Card className="min-h-[120px]">
              <Input className="min-h-[120px]">
                <InputField 
                placeholder='Voer het volledige address in' 
                multiline={true}
                textAlignVertical='top'
                className="min-h-[120px] py-3"
                />
              </Input>
            </Card>
          </View>
        </ScreenWrapper>
      );
    }
  };

  return (
    <ScreenWrapper>
      <View className='flex-1'>
        {renderContent()}

        <View className='bg-gray-400 p-4 flex flex-row gap-5'>
          {page !== 1 && (
            <Button className='flex-1' onPress={() => setPage(page - 1)}>
              <ButtonText>Back</ButtonText>
            </Button>
          )}
          {page !== 3 ? (
            <Button className='flex-1' onPress={() => setPage(page + 1)}>
              <ButtonText>Next</ButtonText>
            </Button>
          ) : (
            <Button
              className='flex-1'
              onPress={() => console.log('Submit', { seats })}
            >
              <ButtonText>Submit</ButtonText>
            </Button>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
