import { getAccomodationContext } from "#dals/accomodation/accomodation.context.js";
import prompts from "prompts";

export const run = async () => {
    const { accomodationCountry } = await prompts(
        {
            name: 'accomodationCountry',
            initial: 'Spain',
            type: 'text',
            message: 'Specify the country you want to filter (type "exit" to return previous menu):',
        }
    )

    if (accomodationCountry === "exit") {
        'queries'
    } else {
        const result = await getAccomodationContext()
            .aggregate(
                [
                    { $match: { "address.country": accomodationCountry } },
                    { $unwind: '$reviews' },
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