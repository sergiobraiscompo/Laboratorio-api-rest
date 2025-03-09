import { getAccomodationContext } from "#dals/accomodation/accomodation.context.js";
import { ObjectId } from "mongodb";
import prompts from "prompts";

export const run = async () => {
    const { accomdationId } = await prompts(
        {
            name: 'accomdationId',
            initial: '',
            type: 'text',
            message: 'Specify the accomodation ID (type "exit" to return previous menu):',
        }
    )

    if (accomdationId === "exit") {
        'queries'
    } else {
        const result = await getAccomodationContext()
            .aggregate(
                [
                    { $match: { _id: new ObjectId(accomdationId) } },
                    { $sort: '$reviews.date' },
                    { $limit: 5 },
                    { $unwind: '$address.location' },
                    {
                        $project: {
                            _id: 0,
                            name: 1,
                            image: 1,
                            description: 1,
                            address: '$address.street',
                            bedrooms: 1,
                            beds: 1,
                            bathrooms: 1,
                            reviews: 1,
                        }
                    }
                ]).toArray();
        await result
        console.log(result)
    }
};