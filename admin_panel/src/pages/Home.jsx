import { useGetUserQuery } from "../context/services/user.service";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Home = () => {
  const { data: users = [], isLoading: usersLoading } = useGetUserQuery();

  const countsByDate = users.reduce((acc, user) => {
    const date = new Date(user.createdAt).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  let total = 0;
  const chartData = Object.keys(countsByDate)
    .sort()
    .map((date) => {
      total += countsByDate[date];
      return { date, count: total };
    });
  console.log(chartData);

  return (
    <div className="page">
      <div className="page-header">
        <p>Tizimdagi userlar grafigi</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Home;
