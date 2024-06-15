import React, { useCallback, useState, useRef } from 'react';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

import SelectBox, { SelectBoxTypes } from 'devextreme-react/select-box';

import {
  AdaptiveLayout,
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  ChartTypes,
  Size,
  Tooltip,
} from 'devextreme-react/chart';

import PivotGrid, {
  FieldChooser,
} from 'devextreme-react/pivot-grid';

import './home.scss';
import { dataSource, seriesTypeLabel } from './data.js';

const types: ChartTypes.SeriesType[] = ['area', 'stackedarea', 'fullstackedarea'];

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

const customizeTooltip = (args : any) => {
  const valueText = currencyFormatter.format(args.originalValue);
  return {
    html: `${args.seriesName} | Total<div class="currency">${valueText}</div>`,
  };
};

// const pivotdataSource = new PivotGridDataSource({
//   fields: [
//     {
//       caption: 'Region',
//       width: 120,
//       dataField: 'region',
//       area: 'row',
//       sortBySummaryField: 'Total',
//     },
//     {
//       caption: 'City',
//       dataField: 'city',
//       width: 150,
//       area: 'row',
//     },
//     {
//       dataField: 'date',
//       dataType: 'date',
//       area: 'column',
//     },
//     {
//       groupName: 'date',
//       groupInterval: 'month',
//       visible: false,
//     },
//     {
//       caption: 'Total',
//       dataField: 'amount',
//       dataType: 'number',
//       summaryType: 'sum',
//       format: 'currency',
//       area: 'data',
//     },
//   ],
//   store: sales,
// });


export default function Home() {

  const [type, setType] = useState<ChartTypes.SeriesType>(types[0]);

  const handleChange = useCallback((e: SelectBoxTypes.ValueChangedEvent) => {
    setType(e.value);
  }, [setType]);
  
  const chartRef = useRef<Chart>(null);
  const pivotGridRef = useRef<PivotGrid>(null);

  // useEffect(() => {
  //   pivotGridRef.current.instance.bindChart(chartRef.current.instance, {
  //     dataFieldsDisplayMode: 'splitPanes',
  //     alternateDataFields: false,
  //   });
  //   setTimeout(() => {
  //     dataSource.expandHeaderItem('row', ['North America']);
  //     dataSource.expandHeaderItem('column', [2013]);
  //   });
  // }, []);

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Home</h2>
      <div className={'content-block'}>
      <div className={'dx-card responsive-paddings'}>
          <div className={'logos-container'}>
            <p>Sample</p>
          </div>
          <div id="chart-demo">
              <Chart ref={chartRef}>
            <Size height={200} />
            <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
            <CommonSeriesSettings type="bar" />
            <AdaptiveLayout width={450} />
          </Chart>

          <PivotGrid
            id="pivotgrid"
            dataSource={dataSource}
            allowSortingBySummary={true}
            allowFiltering={true}
            showBorders={true}
            showColumnTotals={false}
            showColumnGrandTotals={false}
            showRowTotals={false}
            showRowGrandTotals={false}
            ref={pivotGridRef}
          >
            <FieldChooser enabled={true} height={400} />
          </PivotGrid>
          </div>
        </div>  
        <div className={'dx-card responsive-paddings'}>
          <div className={'logos-container'}>
            <p>Sample</p>
          </div>
          <div id="chart-demo">
            <Chart
              palette="Harmony Light"
              title="Population: Age Structure (2018)"
              dataSource={dataSource}>
              <CommonSeriesSettings
                argumentField="country"
                type={type}
              />
              <Series valueField="y1564" name="15-64 years"></Series>
              <Series valueField="y014" name="0-14 years"></Series>
              <Series valueField="y65" name="65 years and older"></Series>
              <Margin bottom={20} />
              <ArgumentAxis valueMarginsEnabled={false} />
              <Legend
                verticalAlignment="bottom"
                horizontalAlignment="center"
              />
              <Export enabled={true} />
            </Chart>
          </div>
        </div>        
      </div>
    </React.Fragment>
)}
