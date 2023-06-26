import React, {FC} from 'react';
import {Header, PageContainer} from '../../components';
import {
  Button,
  HStack,
  Heading,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import {useTranslation} from 'react-i18next';
import {getProductState} from '../../redux/selector';
import {useSelector, useDispatch} from 'react-redux';
import {addProduct} from '../../redux/action';
import {Product} from '../../redux/models';
import uuid from 'react-native-uuid';

const Dashboard: FC = () => {
  const {t} = useTranslation();
  const products = useSelector(getProductState);
  const dispatch = useDispatch();

  const createProduct = () => {
    const id: string = uuid.v4().toString();
    const now: string = `${new Date()}`;
    const newProduct: Product = {
      id: id,
      name: 'Pen',
      quantity: 0,
      quantityMinimum: 5,
      purchasePrice: 0,
      sellingPrice: 0,
      createdAt: now,
      updatedAt: now,
    };
    dispatch(addProduct(newProduct));
  };

  return (
    <PageContainer>
      <VStack flex={1}>
        <Header title={t('Dashboard.title')}>
          <Button size="sm" onPress={createProduct}>
            add
          </Button>
        </Header>
        <ScrollView>
          <Heading p={4}>Product</Heading>

          <VStack space={2}>
            {products.map(product => {
              return (
                <HStack key={product.id}>
                  <Text fontSize="xl">{product.name}</Text>
                  <Spacer />
                  <Text>{product.id}</Text>
                </HStack>
              );
            })}
          </VStack>
        </ScrollView>
      </VStack>
    </PageContainer>
  );
};

export default Dashboard;
