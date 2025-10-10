import { Text, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text as CustomText } from '@/components/ui/text';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
// import Svg, { Line } from 'react-native-svg';
// import { Button } from '@react-navigation/elements';
// import { Table } from '../../components/ui/table';

export default function MakeCarpool() {
    return (
//         <View className='flex-1 p-4'>
//             {/* Plus knop */}
//             <TouchableOpacity className='w-10 h-10 rounded-lg bg-blue-600 justify-center items-center'>
//                 <Svg width='20' height='20' viewBox='0 0 24 24'>
//                     <Line x1='12' y1='5' x2='12' y2='19' stroke='white' strokeWidth='3' />
//                     <Line x1='5' y1='12' x2='19' y2='12' stroke='white' strokeWidth='3' />
//                 </Svg>
//             </TouchableOpacity>

//             {/* Carpool Card */}
//             <CarpoolCard
//                 profileImage='https://randomuser.me/api/portraits/men/32.jpg'
//                 from='Amsterdam'
//                 to='Utrecht'
//                 time='08:00 - 09:00'
//             />
// =======
//         <View className='m-6'>
//             <Card className='flex-row items-center justify-between bg-gray p-0 pb-8'>
//                 <Text className='text-2xl font-bold'>Jouw Ritten</Text>
//                 <Button>Rit Toevoegen</Button>
//             </Card>
//             <Table>
//                 <Card className='flex-row items-center justify-between bg-gray p-0 pb-8'>
//                     <Text>Rit 1</Text>
//                     <Text>van: Assen</Text>
//                     <Text>naar: Groningen</Text>
//                     <Text>Tijd: 10:00</Text>
//                     <Button>Details</Button>
//                 </Card>
//                 <Card className='flex-row items-center justify-between bg-gray p-0 pb-8'>
//                     <Text>Rit 2</Text>
//                     <Text>van: Groningen</Text>
//                     <Text>naar: Leeuwarden</Text>
//                     <Text>Tijd: 12:00</Text>
//                     <Button>Details</Button>
//                 </Card>
//                 <Card className='flex-row items-center justify-between bg-gray p-0 pb-8'>
//                     <Text>Rit 3</Text>
//                     <Text>van: Leeuwarden</Text>
//                     <Text>naar: Assen</Text>
//                     <Text>Tijd: 10:00</Text>
//                     <Button>Details</Button>
//                 </Card>
//             </Table>
// >>>>>>> 9d26359 (drive page changes)
//         </View>

function CarpoolCard({ profileImage, from, to, time }) {
    return (
        <Card size='md' variant='elevated' className='my-2 p-3 bg-red-500'>
            <View className='flex-row items-center'>
                {/* Profielfoto */}
                <Image
                    source={{ uri: profileImage }}
                    className='w-12 h-12 rounded-full mr-4'
                />

                {/* Info rechts */}
                <View className='flex-1'>
                    <Heading size='md'>
                        {from} → {to}
                    </Heading>
                    <CustomText size='sm' className='mt-1'>
                        {time}
                    </CustomText>
                </View>
            </View>
        </Card>
    );
}
