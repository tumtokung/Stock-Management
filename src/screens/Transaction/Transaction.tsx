import React, {FC} from 'react';
import {Header, PageContainer} from '../../components';
import {
  Center,
  Divider,
  FlatList,
  HStack,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import {useTranslation} from 'react-i18next';
import {
  Transaction as TransactionModel,
  TransactionType,
} from '../../redux/models';
import {useSelector} from 'react-redux';
import {getTransactionState} from '../../redux/selector';

const Transaction: FC = () => {
  const {t} = useTranslation();
  const transactionState = useSelector(getTransactionState);

  interface TransactionRowProps {
    item: TransactionModel;
  }
  const TransactionRow = ({item}: TransactionRowProps) => {
    const isBuy: boolean = item.type === TransactionType.Buy;
    const price = isBuy
      ? item.product.purchasePrice
      : item.product.sellingPrice;
    const totalPrice: number = item.quantity * price;
    const totalDisplay: number = isBuy ? -totalPrice : totalPrice;
    const date: Date = new Date(item.createdAt);
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();
    const hour: number = date.getHours();
    const minute: number = date.getMinutes();

    return (
      <HStack
        _dark={{bg: 'blueGray.800'}}
        _light={{bg: 'white'}}
        alignItems="center"
        px={4}
        height={16}
        space="4">
        <VStack display="flex" alignItems="flex-start">
          <Text fontSize="lg">
            {isBuy ? t('Transaction.buy') : t('Transaction.sell')}{' '}
            {item.product.name} {item.quantity} {t('Product.pieces')}
          </Text>
          <Text fontSize="md">{`${day}/${month}/${year} ${hour}:${minute}`}</Text>
        </VStack>
        <Spacer />
        <Text fontSize="xl" color={isBuy ? 'red.500' : 'green.500'}>
          {totalDisplay} {t('Product.bath')}
        </Text>
      </HStack>
    );
  };

  const EmptyTransaction = () => {
    return (
      <Center>
        <Text fontSize="xl"> No Transaction </Text>
      </Center>
    );
  };

  return (
    <PageContainer>
      <VStack flex={1}>
        <Header title={t('Transaction.title')} />
        <FlatList
          mt={1}
          data={transactionState}
          keyExtractor={(item, _) => item.id}
          renderItem={TransactionRow}
          ListEmptyComponent={<EmptyTransaction />}
          ItemSeparatorComponent={() => (
            <Divider color="black" _dark={{color: 'white'}} />
          )}
          scrollEnabled={true}
        />
      </VStack>
    </PageContainer>
  );
};

export default Transaction;
