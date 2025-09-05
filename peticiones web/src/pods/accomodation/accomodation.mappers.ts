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
  reviews: mapReviewsFromModelToApi(accomodation.reviews)
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
  reviews: mapReviewsFromApiToModel(accomodation.reviews) 
});

// Handles getTime() possible errors
const getTime = (date?: Date) => {
  return date != null ? date.getTime() : 0;
}

// Review Mappers
export const mapReviewsFromModelToApi = (reviews: model.Review[]): apiModel.Review[] => {
  const last5Reviews = reviews.sort((reviewA, reviewB) => getTime(reviewB.date) - getTime(reviewA.date)).slice(0, 5);
  return last5Reviews.map(mapReviewFromModelToApi);
}

export const mapReviewsFromApiToModel = (
  reviews: apiModel.Review[]
): model.Review[] => reviews.map(mapReviewFromApiToModel);


export const mapReviewFromModelToApi = (review: model.Review): apiModel.Review => ({
  _id: review._id,
  date: review.date,
  listing_id: review.listing_id,
  reviewer_id: review.reviewer_id,
  reviewer_name: review.reviewer_name,
  comments: review.comments
})

export const mapReviewFromApiToModel = (review: apiModel.Review): model.Review => ({
  _id: Number(review._id),
  date: review.date,
  listing_id: Number(review.listing_id),
  reviewer_id: Number(review.reviewer_id),
  reviewer_name: review.reviewer_name,
  comments: review.comments
})
