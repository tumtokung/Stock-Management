import storage from '@react-native-firebase/storage';

export const uploadFileStorage = async (
  fileUri: string,
  folder: string,
  fileName: string,
): Promise<string> => {
  try {
    const uriImage: Response = await fetch(fileUri);
    const blob: Blob = await uriImage.blob();
    var ref = await storage().ref(folder).child(fileName).put(blob);
    const uri = await storage().ref(ref.metadata.fullPath).getDownloadURL();
    return uri;
  } catch (error) {
    console.log('error uploadFileStorage >>', error);
    return 'error';
  }
};

export const deleteFileStorage = async (imgURL: string) => {
  try {
    const imageRef = storage().refFromURL(imgURL);
    await imageRef.delete();
  } catch (error) {
    console.log('error deleteFileStorage >>', error);
  }
};
