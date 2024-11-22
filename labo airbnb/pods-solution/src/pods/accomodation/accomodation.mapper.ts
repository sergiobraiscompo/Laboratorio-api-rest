import * as model from "#dals/index.js";
import { ObjectId } from "mongodb";
import * as apiModel from "./accomodation.api.model.js";

export const mapAccomodationFromModelToApi = (accomodation: model.Accomodation): apiModel.Accomodation => ({
  _id: accomodation._id.toHexString(),
  name: accomodation.name,
  image: accomodation.image,
  description: accomodation.description,
  address: accomodation.address,
  bedrooms: accomodation.bedrooms,
  beds: accomodation.beds,
  bathrooms: accomodation.bathrooms,
  reviews: accomodation.reviews.map((review) => mapReviewFromModelToApi(review))
});

export const mapAccomodationFromApiToModel = (accomodation: apiModel.Accomodation): model.Accomodation => ({
  _id: new ObjectId(accomodation._id),
  name: accomodation.name,
  image: accomodation.image,
  description: accomodation.description,
  address: accomodation.address,
  bedrooms: accomodation.bedrooms,
  beds: accomodation.beds,
  bathrooms: accomodation.bathrooms,
  reviews: accomodation.reviews.map((review) => mapReviewFromApiToModel(review))
});

// Reviews
export const mapReviewFromModelToApi = (review: model.Review): apiModel.Review => ({
  _id: review._id.toHexString(),
  date: review.date,
  reviewerName: String(review.reviewerName),
  comment: String(review.comment)
});

export const mapReviewFromApiToModel = (review: apiModel.Review): model.Review => ({
  _id: new ObjectId(review._id),
  date: review.date,
  reviewerName: review.reviewerName.toString(),
  comment: review.comment.toString()
});


export const mapAccomodationListFromModelToApi = (
  accomodationList: model.Accomodation[]
): apiModel.Accomodation[] => accomodationList.map(mapAccomodationFromModelToApi);

