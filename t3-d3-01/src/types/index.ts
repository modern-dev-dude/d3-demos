
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

interface LineChartProps {
    countsByDate: Array<CountsByDateProps>;
    /**
     * Need this for D3 to find correct container
     */
    d3ContainerId: string;
    /**
     * Prop drill the root styles lol
     */
    rootStyles?: React.CSSProperties;
    svgProps?: React.ComponentPropsWithRef<"svg">;
}

type LineChartRef  = SVGSVGElement | null;

interface ChartWrapperProps {
    d3ContainerId: string;
    props?:  React.ComponentPropsWithRef<"svg">;
    rootStyles?: React.CSSProperties;
} 
  

export type {
    NycDataItem,
    CountsByDateProps,
    LineChartProps,
    LineChartRef,
    ChartWrapperProps
}