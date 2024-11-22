import { getAccomodationContext } from "#dals/accomodation/accomodation.context.js";
import prompts from "prompts";
// import { ObjectId } from "mongodb";

export const run = async () => {
    let exit = false;
    while (!exit) {
        const { queries } = await prompts({
            name: 'queries',
            type: 'select',
            message: 'Which querie do you want to run?',
            choices: ['getAccomodation', 'getAccomodationsByCountry','exit'].map((option) => ({
                title: option,
                value: option,
            })),
        });

        if (queries !== 'exit') {
            const { run } = await import(`./${queries}.runner.js`);
            await run();
        } else {
            exit = true;
            console.log("exit");
        }
    }
};

// // Recieve newReview and destruct reviews array?
// export const addReview = async () => {
//     const result = await accomodationContext
//         .findOneAndUpdate(
//             {
//                 _id: new ObjectId('')
//             },
//             {
//                 $push: {
//                     reviews: [],
//                 }
//             },
//             {
//                 returnDocumnet: ' after',
//                 projection: {
//                     _id: 0,
//                     name: 1,
//                     image: 1,
//                     description: 1,
//                     address: 1,
//                     bedrooms: 1,
//                     beds: 1,
//                     bathrooms: 1,
//                     reviews: 1
//                 },
//             },
//         );
//     console.log({ result })
// };

