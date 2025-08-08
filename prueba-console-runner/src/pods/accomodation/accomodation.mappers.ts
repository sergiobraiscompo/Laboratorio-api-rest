import * as model from "#dals/index.js";
import { ObjectId } from "mongodb";
import * as apiModel from "./accomodation.api-model.js";
// import { accomodationApi } from "./accomodation.rest-api.js";

export const mapAccomodationFromModelToApi = (accomodation: model.Accomodation): apiModel.Accomodation => ({
  id: accomodation._id.toHexString(),
  name: accomodation.name,
  image: accomodation.image,
  description: accomodation.description,
  address: accomodation.address,
  bedrooms: accomodation.bedrooms,
  beds: accomodation.beds,
  bathrooms: accomodation.bathrooms,
  reviews: accomodation.reviews
});

export const mapAccomodationListFromModelToApi = (
  accomodationList: model.Accomodation[]
): apiModel.Accomodation[] => accomodationList.map(mapAccomodationFromModelToApi);

export const mapAccomodationFromApiToModel = (accomodation: apiModel.Accomodation): model.Accomodation => ({
  _id: new ObjectId(),
  name: accomodation.name,
  image: accomodation.image,
  description: accomodation.description,
  address: accomodation.address,
  bedrooms: accomodation.bedrooms,
  beds: accomodation.beds,
  bathrooms: accomodation.bathrooms,
  reviews: () => {mapReviews(accomodation.reviews)};
});

const mapReviews = (reviews: review[]): review[] => {
  const reviewsSorted = reviews.sort((a, b) => (a.date < b.date ? -1 : 1));
  const fiveLastReviews = reviewsSorted.slice(0, 4);
  const listReviews: review[] = fiveLastReviews.map(review => review.,
     date: Date,
     reviewerName: string,
     comment: string[])

  return listReviews;
}