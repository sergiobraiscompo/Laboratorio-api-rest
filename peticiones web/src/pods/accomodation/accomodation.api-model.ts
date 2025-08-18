export interface Review {
  id: string;
  reviewerName: string;
  comment: string;
}


export interface Accomodation {
  id: string;
  name: string;
  images: string;
  description: string;
  address: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  reviews: [{}];
}

