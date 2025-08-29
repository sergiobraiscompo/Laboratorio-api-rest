import { ObjectId } from "mongodb";

export type Review = {
  _id: number;
  date: Date;
  listing_id: number;
  reviewer_id: number;
  reviewer_name: string;
  comments: string;
}

export interface Accomodation {
  _id: ObjectId;
  name: string;
  images: string;
  description: string;
  address: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  reviews: Review[];
}
