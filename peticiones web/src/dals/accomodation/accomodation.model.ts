import { ObjectId } from "mongodb";

export interface Review {
  _id: ObjectId;
  reviewerName: string;
  comment: string;
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
