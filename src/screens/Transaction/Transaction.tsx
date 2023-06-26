import React, {FC} from 'react';
import {Header, PageContainer} from '../../components';
import {VStack} from 'native-base';
import {useTranslation} from 'react-i18next';

const Transaction: FC = () => {
  const {t} = useTranslation();
  return (
    <PageContainer>
      <VStack flex={1}>
        <Header title={t('Transaction.title')} />
      </VStack>
    </PageContainer>
  );
};

export default Transaction;
