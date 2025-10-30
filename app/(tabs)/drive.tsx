import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { CarpoolCard } from '@/components/CarpoolCard';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useSession } from '@/context/session-context';
import { getUserRides } from '@/libs/getUserRides';

export default function drive() {
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

  const handleCreateCarpool = () => {
    router.push('/createCarpool');
  };

  const formatRideDate = (isoString: string) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString('nl-NL', { weekday: 'long', month: 'long', day: 'numeric' })} ${date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
  <View className="flex-1">
    <View className="flex-1 m-3 bg-gray-400 p-0 rounded">
      <Card className="bg-gray-500 m-0">
        <Button size="lg" onPress={handleCreateCarpool}>
            <ButtonIcon as={Plus} />
            <ButtonText>Maak een Carpool aan</ButtonText>
          </Button>
        </Card>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Spinner size="large" />
        </View>
      ) : rides.length > 0 ? (
        <ScrollView>
          {rides.map((ride) => (
              <CarpoolCard
                key={ride.id}
                time={formatRideDate(ride.dateTime)}
                startLocation={ride.fromLocation}
                endLocation={ride.toLocation}
                avatar={ride.avatarUrl}
              />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text size="xl" bold>
            Maak nu een carpool aan!
          </Text>
        </View>
      )}
      </View>
    </View>
  );

}
