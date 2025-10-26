import { useGetUserQuery } from "../context/services/user.service";
import { Table } from "antd";
const User = () => {
  const { data: users = [], isLoading: usersLoading } = useGetUserQuery();
  const columns = [
    {
      title: "№",
      render: (_, __, i) => i + 1,
      width: 60,
    },
    { title: "Ismi", dataIndex: "first_name" },
    { title: "Familiyasi", dataIndex: "last_name" },
    { title: "Username", dataIndex: "username" },
    { title: "Telegram ID", dataIndex: "telegram_id" },
    { title: "Tili", dataIndex: "language_code" },
  ];
  return (
    <div className="page">
      <div className="page-header">
        <p>Foydalanuvchilar</p>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        loading={usersLoading}
        size="small"
      />
    </div>
  );
};

export default User;
