import React from "react";
import { Chart } from "react-google-charts";

export default function gauge({ label, valor }) {
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
          redFrom: 90,
          redTo: 100,
          yellowFrom: 75,
          yellowTo: 90,
          minorTicks: 10,
        }}
      />
    </>
  );
}
