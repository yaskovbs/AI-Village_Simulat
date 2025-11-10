import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { UsageData } from '@/types';

interface UsageChartProps {
  data: UsageData[];
}

const providers = [
  { id: 'openai', name: 'OpenAI', color: 'hsl(var(--primary))' },
  { id: 'anthropic', name: 'Anthropic', color: 'hsl(var(--secondary-foreground))' },
  { id: 'google', name: 'Google', color: 'hsl(var(--accent-foreground))' },
  { id: 'youtube', name: 'YouTube', color: 'hsl(0 84% 60%)' },
  { id: 'websearch', name: 'חיפוש באינטרנט', color: 'hsl(217 91% 60%)' },
];

const UsageChart: React.FC<UsageChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    
    const parent = svg.node()?.parentElement;
    if (!parent) return;

    const width = parent.clientWidth;
    const height = parent.clientHeight;
    const margin = { top: 20, right: 30, bottom: 60, left: 50 };

    svg.selectAll("*").remove(); // Clear previous renders

    svg.attr('width', width).attr('height', height);
    const chart = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const days = data.map(d => d.day as string);
    const providerIds = providers.map(p => p.id);

    const x0 = d3.scaleBand()
      .domain(days)
      .range([0, innerWidth])
      .padding(0.2);

    const x1 = d3.scaleBand()
      .domain(providerIds)
      .range([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d3.max(providerIds, p => d[p] as number)) || 0])
      .nice()
      .range([innerHeight, 0]);

    // Axes
    chart.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x0).tickSizeOuter(0))
      .selectAll('text')
      .style('fill', 'hsl(var(--muted-foreground))');

    chart.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('fill', 'hsl(var(--muted-foreground))');

    // Bars
    const dayGroup = chart.selectAll('.day-group')
      .data(data)
      .join('g')
      .attr('class', 'day-group')
      .attr('transform', d => `translate(${x0(d.day as string)},0)`);

    dayGroup.selectAll('rect')
      .data(d => providerIds.map(key => ({ key, value: d[key] as number, day: d.day })))
      .join('rect')
      .attr('x', d => x1(d.key)!)
      .attr('y', d => y(d.value))
      .attr('width', x1.bandwidth())
      .attr('height', d => innerHeight - y(d.value))
      .attr('fill', d => providers.find(p => p.id === d.key)?.color || 'gray')
      .on('mouseover', (event, d) => {
        tooltip.style('opacity', 1);
        const providerName = providers.find(p => p.id === d.key)?.name || d.key;
        tooltip.html(`<strong>${providerName}</strong><br/>${d.day}: ${d.value} קריאות`)
               .style('left', `${event.pageX + 15}px`)
               .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${height - margin.bottom + 30})`);

    const legendItem = legend.selectAll('.legend-item')
      .data(providers)
      .join('g')
      .attr('class', 'legend-item')
      .attr('transform', (_, i) => `translate(${i * 110}, 0)`);

    legendItem.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', d => d.color);

    legendItem.append('text')
      .attr('x', 20)
      .attr('y', 12)
      .text(d => d.name)
      .style('fill', 'hsl(var(--foreground))')
      .style('font-size', '12px');

  }, [data]);

  return (
    <>
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
      <div
        ref={tooltipRef}
        className="absolute p-2 text-sm rounded-md pointer-events-none bg-popover text-popover-foreground shadow-md"
        style={{ opacity: 0, transition: 'opacity 0.2s' }}
      ></div>
    </>
  );
};

export default UsageChart;
