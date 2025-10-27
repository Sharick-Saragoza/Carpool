import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { AutoCompleteLocation } from '@/components/AutoCompleteLocation';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Grid, GridItem } from '@/components/ui/grid';
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@/components/ui/slider';
import { Text } from '@/components/ui/text';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { View } from '@/components/ui/view';
import { PREFERENCES } from '@/libs/ridePrefences';

export default function CreateCarpool() {
  const [page, setPage] = useState<number>(1);
  const [datetime, setDatetime] = useState(new Date());
  const [seats, setSeats] = useState(1);
  const [driveInfo, setDriveInfo] = useState<string>();
  const [location, setLocation] = useState();
  const [isResult, setIsResult] = useState<boolean>(false);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const handleLocationData = (feature) => {
    const locationJson = JSON.stringify(feature);
    setLocation(locationJson);
    setIsResult(true);
  };

  const togglePreference = (preferenceId: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(preferenceId)
        ? prev.filter((id) => id !== preferenceId)
        : [...prev, preferenceId],
    );
  };

  const onChange = (_event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || datetime;
    setShow(false);
    setDatetime(currentDate);
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSliderChange = (value: number) => {
    setSeats(value);
  };

  const renderContent = () => {
    if (page === 1) {
      if (location === undefined) {
        setIsResult(false);
      } else {
        setIsResult(true);
      }
      return (
        <View className='flex-1'>
          <AutoCompleteLocation onSelect={handleLocationData} />
        </View>
      );
    }

    if (page === 2) {
      return (
        <ScrollView className='flex-1 p-4'>
          <Card className='p-4 mb-4'>
            <Text className='text-lg font-semibold mb-2'>
              Selected Date & Time:
            </Text>
            <Text className='text-base mb-1'>📅 {formatDate(datetime)}</Text>
            <Text className='text-base'>⏰ {formatTime(datetime)}</Text>
          </Card>

          <Box className='flex flex-row gap-3 mb-4'>
            <Button
              variant='outline'
              className='flex-1'
              onPress={showDatepicker}
            >
              <ButtonText>Change Date</ButtonText>
            </Button>

            <Button
              variant='outline'
              className='flex-1'
              onPress={showTimepicker}
            >
              <ButtonText>Change Time</ButtonText>
            </Button>
          </Box>

          {show && (
            <DateTimePicker
              testID='dateTimePicker'
              value={datetime}
              mode={mode as any}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </ScrollView>
      );
    }

    if (page === 3) {
      return (
        <ScrollView className='flex-1 p-4'>
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
            <Box className='flex flex-row flex-wrap items-stretch gap-2'>
              {PREFERENCES.map((pref) => (
                <Button
                  key={pref.id}
                  variant={selectedPreferences.includes(pref.id) ? 'solid' : 'outline'}
                  className='min-w-[45%] flex-grow mb-2'
                  onPress={() => togglePreference(pref.id)}
                >
                  <ButtonText className='whitespace-normal text-center'>
                    {pref.label}
                  </ButtonText>
                </Button>
              ))}
            </Box>
          </Card>

          <Card>
            <Textarea>
              <TextareaInput
                placeholder='...'
                value={driveInfo}
                onChangeText={setDriveInfo}
              />
            </Textarea>
          </Card>
        </ScrollView>
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
        {page !== 3 ? (
          <Button
            disabled={!isResult}
            className='flex-1'
            onPress={() => setPage(page + 1)}
          >
            <ButtonText>Next</ButtonText>
          </Button>
        ) : (
          <Button
            className='flex-1'
            onPress={() =>
              console.log(
                location,
                datetime,
                seats,
                driveInfo,
                selectedPreferences,
              )
            }
          >
            <ButtonText>Submit</ButtonText>
          </Button>
        )}
      </View>
    </View>
  );
}
