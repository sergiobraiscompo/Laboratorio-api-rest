import { Router } from "express";
import { accomodationRepository, Review } from "#dals/index.js";
import {
  mapAccomodationListFromModelToApi,
  mapAccomodationFromModelToApi,
  mapReviewFromApiToModel,
  mapAccomodationFromApiToModel,
} from "./accomodation.mappers.js";
import { ObjectId } from "mongodb";
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
      const accomodation = await mapAccomodationFromApiToModel({ ...req.body, id });
      const newReview: Review = {_id: new ObjectId(), ...req.body[1]};
      console.log(newReview);
      await accomodationRepository.addReview(accomodation, newReview);
      res.sendStatus(204);
      res.sendStatus(404);
    } catch (error) {
      next(error);
    }
  })
  .delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const isDeleted = await accomodationRepository.deleteAccomodation(id);
      res.sendStatus(isDeleted ? 204 : 404);
    } catch (error) {
      next(error);
    }
  });
