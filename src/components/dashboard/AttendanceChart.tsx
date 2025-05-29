// src/components/dashboard/AttendanceChart.tsx
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ReferenceArea,
} from "recharts";
import React from "react";
import { ChartItem, TooltipPayload } from "@/types/types";

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;

  // pull each segment out by dataKey
  const onTime = payload.find((p) => p.dataKey === "ON_TIME")?.value ?? 0;
  const late = payload.find((p) => p.dataKey === "LATE")?.value ?? 0;
  const absent = payload.find((p) => p.dataKey === "ABSENT")?.value ?? 0;

  return (
    <div className="bg-[var(--surface)] border border-[var(--divider)] p-3 rounded">
      <p className="text-[var(--text-primary)] font-semibold mb-2">{label}</p>
      <p className="text-[var(--accent)] font-medium mb-1">
        On Time : {onTime}
      </p>
      <p className="text-[var(--error)] font-medium mb-1">Late : {late}</p>
      <p className="text-[var(--warning)] font-medium">Absent : {absent}</p>
    </div>
  );
}

export default function AttendanceChart({ data }: { data: ChartItem[] }) {
  return (
    <div className="w-full h-64 bg-[var(--card-bg)] p-4 rounded-lg border border-[var(--divider)]">
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 0, left: 0 }}
        >
          {/* alternate stripes */}
          {data.map((d, i) => {
            // shade every even-indexed day (0,2,4)
            if (i % 2 === 0 && i < data.length - 1) {
              return (
                <ReferenceArea
                  key={`stripe-${d.dayName}`}
                  x1={d.dayName}
                  x2={data[i + 1].dayName}
                  stroke="none"
                  fill="var(--card-bg)"
                  fillOpacity={1}
                />
              );
            }
            return null;
          })}

          <XAxis
            dataKey="dayName"
            axisLine={{ stroke: "var(--divider)" }}
            tickLine={false}
            tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
            allowDecimals={false}
            stroke="var(--divider)"
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Bar
            dataKey="ON_TIME"
            stackId="a"
            fill="var(--accent)"
            barSize={8}
            radius={[4, 4, 4, 4]}
          />
          <Bar
            dataKey="LATE"
            stackId="a"
            fill="var(--error)"
            barSize={8}
            radius={[4, 4, 4, 4]}
          />
          <Bar
            dataKey="ABSENT"
            stackId="a"
            fill="var(--warning)"
            barSize={8}
            radius={[4, 4, 4, 4]}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
