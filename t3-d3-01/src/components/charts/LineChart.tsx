import React, { useLayoutEffect, useRef } from "react";
import * as d3 from 'd3';
import ChartWrapper from "./ChartWrapper";
import CardWrapper from "../CardWrapper";
import { LineChartProps } from '../../types';


export default function LineChart({countsByDate, d3ContainerId, rootStyles}: LineChartProps){
    const d3Chart = useRef(null);
    /**
     * Block ui while D3 updates with this hook
     */
    useLayoutEffect(()=>{
            const parseDate = d3.timeParse('%Y-%m-%d');
            const formmatedDateData = countsByDate.map(item => ({
                date: parseDate(item.date),
                count: item.count
            }))
            
            /**
             * Draw d3 chart
             */
            const margin = {top:50, right:30, bottom:30, left:30};
            const padding = 12;
            const width = parseInt(d3.select(`#${d3ContainerId}`).style('width')) - margin.left - margin.right - padding;
            const height = parseInt(d3.select(`#${d3ContainerId}`).style('height')) - margin.top - margin.bottom- padding;
            // TODO FIX REF TYPE
            // @ts-ignore
            const svg = d3.select(d3Chart.current)
                            .attr('width', width +margin.left + margin.right)
                            .attr('height', height +  margin.top + margin.bottom)
                            .append('g')
                            .attr('transform', `translate(${margin.left}, ${margin.top})`);

            /**
             *  TODO FIX ME
             * Argument of type '[undefined, undefined] | [Date, Date]' 
             * is not assignable to parameter of type 'Iterable<Date | NumberValue>'.
             * Type '[undefined, undefined]' is not assignable to type 'Iterable<Date | NumberValue>'.
             * The types returned by '[Symbol.iterator]().next(...)' are incompatible between these types.
             */
            const xExtent = d3.extent(formmatedDateData, (d) => d.date)
            //@ts-ignore
            const x = d3.scaleTime().domain(xExtent).range([0, width]);
            svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x))

            /**
             *  TODO FIX ME
             * Argument of type '[undefined, undefined] | [Date, Date]' 
             * is not assignable to parameter of type 'Iterable<Date | NumberValue>'.
             * Type '[undefined, undefined]' is not assignable to type 'Iterable<Date | NumberValue>'.
             * The types returned by '[Symbol.iterator]().next(...)' are incompatible between these types.
             */
            const max = d3.max(formmatedDateData, d => d.count);
            // @ts-ignore
            const y = d3.scaleLinear().domain([0,max]).range([height, 0]);
            svg.append('g').call(d3.axisLeft(y))

            svg.append('path')
                .datum(formmatedDateData)
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
        return () => {
            // Cleans the SVG element on unmount
            // remove to see D3 do some weird dom stuff 
            d3.select(d3Chart.current).selectChildren().remove();
        }
    },[countsByDate]) 
 
    return (
    
        <CardWrapper>
            <ChartWrapper 
                ref={d3Chart} 
                d3ContainerId = {d3ContainerId}
                rootStyles={rootStyles}
            />
        </CardWrapper>
    )
}


