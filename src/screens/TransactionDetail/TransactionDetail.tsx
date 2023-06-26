import React, {FC} from 'react';
import {Header, PageContainer} from '../../components';
import {VStack} from 'native-base';

const TransactionDetail: FC = () => {
  return (
    <PageContainer>
      <VStack flex={1}>
        <Header title="Transaction Detail" />
      </VStack>
    </PageContainer>
  );
};

export default TransactionDetail;
