import { AccomodationRepository } from "#dals/index.js";
import { Router } from "express";
import { mapAccomodationFromApiToModel, mapAccomodationFromModelToApi, mapAccomodationListFromModelToApi } from "./accomodation.mapper.js";


export const accomodationApi = Router();

accomodationApi
    .get("/", async (req, res, next) => {
        try {
            const page = Number(req.query.page);
            const pageSize = Number(req.query.pageSize);
            const accomodationList = await AccomodationRepository.getAccomodationList(page, pageSize);

            res.send(mapAccomodationListFromModelToApi(accomodationList));
        } catch (error) {
            next(error);
        }
    })
    .get("/:id", async (req, res, next) => {
        try {
            const { id } = req.params;
            const accomodation = await AccomodationRepository.getAccomodation(id);

            res.send(mapAccomodationFromModelToApi(accomodation));

        } catch (error) {
            next(error);
        }
    })
    .put("/:id", async (req, res, next) => {
        try {
            const { id } = req.params;
            if (await AccomodationRepository.getAccomodation(id)) {
                const accomodation = mapAccomodationFromApiToModel({ ...req.body, id });
                await AccomodationRepository.saveAccomodation(accomodation);
                res.sendStatus(204);
            }
        } catch (error) {
            next(error);
        }
    })
