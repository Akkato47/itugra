export interface IUpload {
  uid: string;
  name: string;
  fileUrl: string;
}

export interface IUploadResponse {
  key: string;
  name: string;
  thumbnail: {
    url: string;
    type: string;
  };
  type: string;
  uid: string;
  url: string;
}
