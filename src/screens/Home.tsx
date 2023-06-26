import React, {FC, useEffect} from 'react';
import {
  Text,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  VStack,
  Box,
  Pressable,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {PageContainer, Header} from '../components';
import firestore from '@react-native-firebase/firestore';

const Home: FC = () => {
  const navigation = useNavigation();

  // const getDashboard = () => {
  //   firestore()
  //     .collection('Dashboard')
  //     .onSnapshot(
  //       QuerySnapshot => {
  //         console.log('QuerySnapshot >>', QuerySnapshot.docs.reverse());
  //       },
  //       error => {
  //         console.error(error);
  //       },
  //     );
  // };

  // const sendDashboard = () => {
  //   firestore()
  //     .collection('Dashboard')
  //     .add({
  //       author: 'Tum',
  //       message: 'hahaha',
  //       createdOn: new Date().toLocaleString(),
  //       createdOnTimestamp: new Date().getTime(),
  //     })
  //     .then(() => {
  //       console.log('Dashboard added!');
  //     });
  // };

  // useEffect(() => {
  //   // getDashboard();
  //   sendDashboard();
  // }, []);

  return (
    <PageContainer>
      <VStack flex={1}>
        <Header title="Dashboard" />
        <Center px={4} flex={1}>
          <VStack space={5} alignItems="center">
            <Heading size="lg">Welcome to NativeBase</Heading>
            <HStack space={2} alignItems="center">
              <Text>Edit</Text>
              <Box
                px={2}
                py={1}
                _dark={{bg: 'blueGray.800'}}
                _light={{bg: 'blueGray.200'}}>
                App.js
              </Box>
              <Text>and save to reload.</Text>
            </HStack>
          </VStack>
        </Center>
      </VStack>
    </PageContainer>
  );
};

export default Home;
