import { BlobServiceClient } from "@azure/storage-blob";
import fs from "fs";
import mime from "mime-types"; 

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

class UploadService {
  constructor() {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    this.containerClient = this.blobServiceClient.getContainerClient(containerName);
  }

  async uploadFile(file) {

    const uploadPath = path.join('src', 'server', 'uploads', 'image');

    if (!fs.existsSync(uploadPath)) {

      console.log("The directory doestn exist")

      fs.mkdirSync(uploadPath, { recursive: true });

    }

    if (!file) {
      throw new Error("No file received.");
    }

    

    const filePath = file.path;
    const fileName = file.originalname;

    const mimeType = mime.lookup(fileName);

    if (!mimeType) {
      throw new Error("Unable to detect MIME type.");
    }

    const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
    const fileBuffer = fs.readFileSync(filePath);

    await blockBlobClient.upload(fileBuffer, fileBuffer.length, {
      blobHTTPHeaders: {
        blobContentType: mimeType, 
      },
    });
    
    return blockBlobClient.url;
    
  }
}

export default new UploadService();
