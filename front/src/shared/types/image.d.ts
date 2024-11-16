interface IImage {
  name: string;
  uid: string;
  fileUrl: string;
  thumbnailUrl: string;
}

interface IFile {
  category: "DIP" | "PORTFOLIO" | "RESUME";
  file: TFile;
  uid: string;
}

type TFile = Omit<IImage, "thumbnailUrl">;
