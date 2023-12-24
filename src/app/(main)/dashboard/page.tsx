"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Checkbox, { CheckboxGroup } from "@/components/ui/checkbox";
import Textarea from "@/components/ui/textarea";
import CardDataStats from "@/components/CardDataStats";
import { useEffect, useMemo, useState } from "react";
import { USERS, USER_COLUMN } from "@/components/table/mockData";
import Select from "@/components/ui/select";
import { useHubContext } from "@/context/hub-connection-context";
import { MainContainer } from "@/components/style-container";
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Rectangle, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';


const bar_chart_data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const line_chart_data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const area_chart_data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const pi_chart_data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function Dashboard() {
  const options = [
    { value: "blues", label: "Blues" },
    { value: "rock", label: "Rock" },
    { value: "jazz", label: "Jazz" },
    { value: "orchestra", label: "Orchestra" }
  ];

  const [totalUser, setTotalUser] = useState<number>(0);
  const columns = useMemo(() => USER_COLUMN, []);
  const data = useMemo(() => USERS, []);


  const { connection } = useHubContext();

  useEffect(() => {

    connection.on("UserConnected", (connectionId) => {
      // TODO: add this conectionId for further uses
      console.log(connectionId);
    });

    connection.on("UserDisconnected", (connectionId) => {
      // TODO: remove this connectionId from list
      //console.log(connectionId);
    });

    connection.on("OnlineUsersCount", (message) => {
      setTotalUser(message);
      console.log(`Total User connected: ${message}`);
    });

    //setConnection(connection);
  }, []);

  const sendMessage = async () => {
    //if (connection) await connection.send("GetOnlineUsersCount");
    if (connection)
      await connection.invoke("GetOnlineUsersCount").catch((error) => {
        return console.error(error.toString());
      });
  };

  return (
    <MainContainer>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Total views"
          total="$3.456K"
          rate="0.43%"
          levelUp
        ></CardDataStats>
        <CardDataStats
          title="Total Profit"
          total="$45,2K"
          rate="4.35%"
          levelUp
        ></CardDataStats>
        <CardDataStats
          title="Total Product"
          total="2.450"
          rate="2.59%"
          levelUp
        ></CardDataStats>
        <CardDataStats
          title="Total Users"
          total="3.456"
          rate={totalUser.toString()}
          levelDown
        ></CardDataStats>
      </div>
      <div className="wrapper mx-1 p-2 grid grid-cols-1 md:grid-cols-2  gap-4">


        <LineChart
          width={480}
          height={300}
          data={line_chart_data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>

        <BarChart
          width={480}
          height={300}
          data={bar_chart_data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
        
        <AreaChart
          width={480}
          height={400}
          data={area_chart_data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
        </AreaChart>

        <PieChart width={480} height={480}>
          <Pie
            data={pi_chart_data}
            cx="200"
            cy="200"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={200}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>

       
      </div>
    </MainContainer>
  );
}
