import { Router } from "express";
import { accomodationRepository, Review } from "#dals/index.js";
import {
  mapAccomodationListFromModelToApi,
  mapAccomodationFromModelToApi
} from "./accomodation.mappers.js";
export const accomodationApi = Router();

accomodationApi
  .get("/", async (req, res, next) => {
    try {
      const page = Number(req.query.page);
      const pageSize = Number(req.query.pageSize);
      const accomodationList = await accomodationRepository.getAccomodationList(page, pageSize);
      res.send(mapAccomodationListFromModelToApi(accomodationList));
    } catch (error) {
      next(error);
    }
  })
  .get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const accomodation = await accomodationRepository.getAccomodation(id);
      if (accomodation) {
        res.send(mapAccomodationFromModelToApi(accomodation));
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  })
 .put("/:id", async (req, res, next) => {
     try {
       const { id } = req.params;
       const accomodation = await accomodationRepository.getAccomodation(id);
       if (accomodation) {
         const lastId =
           accomodation.reviews && accomodation.reviews.length > 0
             ? Math.max(...accomodation.reviews.map((r) => Number(r._id)))
             : 0;
         const newReview: Review = {
           _id: lastId + 1,
           date: new Date(),
           ...req.body,
         };
         await accomodationRepository.addReview(accomodation, newReview);
         res.status(201).send(newReview);
       } else {
         res.sendStatus(404);
       }
     } catch (error) {
       next(error);
     }
   })
