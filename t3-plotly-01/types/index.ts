
interface NycDataItem {
    eventid: string;
    eventtype: string;
    startdatetime: string;
    enddatetime: string;
    enteredon: string;
    eventagency: string;
    parkingheld: string;
    borough: string;
    communityboard_s: string;
    policeprecinct_s: string;
    category: string;
    subcategoryname: string;
    country: string;
    zipcode_s: string;
}
type CountsByDateProps = {
    date: string;
    count: number;
}

export type {
    NycDataItem,
    CountsByDateProps
}