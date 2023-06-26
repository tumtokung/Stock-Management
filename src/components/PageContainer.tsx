/* eslint-disable react-native/no-inline-styles */
import {View} from 'native-base';
import React, {ReactNode} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {useColorMode} from 'native-base';

type PageContainerProps = {
  children: ReactNode;
};

const PageContainer: React.FC<PageContainerProps> = ({children}) => {
  const {colorMode} = useColorMode();
  const isDarkMode: boolean = colorMode === 'dark';
  return (
    <View flex={1} _dark={{bg: 'blueGray.700'}} _light={{bg: 'blueGray.200'}}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#1e293b' : '#eff6ff'}
        />
        {children}
      </SafeAreaView>
    </View>
  );
};

export default PageContainer;
