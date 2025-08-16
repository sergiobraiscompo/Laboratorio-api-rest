import { Router } from "express";
import { accomodationRepository } from "#dals/index.js";
import {
  mapAccomodationListFromModelToApi,
  mapAccomodationFromModelToApi,
  mapAccomodationFromApiToModel,
} from "./accomodation.mappers.js";

export const accomodationApi = Router();

accomodationApi
  .get("/", async (req, res, next) => {
    try {
      const page = Number(req.query.page);
      const pageSize = Number(req.query.pageSize);
      const accomodationList = await accomodationRepository.paginateAccomodationList(page, pageSize);
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
      const accomodationId = Number(id);
      const accomodation = mapAccomodationFromApiToModel({ ...req.body, id });
      await accomodationRepository.saveAccomodation(accomodation);
      res.sendStatus(204);
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
