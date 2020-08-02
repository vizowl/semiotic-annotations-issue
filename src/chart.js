import React, { useState } from "react";
import XYFrame from "semiotic/lib/XYFrame";
import data from "./tla-index.json";
import { AnnotationCalloutElbow } from "react-annotation";

const frameProps = {
  margin: { left: 70, bottom: 60, right: 10, top: 10 },
  xAccessor: "RelTime",
  yAccessor: "Value",
  lineStyle: {
    fill: "none",
    stroke: "#ff8500",
    strokeWidth: 3,
  },
  axes: [
    {
      orient: "left",
      tickFormat: (d) => "",
      label: "Property Vale",
    },
    {
      orient: "bottom",
      tickValues: [-200, -100, 0, 100],
      label: "Days from Covid-19 lockdown",
    },
  ],
};

export default ({ size }) => {
  const [indexData, setIndexData] = useState(data["Queenstown-Lakes"]);
  const [index] = indexData;
  const handleChange = event => setIndexData(data[event.target.value])
  return (
    <div style={{ marginTop: "20px" }}>
      {index && (
        <React.Fragment>
          <label htmlFor="region-select">Select a region</label>
          <select name="regions" id="region-select" onChange={handleChange}>
            {Object.entries(data).map(([d]) => <option key={d} value={d}> {d} </option>)}
          </select>
          <h3>One year of property value in changes {index.Area || ""}</h3>
          <p>
            {`${index.Area} values have changed by ${index.Delta}% since lockdown`}
          </p>
          <XYFrame
            className={index.Delta === "0" ? "no-change" : "changes"}
            {...frameProps}
            size={[Math.min(size.width - 20, 680), 250]}
            yExtent={[index.Min, index.Max]}
            lines={index}
            annotations={[
              {
                className: "covid-index",
                type: "area",
                coordinates: [
                  { Value: 1000, RelTime: 0 },
                  { Value: 1000, RelTime: 105 },
                  { Value: index.Final, RelTime: 105 },
                  { Value: index.Final, RelTime: 0 },
                ],
              },
              {
                //Example of a react-annotation function
                //type you can send
                type: AnnotationCalloutElbow,
                note: {
                  label: "Change between lockdown and July",
                  title: `${index.Delta}%`,
                  padding: 5,
                  bgPadding: 3,
                },
                dy: 0,
                dx: -26,

                //Will automatically map this to the
                //scaled Y value
                RelTime: 0,
                Value: 1000 - (1000 - index.Final) / 4,
              },
            ]}
          />
        </React.Fragment>
      )}
    </div>
  );
};
