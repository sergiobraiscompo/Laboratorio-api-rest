import { db } from "#dals/mock-data.js";
import { Accomodation } from "../accomodation.model.js";
import { AccomdationRepository } from "./accomodation.repository.js";

const insertAccomodation = (book: Accomodation) => {
    const id = (db.accomodations.length + 1).toString();
    const newAccomodation: Accomodation = {
        ...book,
        id,
    };

    db.accomodations = [...db.accomodations, newAccomodation];
    return newAccomodation;
};

const updateAccomodation = (book: Accomodation) => {
    db.accomodations = db.accomodations.map((b) => (b.id === book.id ? { ...b, ...book } : b));
    return book;
};

const paginateAccomodationList = (
    bookList: Accomodation[],
    page: number,
    pageSize: number
): Accomodation[] => {
    let paginatedAccomodationList = [...bookList];
    if (page && pageSize) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, paginatedAccomodationList.length);
        paginatedAccomodationList = paginatedAccomodationList.slice(startIndex, endIndex);
    }

    return paginatedAccomodationList;
};

export const mockRepository: AccomdationRepository = {
    getAccomodationList: async (page?: number, pageSize?: number) => paginateAccomodationList(db.accomodations, page, pageSize),
    getAccomodation: async (id: string) => db.accomodations.find((a) => a.id === id),
    saveAccomodation: async (accomodation: Accomodation) => db.accomodations.some((a) => a.id === accomodation.id)
        ? updateAccomodation(accomodation)
        : insertAccomodation(accomodation),
    deleteAccomodation: async (id: string) => {
        const exists = db.accomodations.some((a) => a.id === id);
        db.accomodations = db.accomodations.filter((a) => a.id !== id);
        return exists;
    },
}