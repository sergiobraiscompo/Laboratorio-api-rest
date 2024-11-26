export interface Accomodation {
    id: string;
    name: string;
    image: string;
    description: string;
    address: string;
    bedrooms: number;
    beds: number;
    bathrooms: number;
    reviews: Review[];
}

export interface Review {
    id: string,
    date: string,
    reviewerName: string,
    comment: string
}