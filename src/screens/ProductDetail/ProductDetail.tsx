/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useRef} from 'react';
import {Header, LoadingScreen, PageContainer} from '../../components';
import {
  Button,
  Center,
  FormControl,
  HStack,
  Input,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Text,
  VStack,
  View,
  useColorMode,
} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  AppRouteProps,
  AppStackParamList,
  ProductDetailProp,
  ScreenType,
} from '../../navigation/AppStackParamList';
import {Screens} from '../../models';
import {
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  deleteBlack,
  deleteWhite,
  doneBlack,
  doneWhite,
  editBlack,
  editWhite,
  imgBlack,
  imgWhite,
} from '../../assets';
import DocumentPicker, {
  DocumentPickerResponse,
  types,
} from 'react-native-document-picker';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';
import {Product, Transaction, TransactionType} from '../../redux/models';
import {
  addProduct,
  addTransaction,
  deleteProduct,
  updateProduct,
} from '../../redux/action';
import {
  InputForm,
  getIsInValid,
  setIsInvalid,
  setValueInput,
} from '../../models/InputForm';
import {useModal} from '../../hooks';
import {
  createProductService,
  deleteProductService,
  updateProductService,
} from '../../services/productService';
import {createTransactionService} from '../../services/transactionService';
import {useTranslation} from 'react-i18next';

type ProductDetailRouteProp = NativeStackNavigationProp<
  AppStackParamList,
  Screens.ProductDetail
>;

enum ProductActionType {
  Save = 'Save',
  Edit = 'Edit',
  Delete = 'Delete',
}
interface ProductAction {
  icon: any;
  type: ProductActionType;
}

