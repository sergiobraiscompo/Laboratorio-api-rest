import { getAccomodationContext } from '#dals/accomodation/accomodation.context.js';
import { ObjectId } from 'mongodb';

export const run = async () => {
    // Listado de alojamientos completo
    const allBookings = await getAccomodationContext()
    .find()
    .toArray();
    console.log({ allBookings });

    // // Alojamiento por ID
    // const result = await getAccomodationContext()
    //     .find()
    //     .toArray();
    //     console.log({ result });
    
    // // Añadir una review
    // const result = await getAccomodationContext()
    //     .findOneAndUpdate(
    //         {
    //             _id: new ObjectId('573a1390f29313caabcd4135'),
    //         },
    //         {
    //             $push: {
    //                 reviews: {
    //                     id: new ObjectId(),
    //                     name: userName,
    //                     comment: userComment
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
    //         }

};
