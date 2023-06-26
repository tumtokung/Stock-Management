import React, {FC} from 'react';
import {Header, PageContainer} from '../../components';
import {VStack} from 'native-base';
import {useTranslation} from 'react-i18next';

const Product: FC = () => {
  const {t} = useTranslation();
  return (
    <PageContainer>
      <VStack flex={1}>
        <Header title={t('Product.title')} />
      </VStack>
    </PageContainer>
  );
};

export default Product;
