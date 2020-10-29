/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";

// Data structures
import { DataPoint, DataGroup } from "./chart/base";
import { updatePageLayoutState } from "./place/place";

// Draws a d3 SVG chart in the passed-in ID
import {
  drawLineChart,
  drawSingleBarChart,
  drawStackBarChart,
  drawGroupBarChart,
} from "./chart/draw";

// Determines what chart
import { chartTypeEnum } from "./place/types";
import _ from "lodash";

const CHART_HEIGHT = 194;

interface SimpleChartPropType {
  /**
   * The svg dom element id.
   */
  id: string;
  /**
   * The chart title
   */
  title: string;
  /**
   * The chart type, could be line, single bar or group bar chart.
   */
  chartType: string;
  /**
   * The unit of stat value
   */
  unit: string;

  dataPoints?: DataPoint[];
  dataGroups?: DataGroup[];
  /**
   * The topic of the page the chart is in
   */
  topic: string;
}

class SimpleChart extends React.Component<SimpleChartPropType> {
  chartElement: React.RefObject<HTMLDivElement>;
  svgContainerElement: React.RefObject<HTMLDivElement>;

  constructor(props: SimpleChartPropType) {
    super(props);
    this.chartElement = React.createRef();
    this.svgContainerElement = React.createRef();
    this.state = { foo: new Date() };
  }

  render(): JSX.Element {
    const dateString = this.getDateString();
    return (
      <div className="col">
        <div className="chart-container" ref={this.chartElement}>
          <h4>
            {this.props.title}
            <span className="sub-title">{dateString}</span>
          </h4>
          <div
            id={this.props.id}
            ref={this.svgContainerElement}
            className="svg-container"
          ></div>
        </div>
      </div>
    );
  }

  componentDidUpdate(): void {
    // Draw chart.
    try {
      this.drawSimpleChart();
    } catch (e) {
      return;
    }
  }

  componentDidMount(): void {
    this.fooIncrement();
  }

  drawSimpleChart(): void {
    const chartType = this.props.chartType;
    const elem = document.getElementById(this.props.id);
    console.log("drawing chart for ");
    console.log(this.props.id);
    elem.innerHTML = "";
    if (chartType === chartTypeEnum.LINE) {
      const isCompleteLine = drawLineChart(
        this.props.id,
        elem.offsetWidth,
        CHART_HEIGHT,
        this.props.dataGroups,
        this.props.unit
      );
      if (!isCompleteLine) {
        this.chartElement.current.querySelectorAll(
          ".dotted-warning"
        )[0].className += " d-inline";
      }
    } else if (chartType === chartTypeEnum.SINGLE_BAR) {
      drawSingleBarChart(
        this.props.id,
        elem.offsetWidth,
        CHART_HEIGHT,
        this.props.dataPoints,
        this.props.unit
      );
    } else if (chartType === chartTypeEnum.STACK_BAR) {
      drawStackBarChart(
        this.props.id,
        elem.offsetWidth,
        CHART_HEIGHT,
        this.props.dataGroups,
        this.props.unit
      );
    } else if (chartType === chartTypeEnum.GROUP_BAR) {
      drawGroupBarChart(
        this.props.id,
        elem.offsetWidth,
        CHART_HEIGHT,
        this.props.dataGroups,
        this.props.unit
      );
    }
  }

  private fooIncrement(): void {
    this.setState({
      foo: new Date(),
    });
  }

  private getDateString(): string {
    return "YYYY-MM-DD";
  }
}

export { SimpleChart };
