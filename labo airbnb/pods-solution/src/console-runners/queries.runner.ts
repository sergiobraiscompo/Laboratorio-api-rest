import { getAccomodationContext } from "#dals/accomodation/accomodation.context.js";
import { Review } from "#dals/index.js";
import { ObjectId } from "mongodb";

export const getAccomodations = async () => {
    const result = await getAccomodationContext()
        .find(
            { country: "Spain" },
            {
                projection: {
                    _id: 0,
                    name: 1,
                    image: 1,
                    description: 1,
                    address: 1,
                    bedrooms: 1,
                    beds: 1,
                    bathrooms: 1,
                    reviews: 1
                },
            }
        )
    console.log({ result })
};

// Comments actions
const insertComment = async (idAccomodation: ObjectId, newReview: Review) => {
    const result = await getAccomodationContext()
        .findOneAndUpdate(
            { _id: idAccomodation },
            {
                $push: {
                    reviews: newReview,
                }
            },
            {
                returnDocument: 'after',
                projection: {
                    _id: 0,
                    reviews: 1
                },
            }
        )
    console.log({ result })
};
