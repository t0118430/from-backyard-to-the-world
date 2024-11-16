import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export default async function uploadImageToFirebase(originalFileName: string, imageBuffer: Buffer): Promise<string> {
  try {
    // Generate a unique file name
    const fileExtension = originalFileName.split('.').pop() || 'webp';
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;

    // Get a reference to Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, `images/${uniqueFileName}`);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, imageBuffer);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Image upload failed.");
  }
}
