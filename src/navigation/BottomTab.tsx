/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductStack from './ProductStack';
import TransactionStack from './TransactionStack';
import {Dashboard, Setting} from '../screens';
import {Box, Button, HStack, Modal, Spacer, Text, VStack} from 'native-base';
import {
  homeBlackIcon,
  homeActiveBlackIcon,
  homeWhiteIcon,
  homeActiveWhiteIcon,
  productBlackIcon,
  productActiveBlackIcon,
  productWhiteIcon,
  productActiveWhiteIcon,
  transactionBlackIcon,
  transactionActiveBlackIcon,
  transactionWhiteIcon,
  transactionActiveWhiteIcon,
  settingBlackIcon,
  settingActiveBlackIcon,
  settingWhiteIcon,
  settingActiveWhiteIcon,
} from '../assets';
import {Image, TouchableOpacity} from 'react-native';
import {useColorMode} from 'native-base';
import {Tabs} from '../models';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEY, setColorModeLocal, setLanguageLocal} from '../utils/localStorage';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAllProduct,
  setAllTransaction,
  updateColorMode,
} from '../redux/action';
import {ThemeColor} from '../redux/models';
import {Appearance} from 'react-native';
import {getColorModeState} from '../redux/selector';
import {IconSelect, LoadingScreen} from '../components';
import {useModal} from '../hooks';
import {getProductService} from '../services/productService';
import {getTransactionService} from '../services/transactionService';

const Tab = createBottomTabNavigator();

const languages = [
  {
    title: 'English',
    code: 'en',
  },
  {
    title: 'ไทย',
    code: 'th',
  },
];

const BottomTab: FC = () => {
  const {colorMode, setColorMode} = useColorMode();
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const colorModeState = useSelector(getColorModeState);
  const {modal, closeModal, openModal} = useModal();
  const [selectLang, setSelectLang] = useState<string>('');
  const [loadApp, setLoadApp] = useState<boolean>(false);
  const isDarkMode: boolean = colorMode === 'dark';
  const modeFromSystem: string = Appearance.getColorScheme() ?? 'light';

  const homeIcon = isDarkMode ? homeWhiteIcon : homeBlackIcon;
  const homeActiveIcon = isDarkMode ? homeActiveWhiteIcon : homeActiveBlackIcon;

  const productIcon = isDarkMode ? productWhiteIcon : productBlackIcon;
  const productActiveIcon = isDarkMode
    ? productActiveWhiteIcon
    : productActiveBlackIcon;

  const transactionIcon = isDarkMode
    ? transactionWhiteIcon
    : transactionBlackIcon;
  const transactionActiveIcon = isDarkMode
    ? transactionActiveWhiteIcon
    : transactionActiveBlackIcon;

  const settingIcon = isDarkMode ? settingWhiteIcon : settingBlackIcon;
  const settingActiveIcon = isDarkMode
    ? settingActiveWhiteIcon
    : settingActiveBlackIcon;

  const loadLanguage = async () => {
    // Setting Language App
    const language = await AsyncStorage.getItem(KEY.APP_LANGUAGE);
    if (language && language !== 'null') {
      i18n.changeLanguage(language);
      return;
    } else {
      openModal();
    }
  };

  const loadColorMode = async () => {
    // Setting theme App
    const themeString = await AsyncStorage.getItem(KEY.APP_COLOR_MODE);
    console.log('themeString >> ', themeString);
    let themColor: ThemeColor;
    if (
      themeString === 'dark' ||
      themeString === 'light' ||
      themeString === 'device'
    ) {
      themColor = themeString;
    } else {
      themColor = 'device';
    }

    if (themeString && themeString !== 'null') {
      dispatch(updateColorMode(themColor));
      switch (themColor) {
        case 'dark':
          setColorMode(themColor);
          break;
        case 'light':
          setColorMode(themColor);
          break;
        case 'device':
          setColorMode(modeFromSystem);
          break;
      }
    } else {
      const isSuccess = await setColorModeLocal(themColor);
      console.log('setColormode isSuccess  >> ', isSuccess);
      dispatch(updateColorMode('device'));
      setColorMode(modeFromSystem);
    }
  };

  const loadAllProduct = async () => {
    const products = await getProductService();
    dispatch(setAllProduct(products));
  };

  const loadAllTranSaction = async () => {
    const transactions = await getTransactionService();
    dispatch(setAllTransaction(transactions));
  };

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setSelectLang(code);
  };

  const handleChangeLanguage = async () => {
    const isSuccess = await setLanguageLocal(selectLang);
    closeModal();
    console.log('handleChangeLanguage >>', isSuccess);
  };

  useEffect(() => {
    setLoadApp(true);
    setSelectLang(languages[0].code);
    loadLanguage();
    loadColorMode();
    loadAllProduct();
    loadAllTranSaction();
    setLoadApp(false);
  }, []);

  //check device change theme
  useEffect(() => {
    if (colorModeState === 'device') {
      setColorMode(modeFromSystem);
    }
  }, [Appearance]);

  // Load App
  if (loadApp) {
    return <LoadingScreen isShow={loadApp} />;
  }
  // First Visit App
  if (modal) {
    return (
      <Modal isOpen={modal} onClose={closeModal}>
        <Modal.Content maxWidth="400px">
          <Modal.Header>{t('BottomTab.selectLang')}</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              {languages.map(lang => {
                return (
                  <TouchableOpacity
                    key={lang.code}
                    onPress={() => changeLanguage(lang.code)}>
                    <HStack>
                      <Text>{lang.title}</Text>
                      <Spacer />
                      <IconSelect selected={selectLang === lang.code} />
                    </HStack>
                  </TouchableOpacity>
                );
              })}
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button flex={1} maxHeight={10} onPress={handleChangeLanguage}>
              {t('BottomTab.select')}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarBackground: () => (
          <Box _dark={{bg: 'blueGray.800'}} _light={{bg: 'blue.50'}} flex={1} />
        ),
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name={Tabs.Dashboard}
        component={Dashboard}
        options={{
          tabBarIcon: ({size, focused}) => (
            <Image
              source={focused ? homeActiveIcon : homeIcon}
              style={{width: size, height: size}}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 14,
            color: isDarkMode ? '#ffffff' : '#000000',
          },
          tabBarLabel: t('Dashboard.title'),
        }}
      />
      <Tab.Screen
        name={Tabs.Product}
        component={ProductStack}
        options={{
          tabBarIcon: ({size, focused}) => (
            <Image
              source={focused ? productActiveIcon : productIcon}
              style={{width: size, height: size}}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 14,
            color: isDarkMode ? '#ffffff' : '#000000',
          },
          tabBarLabel: t('Product.title'),
        }}
      />
      <Tab.Screen
        name={Tabs.Transaction}
        component={TransactionStack}
        options={{
          tabBarIcon: ({size, focused}) => (
            <Image
              source={focused ? transactionActiveIcon : transactionIcon}
              style={{width: size, height: size}}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 14,
            color: isDarkMode ? '#ffffff' : '#000000',
          },
          tabBarLabel: t('Transaction.title'),
        }}
      />
      <Tab.Screen
        name={Tabs.Setting}
        component={Setting}
        options={{
          tabBarIcon: ({size, focused}) => (
            <Image
              source={focused ? settingActiveIcon : settingIcon}
              style={{width: size, height: size}}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 14,
            color: isDarkMode ? '#ffffff' : '#000000',
          },
          tabBarLabel: t('Setting.title'),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
