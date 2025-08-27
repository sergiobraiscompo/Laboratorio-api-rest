import * as model from "#dals/index.js";
import { ObjectId } from "mongodb";
import * as apiModel from "./accomodation.api-model.js";

// AccomodationList mapper
export const mapAccomodationListFromModelToApi = (
  accomodationList: model.Accomodation[]
): apiModel.Accomodation[] => accomodationList.map(mapAccomodationFromModelToApi);

// Accomodation mappers
export const mapAccomodationFromModelToApi = (accomodation: model.Accomodation): apiModel.Accomodation => ({
  id: accomodation._id.toHexString(),
  name: accomodation.name,
  images: accomodation.images,
  description: accomodation.description,
  address: accomodation.address,
  bedrooms: accomodation.bedrooms,
  beds: accomodation.beds,
  bathrooms: accomodation.bathrooms,
  reviews: mapReviewFromModelToApi(accomodation.reviews).
});

export const mapAccomodationFromApiToModel = (accomodation: apiModel.Accomodation): model.Accomodation => ({
  _id: new ObjectId(accomodation.id),
  name: accomodation.name,
  images: accomodation.images,
  description: accomodation.description,
  address: accomodation.address,
  bedrooms: accomodation.bedrooms,
  beds: accomodation.beds,
  bathrooms: accomodation.bathrooms,
  reviews: mapReviewsFromModelToApi(accomodation.reviews)
});

// Review Mappers
export const mapReviewsFromModelToApi = (
  reviews: model.Review[]
): apiModel.Review[] => reviews.map(mapReviewFromModelToApi);

export const mapReviewFromModelToApi = (review: model.Review): apiModel.Review => ({
  _id: review._id.toHexString(),
  reviewDate: review.reviewDate.toLocaleString(),
  listing_id: String(review.listing_id),
  reviewer_id: String(review.reviewer_id),
  reviewer_name: review.reviewer_name,
  comments: review.comments,
})

export const mapReviewFromApiToModel = (review: apiModel.Review): model.Review => ({
  _id: new ObjectId(review._id),
  reviewDate: new Date(review.reviewDate),
  listing_id: Number(review.listing_id),
  reviewer_id: Number(review.reviewer_id),
  reviewer_name: review.reviewer_name,
  comments: review.comments,
})
