import { ObjectId } from "mongodb";
import { Accomodation } from "./accomodation/accomodation.model.js";

export interface DB {
  accomodations: Accomodation[];
}

export const db: DB = {
  accomodations: [
    {
      _id: new ObjectId(),
      name: "Nice room in Barcelona Center",
      description: "Hi!  Cozy double bed room in amazing flat next to Passeig de Sant Joan and to metro stop Verdaguer. 3 streets to Sagrada Familia and 4 streets to Passeig de Gracia. Flat located in the center of the city.  View to Sagrada Familia and Torre Agbar. Nice flat in the central neighboorhood of Eixample. Ideal couple or 2 friends. Dreta de l'Eixample",
      bedrooms: 1,
      beds: 2,
      bathrooms: 1,
      // reviews: [{}],
      image: "https://a0.muscache.com/im/pictures/aed1923a-69a6-4614-99d0-fd5c8f41ebda.jpg?aki_policy=large",
      address: "Barcelona"
    },
    {
      _id: new ObjectId(),
      name: "Cozy bedroom Sagrada Familia",
      description: "Cozy bedroom next to the church Sagrada Família a great choice to stay in a residential area away from the crowds while still being at a walking distance to main attractions in Barcelona. Cozy beroom located three minutes from the Sagrada Família in a central zone of Barcelona.  Equiped kitchen. I'll be glad to give you some tips according to your taste. Well located on a calm residential area a few blocks away from the city center. Metro on the corner 5 stops away from the Ramblas, Paseo de Gracia and Catalunya square. Restaurants, bars and supermarket around the area.",
      bedrooms: 1,
      beds: 2,
      bathrooms: 1,
      // reviews: [
      //   {
      //     _id: new ObjectId(),
      //     date: {
      //       "$date": "2016-02-14T05:00:00Z"
      //     },
      //     reviewer_name: "Miffy",
      //     comments: "Rapha place is so tidy and the dog there is so friendly. I and my friend had a really good time there. Rapha is such a friendly host and he will always give us some suggestions of restaurants or place to travel. The location of the flat is easy to find and it is just next to the metro station and that is very convenient. The hot tourist spot Sagrada Familia is just next to the flat. We can go to the city centre just by walking. Even though at night, we still feel safe to walk to the apartment from the metro.I strongly recommend people to stay there during staying in Barcelona. "
      //   }
      // ],
      image: "https://a0.muscache.com/im/pictures/953b3c09-adb5-4d1c-a403-b3e61c8fa766.jpg?aki_policy=large",
      address: "Barcelona"
    },
  ]
};