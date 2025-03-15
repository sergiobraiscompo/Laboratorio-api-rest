import { ObjectId } from "mongodb";

interface review {
    _id: ObjectId,
    date: Date,
    reviewerName: string,
    comment: string
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
   reviews: review[] 
}
