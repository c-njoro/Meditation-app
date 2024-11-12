export interface AffirmationCategory {
  title: string;
  data: GalleryPreviewData[];
}

export interface GalleryPreviewData {
  text: string;
  id: number;
  image: any;
}
