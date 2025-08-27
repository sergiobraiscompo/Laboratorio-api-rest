import { ObjectId } from "mongodb";

export type Review = {
  _id: Number;
  date: Date;
  listing_id: Number;
  reviewer_id: Number;
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
