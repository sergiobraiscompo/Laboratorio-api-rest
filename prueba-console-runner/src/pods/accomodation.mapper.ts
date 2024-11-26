import * as model from "#dals/index.js";
import * as apiModel from "./accomodation.api.model.js";


export const mapAccomodationListFromModelToApi = (
    accomodationList: model.Accomodation[]
): apiModel.Accomodation[] => accomodationList.map((accomodation) => mapAccomodationFromModelToApi(accomodation));

export const mapAccomodationFromModelToApi = (accomodation: model.Accomodation): apiModel.Accomodation => ({
    id: accomodation.id,
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
    id: accomodation.id,
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
    id: review.id,
    date: review.date?.toISOString(),
    reviewerName: review.reviewerName,
    comment: review.comment
});

export const mapReviewFromApiToModel = (review: apiModel.Review): model.Review => ({
    id: review.id,
    date: new Date(review.date),
    reviewerName: review.reviewerName,
    comment: review.comment
});

