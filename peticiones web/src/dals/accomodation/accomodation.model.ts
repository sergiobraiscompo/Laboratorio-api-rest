export interface Review {
  _id: string;
  reviewerName: string
  comments: string
}

export interface Accomodation {
  _id: string;
  name: string;
  images: string;
  description: string;
  address: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  reviews: [{}];
}
