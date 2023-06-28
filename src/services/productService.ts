import firestore from '@react-native-firebase/firestore';
import {Product} from '../redux/models';
import {DocumentPickerResponse} from 'react-native-document-picker';
import {deleteFileStorage, uploadFileStorage} from './fileStorageService';
import uuid from 'react-native-uuid';

const ProductsCollection = 'Products';

export const getProductService = async (): Promise<Product[]> => {
  try {
    const productsData = await firestore().collection(ProductsCollection).get();
    const item: any[] = [];
    console.log('products firebase >>', productsData);
    productsData.docs.map(_data => {
      item.push({
        ..._data.data(),
        id: _data.id,
      });
    });
    const products = item as Product[];
    console.log('products trans >> ', products);
    return products;
  } catch (e) {
    console.log('createProduct error >> ', e);
    return [];
  }
};

export const createProductService = async (
  product: Product,
  imageFile: DocumentPickerResponse,
): Promise<Product> => {
  try {
    const fileUri: string = imageFile.fileCopyUri ?? '';
    const fileName: string = uuid.v4().toString() + (imageFile.name ?? '');
    const img = await uploadFileStorage(fileUri, ProductsCollection, fileName);
    const newProduct: Product = {...product, img: img};
    const productResponse = await firestore()
      .collection(ProductsCollection)
      .add(newProduct);
    const productWithDocId: Product = {...newProduct, id: productResponse.id};
    return productWithDocId;
  } catch (e) {
    console.log('createProduct error >> ', e);
    return product;
  }
};

export const updateProductService = async (
  product: Product,
  imageFile?: DocumentPickerResponse,
): Promise<Product> => {
  try {
    // if edit image
    if (imageFile) {
      // delete old image
      await deleteFileStorage(product.img);
      // add new image
      const fileUri: string = imageFile.fileCopyUri ?? '';
      const fileName: string = uuid.v4().toString() + (imageFile.name ?? '');
      const img = await uploadFileStorage(
        fileUri,
        ProductsCollection,
        fileName,
      );
      const newProduct: Product = {...product, img: img};
      await firestore()
        .collection(ProductsCollection)
        .doc(product.id)
        .set(newProduct);
      return newProduct;
    } else {
      await firestore()
        .collection(ProductsCollection)
        .doc(product.id)
        .set(product);
      return product;
    }
  } catch (e) {
    console.log('createProduct error >> ', e);
    return product;
  }
};

export const deleteProductService = async (product: Product) => {
  try {
    await deleteFileStorage(product.img);
    await firestore().collection(ProductsCollection).doc(product.id).delete();
  } catch (e) {
    console.log('createProduct error >> ', e);
  }
};
