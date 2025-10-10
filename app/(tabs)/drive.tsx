import { Text, View } from 'react-native';
import { Card } from '../../components/ui/card';
import { Button } from '@react-navigation/elements';
import { Table } from '../../components/ui/table';

export default function DriveScreen() {
    return (
        <View className='m-6'>
            <Card className='flex-row items-center justify-between bg-gray p-0 pb-8'>
                <Text className='text-2xl font-bold'>Jouw Ritten</Text>
                <Button>Rit Toevoegen</Button>
            </Card>
            <Table>
                <Card className='flex-row items-center justify-between bg-gray p-0 pb-8'>
                    <Text>Rit 1</Text>
                    <Text>van: Assen</Text>
                    <Text>naar: Groningen</Text>
                    <Text>Tijd: 10:00</Text>
                    <Button>Details</Button>
                </Card>
                <Card className='flex-row items-center justify-between bg-gray p-0 pb-8'>
                    <Text>Rit 2</Text>
                    <Text>van: Groningen</Text>
                    <Text>naar: Leeuwarden</Text>
                    <Text>Tijd: 12:00</Text>
                    <Button>Details</Button>
                </Card>
                <Card className='flex-row items-center justify-between bg-gray p-0 pb-8'>
                    <Text>Rit 3</Text>
                    <Text>van: Leeuwarden</Text>
                    <Text>naar: Assen</Text>
                    <Text>Tijd: 10:00</Text>
                    <Button>Details</Button>
                </Card>
            </Table>
        </View>
    );
}