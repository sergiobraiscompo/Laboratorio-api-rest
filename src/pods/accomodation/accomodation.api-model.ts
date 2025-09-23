export type Review = {
  _id: number;
  date: Date
  listing_id: number;
  reviewer_id: number;
  reviewer_name: string;
  comments: string;
}

export interface Accomodation {
  _id: string;
  name: string;
  images: object;
  description: string;
  address: object;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  reviews: Review[];
}

