import { getAccomodationContext } from '#dals/accomodation/accomodation.context.js';
import prompts from 'prompts';

// Get first five accomdations
const get5Accomodations = async () => {
    const result = await getAccomodationContext()
        .find()
        .limit(5)
        .project({
            _id: 1,
            name: 1,
            description: 1,
            address: "$address.street"
        }
        )
        // .addFields: ({
        //     "Reviews": [$concat: [ "$reviews.date" ]] 
        // })
      .toArray();
console.log({ result });
}

// Alojamiento por ID
const getAccomodation = async () => {
    const requestedID = await prompts({
        name: 'objectID',
        initial: '65097600a74000a4a4a22686',
        type: 'text',
        message: 'Please enter the ObjectId of the desired accomodation:',
    });

    const result = getAccomodationContext()
        .findOne({ _id: requestedID })
        .toString();
    console.log({ result });
}

// // Añadir una review
// const addReview = await getAccomodationContext()
//     .findOneAndUpdate(
//         {
//             _id: new ObjectId('573a1390f29313caabcd4135'),
//         },
//         {
//             $push: {
//                 reviews: {
//                     id: new ObjectId(),
//                     name: userName,
//                     comment: userReview
//                 },
//             },
//         },
//         {
//             returnDocument: 'after',
//             projection: {
//                 _id: 1,
//                 title: 1,
//                 genres: 1,
//                 imdb: 1,
//                 'tomatoes.viewer.rating': 1,
//             },
//         })
//     };


// Show and run queries
let exit = false;
while (!exit) {
    const { querie } = await prompts({
        name: 'querie',
        type: 'select',
        message: 'Which querie do you want to run?',
        choices: ['get5Accomodations', 'getAccomodation', 'exit'].map((option) => ({
            title: option,
            value: option,
        })),
    });

    if (querie !== 'exit') {
        if (querie === 'get5Accomodations') {
            await get5Accomodations();
        }

        if (querie === 'getAccomodation') {
            await getAccomodation();
        }
    } else {
        exit = true;
    }
}
