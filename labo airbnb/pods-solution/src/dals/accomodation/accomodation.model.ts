import { ObjectId } from 'mongodb';

export interface Review {
  _id: ObjectId,
  date: Date,
  reviewerName: String,
  comment: String
}

export interface Accomodation {
  _id: ObjectId;
  name: string;
  image: string;
  description: string;
  address: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  reviews: Review[];
}
