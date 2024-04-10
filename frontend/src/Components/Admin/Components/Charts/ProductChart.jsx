import React from "react";
import { Container, useMediaQuery } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const ProductChart = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  // Dummy data for products and their sales
  const productSalesData = [
    { name: "Product A", Sales: 65 },
    { name: "Product B", Sales: 59 },
    { name: "Product C", Sales: 80 },
    { name: "Product D", Sales: 81 },
    { name: "Product E", Sales: 56 },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        pt: 4,
      }}
    >
      {isMobile ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="Sales"
              data={productSalesData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {productSalesData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={productSalesData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Sales" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Container>
  );
};

export default ProductChart;
