/* eslint-disable react-native/no-inline-styles */
import React, {type PropsWithChildren} from 'react';
import {Center, HStack, Heading, Spacer, useColorMode} from 'native-base';
import {Image, TouchableOpacity} from 'react-native';
import {expandLeftBlack, expandLeftWhite} from '../assets';
import {useNavigation} from '@react-navigation/native';

const Header: React.FC<
  PropsWithChildren<{
    title: string;
    isShowBack?: boolean;
  }>
> = ({children, title, isShowBack}) => {
  const navigation = useNavigation();
  const {colorMode} = useColorMode();
  const isDarkMode: boolean = colorMode === 'dark';
  return (
    <Center>
      <HStack
        px={4}
        py={5}
        _dark={{bg: 'blueGray.800'}}
        _light={{bg: 'blue.50'}}
        shadow="4">
        <HStack space="0.5" alignItems="center">
          {isShowBack && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={isDarkMode ? expandLeftWhite : expandLeftBlack}
                style={{width: 28, height: 28}}
              />
            </TouchableOpacity>
          )}
          <Heading size="lg">{title}</Heading>
        </HStack>
        <Spacer />
        {children}
      </HStack>
    </Center>
  );
};

export default Header;
