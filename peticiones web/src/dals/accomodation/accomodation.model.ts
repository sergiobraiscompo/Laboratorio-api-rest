import { ObjectId } from "mongodb";

export interface Review {
  _id: ObjectId;
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
  reviews: [{}];
}
