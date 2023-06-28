/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {Header, LoadingScreen, PageContainer} from '../../components';
import {
  Button,
  Center,
  Divider,
  HStack,
  Image,
  Modal,
  Spacer,
  Text,
  VStack,
  useColorMode,
} from 'native-base';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {getProductState} from '../../redux/selector';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import {
  ListRenderItemInfo,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {deleteProduct} from '../../redux/action';
import {addBlack, addWhite, deleteWhite} from '../../assets';
import {Image as ImageReact} from 'react-native';
import {Product as ProductModel} from '../../redux/models';
import {useModal} from '../../hooks';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../../models';
import {
  AppStackParamList,
  ProductDetailProp,
  ScreenType,
} from '../../navigation/AppStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {deleteProductService} from '../../services/productService';

type ProductDetailRouteProp = NativeStackNavigationProp<
  AppStackParamList,
  Screens.ProductDetail
>;

const Product: FC = () => {
  const {t} = useTranslation();
  const products = useSelector(getProductState);
  const {colorMode} = useColorMode();
  const {modal, toggleModal} = useModal();
  const navigation = useNavigation<ProductDetailRouteProp>();
  const isDarkMode: boolean = colorMode === 'dark';
  const dispatch = useDispatch();
  // const [search, setSearch] = useState<string>('');
  const [loadDelete, setLoadDelete] = useState<boolean>(false);

  const navigateCreate = () => {
    const props: ProductDetailProp = {
      product: undefined,
      screenType: ScreenType.Create,
    };
    navigation.push(Screens.ProductDetail, props);
  };

  const navigateRead = (product: ProductModel) => {
    const props: ProductDetailProp = {
      product: product,
      screenType: ScreenType.Read,
    };
    navigation.push(Screens.ProductDetail, props);
  };

  const handleDelete = async (product: ProductModel) => {
    setLoadDelete(true);
    await deleteProductService(product);
    dispatch(deleteProduct(product.id));
    toggleModal();
    setLoadDelete(false);
  };
  interface RenderProductProps {
    item: ProductModel;
  }
  const RenderProduct = ({item}: RenderProductProps) => {
    const product: ProductModel = item;
    return (
      <TouchableHighlight onPress={() => navigateRead(product)}>
        <HStack
          _dark={{bg: 'blueGray.800'}}
          _light={{bg: 'white'}}
          alignItems="center"
          px={4}
          height={16}
          space="4">
          <Image
            alt={product.name}
            source={{uri: product.img}}
            size={12}
            borderRadius={10}
            bgColor="gray.500"
          />
          <VStack display="flex" alignItems="flex-start">
            <Text fontSize="lg">{product.name}</Text>
            <Text fontSize="sm">
              {t('Product.quantity')} : {product.quantity} {t('Product.pieces')}
            </Text>
          </VStack>
          <Spacer />
          <Text fontSize="sm">
            {product.sellingPrice} {t('Product.bath')}
          </Text>
        </HStack>
      </TouchableHighlight>
    );
  };

  const RenderHiddenItem = (
    data: ListRenderItemInfo<ProductModel>,
    rowMap: RowMap<ProductModel>,
  ) => {
    const product: ProductModel = data.item;
    return (
      <HStack>
        <Spacer />
        <TouchableOpacity
          onPress={() => {
            rowMap[product.id].closeRow();
            toggleModal();
          }}>
          <Center width={70} height={16} bgColor="red.700">
            <Image alt="delete" source={deleteWhite} size={8} />
          </Center>
        </TouchableOpacity>
        {/* Modal Delete */}
        <Modal isOpen={modal} onClose={toggleModal}>
          <Modal.Content>
            <Modal.Header>{product.name}</Modal.Header>
            <Modal.CloseButton />
            <Modal.Body>
              <Text>{t('Product.deleteDes')}</Text>
            </Modal.Body>
            <Modal.Footer>
              <HStack space={2}>
                <Button bgColor="gray.500" onPress={toggleModal}>
                  {t('Product.cancel')}
                </Button>
                <Button bgColor="red.700" onPress={() => handleDelete(product)}>
                  {t('Product.delete')}
                </Button>
              </HStack>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </HStack>
    );
  };

  const EmptyComponent = () => {
    return (
      <Center>
        <VStack space={2} alignItems="center">
          <Text fontSize="lg"> {t('Product.noProduct')} </Text>
          <Button
            onPress={navigateCreate}
            leftIcon={
              <ImageReact source={addWhite} style={{width: 20, height: 20}} />
            }>
            {t('Product.createProduct')}
          </Button>
        </VStack>
      </Center>
    );
  };

  return (
    <PageContainer>
      <VStack flex={1}>
        <Header title={t('Product.title')}>
          <TouchableOpacity onPress={navigateCreate}>
            <ImageReact
              source={isDarkMode ? addWhite : addBlack}
              style={{width: 28, height: 28}}
            />
          </TouchableOpacity>
        </Header>
        {/* body */}
        <SwipeListView
          style={{marginTop: 4}}
          useFlatList={true}
          data={products}
          keyExtractor={product => product.id}
          renderItem={RenderProduct}
          renderHiddenItem={RenderHiddenItem}
          ListEmptyComponent={EmptyComponent}
          disableRightSwipe
          stopRightSwipe={-70}
          rightOpenValue={-70}
          ItemSeparatorComponent={() => (
            <Divider color="black" _dark={{color: 'white'}} />
          )}
          scrollEnabled={true}
        />
      </VStack>
      <LoadingScreen isShow={loadDelete} />
    </PageContainer>
  );
};

export default Product;
