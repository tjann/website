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

import React, { Component } from "react";
import { SimpleChart } from "./simple_chart";

import _ from "lodash";

// Let's have Page render 2 PageSections
class Page extends Component {
  render(): JSX.Element {
    return <div></div>;
  }
}

// Let's have each PageSection render 2 SimpleCharts
class PageSection extends Component {
  render(): JSX.Element {
    return (
      <div>
        <SimpleChart
          key={groupId}
          groupId={groupId}
          places={this.props.places}
          statsVars={statsVars}
          perCapita={
            groupId in this.props.chartOptions
              ? this.props.chartOptions[groupId].pc
              : false
          }
          onDataUpdate={this.onDataUpdate.bind(this)}
          statsVarTitle={statsVarTitle}
          removeStatsVar={this.props.removeStatsVar}
          setPC={this.props.setPC}
          denominators={denominators}
        ></SimpleChart>
      </div>
    );
  }
}

export { Page };
