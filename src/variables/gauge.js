import React from "react";
import { Chart } from "react-google-charts";

export default function gauge({
  label,
  valor,
  yellowTo,
  yellowFrom,
  redTo,
  redFrom,
}) {
  return (
    <>
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="Gauge"
        loader={<div>Loading Chart</div>}
        data={[
          ["Label", "Value"],
          [label, valor],
        ]}
        options={{
          redFrom: redFrom,
          redTo: redTo,
          yellowFrom: yellowFrom,
          yellowTo: yellowTo,
          minorTicks: 10,
        }}
      />
    </>
  );
}