const ProductDetail: FC = () => {
  const {t} = useTranslation();
  const {product, screenType} =
    useRoute<AppRouteProps<Screens.ProductDetail>>().params;
  const {colorMode} = useColorMode();
  const dispatch = useDispatch();
  const navigation = useNavigation<ProductDetailRouteProp>();
  const purchaseRef = useRef<TextInput>();
  const sellingRef = useRef<TextInput>();
  const {modal, toggleModal} = useModal();
  const {modal: modalTrans, toggleModal: toggleModalTrans} = useModal();
  const [imagePicker, setImagePicker] = useState<DocumentPickerResponse | null>(
    null,
  );
  const [name, setName] = useState<InputForm>({
    value: product?.name ?? '',
    isInvalid: false,
  });
  const [purchasePrice, setPurchasePrice] = useState<InputForm>({
    value: `${product?.purchasePrice ?? ''}`,
    isInvalid: false,
  });
  const [sellingPrice, setSellingPrice] = useState<InputForm>({
    value: `${product?.sellingPrice ?? ''}`,
    isInvalid: false,
  });
  const [select, setSelect] = useState<TransactionType>(TransactionType.Buy);
  const [quantity, setQuantity] = useState<string>('');
  const [loadSave, setLoadSave] = useState<boolean>(false);
  const isDarkMode = colorMode === 'dark';
  const imgUri: string = product?.img ?? '';

  const getTitle = (): string => {
    switch (screenType) {
      case ScreenType.Read:
        return t('Product.productDetail');
      case ScreenType.Create:
        return t('Product.createProduct');
      case ScreenType.Edit:
        return t('Product.editProduct');
    }
  };

  const getActionItems = (): ProductAction[] => {
    switch (screenType) {
      case ScreenType.Read:
        return [
          {
            icon: isDarkMode ? editWhite : editBlack,
            type: ProductActionType.Edit,
          },
          {
            icon: isDarkMode ? deleteWhite : deleteBlack,
            type: ProductActionType.Delete,
          },
        ];
      case ScreenType.Create:
        return [
          {
            icon: isDarkMode ? doneWhite : doneBlack,
            type: ProductActionType.Save,
          },
        ];
      case ScreenType.Edit:
        return [
          {
            icon: isDarkMode ? doneWhite : doneBlack,
            type: ProductActionType.Save,
          },
        ];
    }
  };

  const createProduct = async () => {
    setLoadSave(true);
    const id: string = uuid.v4().toString();
    const now: string = `${new Date()}`;
    const newProduct: Product = {
      id: id,
      name: name.value,
      img: imagePicker?.fileCopyUri ?? '',
      quantity: 0,
      purchasePrice: parseInt(purchasePrice.value),
      sellingPrice: parseInt(sellingPrice.value),
      createdAt: now,
      updatedAt: now,
    };
    if (imagePicker) {
      const productWithImgLink = await createProductService(
        newProduct,
        imagePicker,
      );
      dispatch(addProduct(productWithImgLink));
    }
    setLoadSave(false);
  };

  const editProduct = async () => {
    setLoadSave(true);
    if (product) {
      const now: string = `${new Date()}`;
      const newProduct: Product = {
        ...product,
        name: name.value,
        purchasePrice: parseInt(purchasePrice.value),
        sellingPrice: parseInt(sellingPrice.value),
        updatedAt: now,
      };
      if (imagePicker) {
        const productWithImgLink = await updateProductService(
          newProduct,
          imagePicker,
        );
        dispatch(updateProduct(productWithImgLink));
      } else {
        const productResponse = await updateProductService(newProduct);
        dispatch(updateProduct(productResponse));
      }
    }
    setLoadSave(false);
  };

  const handleDeleteProduct = async () => {
    if (product) {
      setLoadSave(true);
      await deleteProductService(product);
      dispatch(deleteProduct(product.id));
      toggleModal();
      setLoadSave(false);
    }
    navigation.navigate(Screens.Product);
  };

  const navigateEdit = () => {
    const props: ProductDetailProp = {
      product: product,
      screenType: ScreenType.Edit,
    };
    navigation.push(Screens.ProductDetail, props);
  };

  const handleSave = async () => {
    Keyboard.dismiss();
    // validate save
    if (
      getIsInValid(name) ||
      getIsInValid(purchasePrice) ||
      getIsInValid(sellingPrice)
    ) {
      setName(setIsInvalid(name, getIsInValid(name)));
      setPurchasePrice(
        setIsInvalid(purchasePrice, getIsInValid(purchasePrice)),
      );
      setSellingPrice(setIsInvalid(sellingPrice, getIsInValid(sellingPrice)));
      return;
    }

    if (screenType === ScreenType.Create) {
      await createProduct();
    } else if (screenType === ScreenType.Edit) {
      await editProduct();
    }
    navigation.navigate(Screens.Product);
  };

  const handleAction = async (type: ProductActionType) => {
    switch (type) {
      case ProductActionType.Save:
        await handleSave();
        break;
      case ProductActionType.Edit:
        navigateEdit();
        break;
      case ProductActionType.Delete:
        toggleModal();
        break;
    }
  };

  const handlePickerImage = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        type: types.images,
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      setImagePicker(pickerResult);
      console.log(pickerResult);
    } catch (e) {
      console.log(e);
    }
  };

  const handleQuantity = (text: string) => {
    const num: number = parseInt(text);
    const total: number = product?.quantity ?? 0;
    if (num > total && select === TransactionType.Sell) {
      setQuantity(`${total}`);
    } else {
      setQuantity(text);
    }
  };

  const getDisableTrans = (): boolean => {
    const num: number = parseInt(quantity);
    return !(quantity.length > 0 && num > 0);
  };

  const createTransaction = async () => {
    if (product) {
      setLoadSave(true);
      const id: string = uuid.v4().toString();
      const now: string = `${new Date()}`;
      const num: number = parseInt(quantity);
      const realQuantity: number = select === TransactionType.Buy ? num : -num;
      const balance: number = (product?.quantity ?? 0) + realQuantity;
      const newTransaction: Transaction = {
        id: id,
        product: {
          ...product,
          quantity: balance,
          updatedAt: now,
        },
        type: select,
        quantity: parseInt(quantity),
        createdAt: now,
      };
      toggleModalTrans();
      await createTransactionService(newTransaction);
      dispatch(addTransaction(newTransaction));
      navigation.navigate(Screens.Product);
      setLoadSave(false);
    }
  };

  const ActionList = () => (
    <HStack space="1">
      {getActionItems().map(item => {
        return (
          <TouchableOpacity
            key={item.type}
            onPress={() => handleAction(item.type)}>
            <Image source={item.icon} style={{width: 28, height: 28}} />
          </TouchableOpacity>
        );
      })}
    </HStack>
  );

  const ImagePreview = () => (
    <View>
      {imagePicker ? (
        <Center>
          <Pressable
            onPress={handlePickerImage}
            disabled={screenType === ScreenType.Read}>
            <Image
              source={{uri: imagePicker.fileCopyUri ?? ''}}
              style={{
                width: 160,
                height: 160,
                borderRadius: 10,
              }}
            />
          </Pressable>
        </Center>
      ) : (
        <Center>
          <Pressable
            onPress={handlePickerImage}
            disabled={screenType === ScreenType.Read}>
            {imgUri.length > 0 ? (
              <Image
                source={{uri: imgUri}}
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: 10,
                }}
              />
            ) : (
              <Center
                _dark={{borderColor: 'white'}}
                width={160}
                height={160}
                borderWidth={1}
                borderRadius={10}>
                <Image
                  source={isDarkMode ? imgWhite : imgBlack}
                  style={{width: 100, height: 100}}
                />
              </Center>
            )}
          </Pressable>
        </Center>
      )}
    </View>
  );

  const ModalDelete = () => (
    <Modal isOpen={modal} onClose={toggleModal}>
      <Modal.Content>
        <Modal.Header>{product?.name}</Modal.Header>
        <Modal.CloseButton />
        <Modal.Body>
          <Text>{t('Product.deleteDes')}</Text>
        </Modal.Body>
        <Modal.Footer>
          <HStack space={2}>
            <Button bgColor="gray.500" onPress={toggleModal}>
              {t('Product.cancel')}
            </Button>
            <Button bgColor="red.700" onPress={handleDeleteProduct}>
              {t('Product.delete')}
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );

  interface DetailRowProps {
    title: string;
    value: string;
    unit: string;
  }
  const DetailRow = ({title, value, unit}: DetailRowProps) => (
    <HStack space="4" alignItems="center">
      <Text fontSize="lg">{title}</Text>
      <Text fontSize="md">{value}</Text>
      <Text fontSize="md">{unit}</Text>
    </HStack>
  );

  const ProductDetailView = () => (
    <VStack space="4">
      <DetailRow
        title={`${t('Product.name')} :`}
        value={product?.name ?? ''}
        unit={''}
      />
      <DetailRow
        title={`${t('Product.quantity')} :`}
        value={`${product?.quantity}`}
        unit={t('Product.pieces')}
      />
      <DetailRow
        title={`${t('Product.purchasePrice')} :`}
        value={`${product?.purchasePrice}`}
        unit={t('Product.bath')}
      />
      <DetailRow
        title={`${t('Product.sellingPrice')} :`}
        value={`${product?.sellingPrice}`}
        unit={t('Product.bath')}
      />

      <Center>
        <HStack space="2">
          <Button
            width="100"
            onPress={() => {
              setSelect(TransactionType.Buy);
              toggleModalTrans();
            }}>
            {t('Transaction.buy')}
          </Button>
          <Button
            bgColor="red.500"
            width="100"
            onPress={() => {
              setSelect(TransactionType.Sell);
              toggleModalTrans();
            }}>
            {t('Transaction.sell')}
          </Button>
        </HStack>
      </Center>
    </VStack>
  );

  return (
    <PageContainer>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <VStack flex={1}>
          <Header title={getTitle()} isShowBack>
            <ActionList />
          </Header>
          {/* body */}

          <VStack pt={4} px={4} space="4">
            <ImagePreview />
            {/* Detail and Form */}
            {screenType === ScreenType.Read ? (
              <ProductDetailView />
            ) : (
              // Form Create and Edit
              <KeyboardAvoidingView>
                <FormControl isRequired>
                  <FormControl.Label>Product name</FormControl.Label>
                  <Input
                    borderColor="gray.500"
                    placeholder="Name"
                    value={name.value}
                    isInvalid={name.isInvalid}
                    onChangeText={text => setName(setValueInput(name, text))}
                    onSubmitEditing={() => purchaseRef.current?.focus()}
                  />
                  <FormControl.Label>Purchase Price</FormControl.Label>
                  <Input
                    ref={purchaseRef}
                    borderColor="gray.500"
                    placeholder="Bath"
                    value={purchasePrice.value}
                    isInvalid={purchasePrice.isInvalid}
                    onChangeText={text =>
                      setPurchasePrice(setValueInput(purchasePrice, text))
                    }
                    keyboardType="numeric"
                    onSubmitEditing={() => sellingRef.current?.focus()}
                  />
                  <FormControl.Label>Selling Price</FormControl.Label>
                  <Input
                    ref={sellingRef}
                    borderColor="gray.500"
                    placeholder="Bath"
                    value={sellingPrice.value}
                    isInvalid={sellingPrice.isInvalid}
                    onChangeText={text =>
                      setSellingPrice(setValueInput(sellingPrice, text))
                    }
                    keyboardType="numeric"
                    onSubmitEditing={() => handleAction(ProductActionType.Save)}
                  />
                </FormControl>
              </KeyboardAvoidingView>
            )}
          </VStack>
        </VStack>
      </TouchableWithoutFeedback>
      <ModalDelete />
      {/* <ModalCreateTransaction /> */}
      <Modal isOpen={modalTrans} onClose={toggleModalTrans}>
        <Modal.Content>
          <Modal.Header>
            {select === TransactionType.Buy
              ? t('Transaction.buy')
              : t('Transaction.sell')}
          </Modal.Header>
          <Modal.CloseButton />
          <Modal.Body>
            <VStack space="2">
              <Text fontSize="md">
                {t('Product.quantity')}{' '}
                <Text color="red.400" fontSize="sm">
                  {select === TransactionType.Sell &&
                    `(max ${product?.quantity})`}
                </Text>
              </Text>
              <Input
                keyboardType="number-pad"
                borderColor="gray.500"
                placeholder={t('Product.quantity')}
                minWidth="200"
                value={quantity}
                onChangeText={handleQuantity}
              />
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button
              bgColor="green.500"
              onPress={createTransaction}
              isDisabled={getDisableTrans()}
              width="80px">
              {t('Product.create')}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <LoadingScreen isShow={loadSave} />
    </PageContainer>
  );
};

export default ProductDetail;
