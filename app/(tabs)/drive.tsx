import { Plus } from 'lucide-react-native';
import { ScrollView } from 'react-native';
import { CarpoolCard } from '@/components/CarpoolCard';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function MakeCarpool() {
  return (
    <ScrollView>
      <Card className="flex-1 m-3 bg-gray-400 p-0   ">
        <Card className="bg-gray-500 m-0 ">
          <Button size="lg">
            <ButtonIcon as={Plus} />
            <ButtonText>
              Maak een Carpool aan
            </ButtonText>
          </Button>
        </Card>

        <CarpoolCard
          profileImage="https://randomuser.me/api/portraits/men/32.jpg"
          from="Amsterdam"
          to="Utrecht"
          time="08:00 - 09:00"
        />
      </Card>
    </ScrollView>
  );
}
