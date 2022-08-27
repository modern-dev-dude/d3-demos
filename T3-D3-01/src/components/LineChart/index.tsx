import * as React from 'react';
import useSWR from "swr";
import * as d3 from 'd3';

const DATA_URL = 'https://data.cityofnewyork.us/resource/tg4x-b46p.json';
const fetcher = (url:string) => fetch(url).then((res) => res.json());
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
    date: Date | null;
    count: number;
  }

declare interface LineChartProps {
  props?:  React.ComponentPropsWithoutRef<"svg">;
  rootStyles?: React.CSSProperties;
} 


export default function LineChart({rootStyles, props}:LineChartProps){
    const parseDate =d3.timeParse('%Y-%m-%d');
    const d3Chart = React.useRef();
    const { data, error } = useSWR<Array<NycDataItem>, any>(DATA_URL,fetcher);
    React.useLayoutEffect(()=>{
        if(Array.isArray(data)){ 
            const update = d3.select('g').selectAll('line').data(data);
            const filmPermits = data.filter(item =>item.eventtype === "Shooting Permit");
            const dates = [...new Set(filmPermits.map(item => item.enteredon.slice(0,10)))]
            let countsByDate:Array<CountsByDateProps> = [];
            dates.map(time =>{
                let date = time;
                let count = 0;
                filmPermits.forEach(item  =>{
                    let timeStamp = item.enteredon.slice(0,10);
                    if(timeStamp === date){
                        count++;
                    }
                })
                countsByDate.push({date: parseDate(date),count})
            })

            /**
             * Draw d3 chart
             */
            const margin = {top:50, right:30, bottom:30, left:30};
            const width = parseInt(d3.select('#d3Container').style('width')) - margin.left - margin.right;
            const height = parseInt(d3.select('#d3Container').style('height')) - margin.top - margin.bottom;
            // TODO FIX REF TYPE
            // @ts-ignore
            const svg = d3.select(d3Chart.current)
                            .attr('width', width +margin.left + margin.right)
                            .attr('height', height +  margin.top + margin.bottom)
                            .style('background-color','#F1F1F1')
                            .append('g')
                            .attr('transform', `translate(${margin.left}, ${margin.top})`);

                            
             /**
             *  TODO FIX ME
             * Argument of type '[undefined, undefined] | [Date, Date]' 
             * is not assignable to parameter of type 'Iterable<Date | NumberValue>'.
             * Type '[undefined, undefined]' is not assignable to type 'Iterable<Date | NumberValue>'.
             * The types returned by '[Symbol.iterator]().next(...)' are incompatible between these types.
             */
            // @ts-ignore
            const x = d3.scaleTime().domain(d3.extent(countsByDate, (d) => d.date)).range([0, width]);
            svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x))

             /**
             *  TODO FIX ME
             * Argument of type '[undefined, undefined] | [Date, Date]' 
             * is not assignable to parameter of type 'Iterable<Date | NumberValue>'.
             * Type '[undefined, undefined]' is not assignable to type 'Iterable<Date | NumberValue>'.
             * The types returned by '[Symbol.iterator]().next(...)' are incompatible between these types.
             */
            const max = d3.max(countsByDate, d => d.count);
            // @ts-ignore
            const y = d3.scaleLinear().domain([0,max]).range([height, 0]);
            svg.append('g').call(d3.axisLeft(y))

            svg.append('path')
                .datum(countsByDate)
                .attr('fill', 'none')
                .attr('stroke', '#121212')
                .attr('stroke-width', 3)
                .attr('d', 
                    // TODO Fix typing
                    // @ts-ignore
                    d3.line().x(d => x(d.date)).y (d => y(d.count))
            )

            svg.append('text')
                .attr('x', (width/2))
                .attr('y', margin.top / 5 - 15)
                .attr('text-anchor', 'middle')
                .attr('font-size', '16px')
                .attr('fill', '#121212')
                .text('New York City Film Permits')
        }
        return () => {
            // Cleans the SVG element on unmount
            d3.select("g").remove();
        }
    },[data])


    return (
        <div id='d3Container' style ={rootStyles}>
            {
                // no need to render without data
                data && (
                    <svg ref={d3Chart} ></svg>
                )
            }
        </div>
    )
}