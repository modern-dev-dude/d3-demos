import * as React from 'react';
import { ChartWrapperProps, LineChartRef } from '../../types';

const ChartWrapper = React.forwardRef<LineChartRef, ChartWrapperProps>(({d3ContainerId, rootStyles, props}, ref) => {
    return (
        <div 
            id={d3ContainerId} 
            style ={rootStyles}
        >
            <svg  className='drop-shadow-2xl' ref={ref} {...props} ></svg>
        </div>
    ) 
})

export default ChartWrapper;
    
  