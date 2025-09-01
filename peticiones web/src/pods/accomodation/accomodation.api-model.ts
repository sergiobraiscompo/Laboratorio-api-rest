export type Review = {
  _id: string;
  date: Date
  listing_id: string;
  reviewer_id: string;
  reviewer_name: string;
  comments: string;
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
  reviews: Review[];
}

