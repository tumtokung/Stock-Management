import React, {FC} from 'react';
import {Header, PageContainer} from '../../components';
import {Center, HStack, Heading, ScrollView, Text, VStack} from 'native-base';
import {useTranslation} from 'react-i18next';
import {getProductState, getTransactionState} from '../../redux/selector';
import {useSelector} from 'react-redux';
import {TransactionType} from '../../redux/models';

const Dashboard: FC = () => {
  const {t} = useTranslation();
  const products = useSelector(getProductState);
  const transactions = useSelector(getTransactionState);
  const totalPiece: number = products.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );
  const buyTransactions = transactions.filter(
    trans => trans.type === TransactionType.Buy,
  );
  const purchase: number = buyTransactions.reduce(
    (sum, trans) => sum + trans.product.sellingPrice * trans.quantity,
    0,
  );
  const saleTransactions = transactions.filter(
    trans => trans.type === TransactionType.Sell,
  );
  const sales: number = saleTransactions.reduce(
    (sum, trans) => sum + trans.product.sellingPrice * trans.quantity,
    0,
  );

  interface StatBoxProps {
    title: string;
    value: number;
    unit: string;
    color?: string;
  }

  const StatBox = ({title, value, unit, color}: StatBoxProps) => (
    <Center
      _dark={{bg: 'blueGray.800'}}
      _light={{bg: 'white'}}
      width={160}
      height={160}
      borderRadius={20}>
      <VStack space="2" alignItems="center">
        <Text fontSize="xl"> {title} </Text>
        <Heading fontSize="2xl" color={color}>
          {value}
        </Heading>
        <Text fontSize="xl"> {unit} </Text>
      </VStack>
    </Center>
  );

  return (
    <PageContainer>
      <VStack flex={1}>
        <Header title={t('Dashboard.title')} />
        <ScrollView>
          <VStack pt={4} space={4} alignItems="center">
            <HStack space="4">
              <StatBox
                title={t('Dashboard.product')}
                value={products.length}
                unit={t('Product.type')}
              />
              <StatBox
                title={t('Dashboard.totalProduct')}
                value={totalPiece}
                unit={t('Product.pieces')}
              />
            </HStack>
            <HStack space="4">
              <StatBox
                title={t('Dashboard.totalPurchase')}
                value={purchase}
                unit={t('Product.bath')}
                color="red.500"
              />
              <StatBox
                title={t('Dashboard.totalSale')}
                value={sales}
                unit={t('Product.bath')}
                color="green.500"
              />
            </HStack>
          </VStack>
        </ScrollView>
      </VStack>
    </PageContainer>
  );
};

export default Dashboard;
