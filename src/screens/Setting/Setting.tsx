import {
  Center,
  HStack,
  Heading,
  Image,
  Spacer,
  Text,
  VStack,
  Actionsheet,
  useDisclose,
} from 'native-base';
import {Image as ImageReact} from 'react-native';
import React from 'react';
import {PageContainer, Header, IconSelect} from '../../components';
import {expandRightBlack, expandRightWhite, storeLogo} from '../../assets';
import {useColorMode} from 'native-base';
import {Appearance, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {getColorModeState} from '../../redux/selector';
import {updateColorMode} from '../../redux/action';
import {ThemeColor} from '../../redux/models';

const Setting = () => {
  const colorModeState = useSelector(getColorModeState);
  const dispatch = useDispatch();
  const {colorMode, setColorMode} = useColorMode();
  const {isOpen: modeDialog, onToggle: toggleModeDialog} = useDisclose();
  const {isOpen: langDialog, onToggle: toggleLangDialog} = useDisclose();
  const {t, i18n} = useTranslation();
  const isDarkMode: boolean = colorMode === 'dark';
  const modeFromSystem: string = Appearance.getColorScheme() ?? 'light';

  const getModeStatus = (): string => {
    switch (colorModeState) {
      case 'dark':
        return t('Setting.dark');
      case 'light':
        return t('Setting.light');
      case 'device':
        return t('Setting.deviceSetting');
    }
  };

  const setMode = (mode: ThemeColor) => {
    dispatch(updateColorMode(mode));
    switch (mode) {
      case 'dark':
        setColorMode(mode);
        break;
      case 'light':
        setColorMode(mode);
        break;
      case 'device':
        setColorMode(modeFromSystem);
        break;
    }
    toggleModeDialog();
  };

  const getIsSelected = (mode: ThemeColor): boolean => {
    return mode === colorModeState;
  };

  const setLang = (Lang: string) => {
    i18n.changeLanguage(Lang);
    toggleLangDialog();
  };

  return (
    <PageContainer>
      <VStack>
        <Header title={t('Setting.title')} />
        <Center pt="4">
          <VStack space="1" alignItems="center">
            <Image
              alt="logo"
              source={storeLogo}
              size={150}
              bgColor="warmGray.300"
              borderRadius="full"
            />
            <Heading>{t('Setting.nameStore')}</Heading>
          </VStack>
        </Center>

        <VStack py="8" px="4" space={2}>
          <TouchableOpacity onPress={toggleModeDialog}>
            <RowSetting
              title={t('Setting.colorMode')}
              status={getModeStatus()}
              isDarkMode={isDarkMode}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleLangDialog}>
            <RowSetting
              title={t('Setting.language')}
              status={t('Setting.languageUse')}
              isDarkMode={isDarkMode}
            />
          </TouchableOpacity>
        </VStack>
        {/* Dialog Color Mode */}
        <Actionsheet isOpen={modeDialog} onClose={toggleModeDialog}>
          <Actionsheet.Content>
            <Heading size="md">Select Mode</Heading>
            <Actionsheet.Item
              onPress={() => setMode('dark')}
              startIcon={<IconSelect selected={getIsSelected('dark')} />}>
              {t('Setting.dark')}
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => setMode('light')}
              startIcon={<IconSelect selected={getIsSelected('light')} />}>
              {t('Setting.light')}
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => setMode('device')}
              startIcon={<IconSelect selected={getIsSelected('device')} />}>
              {t('Setting.deviceSetting')}
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
        {/* Dialog Language */}
        <Actionsheet isOpen={langDialog} onClose={toggleLangDialog}>
          <Actionsheet.Content>
            <Heading size="md">Select Mode</Heading>
            <Actionsheet.Item
              onPress={() => setLang('en')}
              startIcon={<IconSelect selected={i18n.language === 'en'} />}>
              English
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => setLang('th')}
              startIcon={<IconSelect selected={i18n.language === 'th'} />}>
              ไทย
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </VStack>
    </PageContainer>
  );
};

interface RowSettingProps {
  title: string;
  status: string;
  isDarkMode: boolean;
}

const RowSetting = ({title, status, isDarkMode}: RowSettingProps) => {
  return (
    <HStack
      p="4"
      _dark={{bg: 'blueGray.800'}}
      _light={{bg: 'blue.50'}}
      alignItems="center"
      borderRadius="8">
      <Text fontSize="md">{title}</Text>
      <Spacer />
      <HStack space={2} alignItems="center">
        <Text color="gray.400">{status}</Text>
        <ImageReact
          source={isDarkMode ? expandRightWhite : expandRightBlack}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: 16, height: 16}}
        />
      </HStack>
    </HStack>
  );
};

export default Setting;
