import {Modal, Spinner, Text, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';

interface LoadingScreenProps {
  isShow: boolean;
}
const LoadingScreen = ({isShow}: LoadingScreenProps) => {
  const {t} = useTranslation();
  return (
    <Modal isOpen={isShow}>
      <Modal.Content width="200px" height="200px" justifyContent="center">
        <VStack alignItems="center" space="2">
          <Spinner accessibilityLabel="Loading App" size="lg" />
          <Text fontSize="16"> {t('Common.loading')} ...</Text>
        </VStack>
      </Modal.Content>
    </Modal>
  );
};

export default LoadingScreen;
