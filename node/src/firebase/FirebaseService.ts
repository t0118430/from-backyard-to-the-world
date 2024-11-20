import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../firebase/config';

export default async function uploadImageToFirebase(filePath: string, file: Buffer): Promise<string> {
    console.log("Started uploadImageToFirebase");
    try {
        const fileName = `${uuidv4()}-${filePath}`;
        const destination = `images/${fileName}`;
    
        const storageRef = ref(storage, destination);
    
        await uploadBytes(storageRef, file);
    
        const downloadUrl = await getDownloadURL(storageRef);
    
        return downloadUrl;
      } catch (error) {
        console.error('Firebase Storage Error:', error);
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);
      }
}