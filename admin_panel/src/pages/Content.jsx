import { useState } from "react";
import {
  useCreateContentMutation,
  useGetContentQuery,
} from "../context/services/content.service";
import { useGetSubjectQuery } from "../context/services/subject.service";
import { Button, Table, Modal, Form, Input, Select, Space } from "antd";
import { FaExternalLinkAlt, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";

const Content = () => {
  const { data: contents = [], isLoading: contentsLoading } =
    useGetContentQuery();
  const { data: subjects = [], isLoading: subjectsLoading } =
    useGetSubjectQuery();
  const [createContent, { isLoading: createLoading }] =
    useCreateContentMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();

  const subject_id = searchParams.get("subject_id");

  const handleFinish = async (values) => {
    await createContent(values);
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
      title: "Sarlavha",
      dataIndex: "title",
    },
    {
      title: "Fan nomi",
      dataIndex: ["subject_id", "subject_name"],
      render: (text, record) => record.subject_id?.subject_name || "—",
    },
    {
      title: "Biriktirilgan fayllar",
      render: (_, record) => (
        <Button
          onClick={() => {
            navigate(`/file?content_id=${record._id}`);
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
        <p>Materiallar</p>
        <div className="page-actions">
          {subject_id && (
            <>
              <p>
                Fan: {subjects.find((s) => s._id === subject_id)?.subject_name}
              </p>
              <button className="x-button" onClick={() => navigate("/content")}>
                <FaXmark />
              </button>
            </>
          )}
          <Button
            loading={createLoading || subjectsLoading}
            icon={<FaPlus />}
            type="primary"
            onClick={() => setOpen(true)}
          >
            Yangi material kiritish
          </Button>
        </div>
      </div>

      <Table
        size="small"
        dataSource={
          subject_id
            ? contents.filter((c) => c.subject_id?._id === subject_id)
            : contents
        }
        columns={columns}
        loading={contentsLoading}
        rowKey="_id"
      />

      <Modal
        title="Yangi material qo‘shish"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        okText="Saqlash"
        confirmLoading={createLoading}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Material sarlavhasi"
            name="title"
            rules={[{ required: true, message: "Sarlavha kiritilishi kerak" }]}
          >
            <Input placeholder="Masalan: Algebra 1-dars" />
          </Form.Item>

          <Form.Item
            label="Fan tanlang"
            name="subject_id"
            rules={[{ required: true, message: "Fan tanlanishi kerak" }]}
          >
            <Select
              loading={subjectsLoading}
              placeholder="Fan tanlang"
              options={subjects?.map((s) => ({
                label: s.subject_name,
                value: s._id,
              }))}
            />
          </Form.Item>

          <Form.List name="attached_files">
            {(fields, { add, remove }) => (
              <>
                <div className="flex justify-between items-center mb-2">
                  <label>Fayl ID lar</label>
                  <Button
                    size="small"
                    onClick={() => add()}
                    type="dashed"
                    icon={<FaPlus />}
                  >
                    Qo‘shish
                  </Button>
                </div>

                {fields.map(({ key, name, ...rest }) => (
                  <Space key={key} align="baseline" className="w-full mb-2">
                    <Form.Item
                      {...rest}
                      name={name}
                      className="w-full"
                      rules={[
                        {
                          required: true,
                          message: "ObjectId kiritilishi kerak",
                        },
                      ]}
                    >
                      <Input placeholder="File ObjectId" />
                    </Form.Item>
                    <Button
                      danger
                      icon={<FaTrashAlt />}
                      onClick={() => remove(name)}
                    />
                  </Space>
                ))}
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default Content;
