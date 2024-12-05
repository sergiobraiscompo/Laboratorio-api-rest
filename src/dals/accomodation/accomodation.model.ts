import { ObjectId } from "mongodb";

export interface Accomodation {
  _id: ObjectId;
  name: string;
  image: string;
  description: string;
  address: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  // reviews: [{
  //   _id: ObjectId,
  //   date: Date,
  //   reviewerName: string,
  //   comment: string
  // }];
}
