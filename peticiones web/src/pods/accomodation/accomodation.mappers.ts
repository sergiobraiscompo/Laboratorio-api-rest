import * as model from "#dals/index.js";
import * as apiModel from "./accomodation.api-model.js";


// Accomodation mappers
export const mapAccomodationFromApiToModel = (accomodation: apiModel.Accomodation): model.Accomodation => ({
  _id: accomodation.id,
  name: accomodation.name,
  images: accomodation.images,
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

// Review Mappers
export const mapReviewFromModelToApi = (review: model.Review): apiModel.Review => ({
  _id: review._id,
  reviewerName: review.reviewerName,
  comments: review.comments
})

export const mapReviewFromApiToModel = (review: apiModel.Review): model.Review => ({
  _id: review._id,
  reviewerName: review.reviewerName,
  comments: review.comments
})

// AccomodationList mapper
export const mapAccomodationFromModelToApi = (accomodation: model.Accomodation): apiModel.Accomodation => ({
  id: accomodation._id,
  name: accomodation.name,
  images: accomodation.images,
  description: accomodation.description,
  address: accomodation.address,
  bedrooms: accomodation.bedrooms,
  beds: accomodation.beds,
  bathrooms: accomodation.bathrooms,
  reviews: accomodation.reviews
});