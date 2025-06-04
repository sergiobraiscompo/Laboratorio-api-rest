export interface Accomodation {
  id: string;
  name: string;
  image: string;
  description: string;
  address: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  reviews: {
    _id: string,
    date: Date,
    reviewerName: string,
    comment: string
  };
}
