import { useState } from "react";
import {
  useGetSubjectQuery,
  useCreateSubjectMutation,
} from "../context/services/subject.service";
import { Button, Table, Modal, Form, Input } from "antd";
import { FaExternalLinkAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Subject = () => {
  const { data: subjects = [], isLoading } = useGetSubjectQuery();
  const [createSubject, { isLoading: createLoading }] =
    useCreateSubjectMutation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    await createSubject(values);
    setOpen(false);
    form.resetFields();
  };

  const columns = [
    {
      title: "№",
      render: (_, __, i) => i + 1,
      width: 60,
    },
    {
      title: "Fan nomi",
      dataIndex: "subject_name",
    },
    {
      title: "Biriktirilgan materiallar",
      render: (_, record) => (
        <Button
          onClick={() => {
            navigate(`/content?subject_id=${record._id}`);
          }}
          icon={<FaExternalLinkAlt />}
        />
      ),
    },
    {
      title: "Yaratilgan sana",
      dataIndex: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <p>Fanlar</p>
        <div className="page-actions">
          <Button
            loading={createLoading}
            icon={<FaPlus />}
            type="primary"
            onClick={() => setOpen(true)}
          >
            Yangi fan qo‘shish
          </Button>
        </div>
      </div>

      <Table
        size="small"
        dataSource={subjects}
        columns={columns}
        loading={isLoading}
        rowKey="_id"
      />

      <Modal
        title="Yangi fan qo‘shish"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        okText="Saqlash"
        confirmLoading={createLoading}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Fan nomi"
            name="subject_name"
            rules={[{ required: true, message: "Fan nomi kiritilishi kerak" }]}
          >
            <Input placeholder="Masalan: Matematika" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Subject;
