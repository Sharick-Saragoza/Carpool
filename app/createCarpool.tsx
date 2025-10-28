import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { AutoCompleteLocation } from '@/components/AutoCompleteLocation';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@/components/ui/slider';
import { Text } from '@/components/ui/text';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { View } from '@/components/ui/view';
import { useAuth } from '@/context/useAuth';
import { getUserCars } from '@/libs/getUserCars';
import { PREFERENCES } from '@/libs/ridePrefences';
import { showError } from '@/libs/showError';
import { updateRecord } from '@/libs/updateRecord';

export default function CreateCarpool() {
  const { session } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const devMode = process.env.EXPO_PUBLIC_DEV_MODE === 'true';

  const [page, setPage] = useState<number>(1);
  const [datetime, setDatetime] = useState(new Date());
  const [seats, setSeats] = useState(1);
  const [driveInfo, setDriveInfo] = useState<string>();
  const [location, setLocation] = useState();
  const [isResult, setIsResult] = useState<boolean>(false);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  useEffect(() => {
    setIsResult(location !== undefined);
  }, [location]);

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

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (devMode) {
        console.log('[DEV MODE] Carpool created:', {
          location,
          datetime,
          seats,
          driveInfo,
          selectedPreferences: JSON.stringify(selectedPreferences),
        });
        Alert.alert('Carpool created! (dev mode)');
        return;
      }
      const userId = session?.user.id;

      const car = await getUserCars(userId);
      const carId = car.id

      await updateRecord({
        session,
        table: 'rides',
        data: {
          created_at: new Date(),
          driver_id: session?.user?.id,
          car_id: carId,
          start_location: location,
          end_location: location,
          date: datetime,
          seats_available: seats,
          updated_at: new Date(),
          preferences: JSON.stringify(selectedPreferences),
          ride_info: driveInfo,
        },
      });

      Alert.alert('Carpool created successfully!');
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (page === 1) {
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
                  variant={
                    selectedPreferences.includes(pref.id) ? 'solid' : 'outline'
                  }
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
                placeholder='Voeg eventuele aanvullende informatie toe...'
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
            onPress={handleSubmit}
            disabled={loading} // Add loading state to button
          >
            <ButtonText>{loading ? 'Creating...' : 'Submit'}</ButtonText>
          </Button>
        )}
      </View>
    </View>
  );
}
