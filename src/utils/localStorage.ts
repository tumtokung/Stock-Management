import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeColor} from '../redux/models';

export const KEY = {
  APP_LANGUAGE: 'APP_LANGUAGE',
  APP_COLOR_MODE: 'APP_COLOR_MODE',
};

export const setLanguageLocal = async (lang: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(KEY.APP_LANGUAGE, lang);
    return true;
  } catch (e) {
    console.log('setLanguageKey Error >> ', e);
    return false;
  }
};

export const setColorModeLocal = async (mode: ThemeColor): Promise<boolean> => {
  try {
    const modeStr: string = `${mode}`;
    await AsyncStorage.setItem(KEY.APP_COLOR_MODE, modeStr);
    return true;
  } catch (e) {
    console.log('setLanguageKey Error >> ', e);
    return false;
  }
};
