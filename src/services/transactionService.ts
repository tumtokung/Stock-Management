import firestore from '@react-native-firebase/firestore';
import {Transaction} from '../redux/models';
import {updateProductService} from './productService';

const TransactionsCollection = 'Transactions';

export const getTransactionService = async (): Promise<Transaction[]> => {
  try {
    const transactionData = await firestore()
      .collection(TransactionsCollection)
      .orderBy('createdAt', 'asc')
      .get();
    const item: any[] = [];
    console.log('transactionData firebase >>', transactionData);
    transactionData.docs.map(_data => {
      item.push({
        ..._data.data(),
      });
    });
    const transactions = item as Transaction[];
    console.log('transactions transfer >> ', transactions);
    return transactions;
  } catch (e) {
    console.log('createProduct error >> ', e);
    return [];
  }
};

export const createTransactionService = async (transaction: Transaction) => {
  try {
    await firestore().collection(TransactionsCollection).add(transaction);
    await updateProductService(transaction.product);
  } catch (e) {
    console.log('createProduct error >> ', e);
  }
};
