import * as model from "#dals/index.js";
import { ObjectId } from "mongodb";
import * as apiModel from "./accomodation.api-model.js";

export const mapAccomodationListFromModelToApi = (
  accomodationList: model.Accomodation[]
): apiModel.Accomodation[] => accomodationList.map(mapAccomodationFromModelToApi);

// AccomodationList mapper
export const mapAccomodationFromModelToApi = (accomodation: model.Accomodation): apiModel.Accomodation => ({
  id: accomodation._id.toHexString(),
  name: accomodation.name,
  images: accomodation.images,
  description: accomodation.description,
  address: accomodation.address,
  bedrooms: accomodation.bedrooms,
  beds: accomodation.beds,
  bathrooms: accomodation.bathrooms,
  reviews: accomodation.reviews
});

// Accomodation mappers
export const mapAccomodationFromApiToModel = (accomodation: apiModel.Accomodation): model.Accomodation => ({
  _id: new ObjectId(accomodation.id),
  name: accomodation.name,
  images: accomodation.images,
  description: accomodation.description,
  address: accomodation.address,
  bedrooms: accomodation.bedrooms,
  beds: accomodation.beds,
  bathrooms: accomodation.bathrooms,
  reviews: accomodation.reviews
});

// Review Mappers
export const mapReviewFromModelToApi = (review: model.Review): apiModel.Review => ({
  _id: review._id.toHexString(),
  listing_id: String(review.listing_id),
  reviewer_id: String(review.reviewer_id),
  reviewer_name: review.reviewer_name,
  comments: review.comments,
})

export const mapReviewFromApiToModel = (review: apiModel.Review): model.Review => ({
  _id: new ObjectId(review._id),
  listing_id: Number(review.listing_id),
  reviewer_id: Number(review.reviewer_id),
  reviewer_name: review.reviewer_name,
  comments: review.comments,
})
