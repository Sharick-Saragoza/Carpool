import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { CarpoolCard } from '@/components/CarpoolCard';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { useSession } from '@/context/session-context';
import { getUserRides } from '@/libs/getUserRides';

export default function MakeCarpool() {
  const session = useSession();
  const userId = session.user.id;

  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRidesData = async () => {
    try {
      setLoading(true);
      const ridesData = await getUserRides(userId);

      if (ridesData && ridesData.length > 0) {
        const processedRides = ridesData.map((ride) => {
          const endLocation = JSON.parse(ride.end_location);
          const StartLocation = JSON.parse(ride.start_location);

          return {
            id: ride.id,
            avatarUrl: ride.driver?.avatar_url,
            toLocation: endLocation.displayName,
            fromLocation: StartLocation.displayName,
            dateTime: ride.date,
          };
        });

        setRides(processedRides);
        console.log(processedRides)
      } else {
        setRides([]);
      }
    } catch (error) {
      console.error('Error fetching rides:', error);
      setRides([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRidesData();
  }, []);

  const handleRefresh = () => {
    fetchRidesData();
  };

  const handleCreateCarpool = () => {
    router.push('/createCarpool');
  };

  return (
    <View className='flex-1'>
      <View className='flex-1 m-3 bg-gray-400 p-0'>
        <Card className='bg-gray-500 m-0'>
          <Button size='lg' onPress={handleCreateCarpool}>
            <ButtonIcon as={Plus} />
            <ButtonText>Maak een Carpool aan</ButtonText>
          </Button>
        </Card>
        <ScrollView>
          {loading ? (
            
            <Card className=''>
              <Text>Loading rides...</Text>
            </Card>

          ) : rides.length > 0 ? (
            rides.map((ride) => (
              <CarpoolCard
                key={ride.id}
                time={ride.dateTime}
                startLocation={ride.fromLocation}
                endLocation={ride.toLocation}
                avatar={ride.avatarUrl}
              />
            ))
          ) : (
            <Card className='m-3 p-3'>
              <Text>Maak nu een carpool aan!</Text>
            </Card>
          )}
        </ScrollView>
      </View>
    </View>
  );
}