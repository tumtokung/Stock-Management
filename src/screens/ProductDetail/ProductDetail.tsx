import React, {FC} from 'react';
import {Header, PageContainer} from '../../components';
import {VStack} from 'native-base';

const ProductDetail: FC = () => {
  return (
    <PageContainer>
      <VStack flex={1}>
        <Header title="Product Detail" />
      </VStack>
    </PageContainer>
  );
};

export default ProductDetail;
