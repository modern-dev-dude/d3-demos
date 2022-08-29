import * as React from 'react';
import Plot from 'react-plotly.js';
import Link from 'next/link';
import { CountsByDateProps } from '../../types';

interface PlotlyLineChartProps {
  countsByDate: Array<CountsByDateProps>;
}
const PLOTLY_LINK = 'https://plotly.com/javascript/react/#plotlyjs-chart-types-and-attributes';
const LINE_COLOR = '#590FD2';
export default function PlotlyLineChart({ countsByDate }: PlotlyLineChartProps) {
  return (
    <div>
      <h1>
        Line chart made with {' '}
        <Link href={PLOTLY_LINK}>
          <span className='linkText'>
            Plotly JS
          </span>
        </Link>
      </h1>
      <Plot
        data={[
          {
            x: countsByDate.map(d => d.date),
            y: countsByDate.map(d => d.count),
            type: 'scatter',
            mode: 'lines',
            line: {
              width: 4
            },
            marker: { color: LINE_COLOR },
          },
        ]}
        layout={{ width: 800, height: 500, title: 'NYC Film Permits' }}
      />
    </div>
  )
}