import {
  useCreateFileMutation,
  useGetFileQuery,
} from "../context/services/file.service";
import { Button, Table, Tooltip } from "antd";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaExternalLinkAlt, FaUpload } from "react-icons/fa";
import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetContentQuery } from "../context/services/content.service";
import { FaXmark } from "react-icons/fa6";

const File = () => {
  const { data: files = [], isLoading: filesLoading } = useGetFileQuery();
  const fileRef = useRef();
  const [searchParams] = useSearchParams();

  const content_id = searchParams.get("content_id");
  const { data: contents = {}, isLoading: contentsLoading } =
    useGetContentQuery(content_id ? { content_id } : {});
  const navigate = useNavigate();

  const [createFile, { isLoading: createLoading }] = useCreateFileMutation();
  const columns = [
    {
      title: "№",
      render: (_, r, i) => i + 1,
      width: 60,
    },
    {
      title: "Yuklab olish",
      dataIndex: "path",
      render: (text) => (
        <a
          href={`${import.meta.env.VITE_API_URL}/${text}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button icon={<FaExternalLinkAlt />} />
        </a>
      ),
    },
    {
      title: "Fayl ID",
      dataIndex: "_id",
      render: (text) => (
        <Tooltip title={text}>
          <Button icon={<MdOutlineContentCopy />} />
        </Tooltip>
      ),
    },
    {
      title: "Kesh ID",
      dataIndex: "file_id",
      render: (text) => (
        <Tooltip title={text}>
          <Button icon={<MdOutlineContentCopy />} />
        </Tooltip>
      ),
    },
    {
      title: "Fayl nomi",
      dataIndex: "originalname",
      render: (text) => (
        <Tooltip title={text}>
          <Button icon={<MdOutlineContentCopy />} />
        </Tooltip>
      ),
    },
    {
      title: "Saqlangan nomi",
      dataIndex: "filename",
      render: (text) => (
        <Tooltip title={text}>
          <Button icon={<MdOutlineContentCopy />} />
        </Tooltip>
      ),
    },
    {
      title: "Fayl yo'li",
      dataIndex: "path",
      render: (text) => (
        <Tooltip title={text}>
          <Button icon={<MdOutlineContentCopy />} />
        </Tooltip>
      ),
    },
    {
      title: "Fayl turi",
      dataIndex: "mimetype",
    },
    {
      title: "Fayl hajmi",
      dataIndex: "size",
      render: (text) => `${(text / 1024 / 1024).toFixed(2)} MB`,
    },
    {
      title: "Kiritilgan vaqti",
      dataIndex: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
    },
  ];

  return (
    <div className="page">
      <input
        type="file"
        accept="image/*, .pdf, audio/*, video/*, .doc, .docx, .txt, .zip"
        capture
        ref={fileRef}
        style={{ display: "none" }}
        onChange={async (e) => {
          const file = e.target.files[0];
          if (file) {
            const formData = new FormData();
            formData.append("file", file);
            await createFile(formData);
            e.target.value = null;
          }
        }}
      />
      <div className="page-header">
        <p>Fayllar</p>
        <div className="page-actions">
          {content_id && (
            <>
              <p>Material: {contents?.title}</p>
              <button className="x-button" onClick={() => navigate("/content")}>
                <FaXmark />
              </button>
            </>
          )}
          <Button
            type="primary"
            onClick={() => {
              fileRef.current.click();
            }}
            icon={<FaUpload />}
            loading={createLoading}
          >
            Yangi fayl yuklash
          </Button>
        </div>
      </div>
      <Table
        size="small"
        dataSource={
          content_id
            ? files.filter((f) => contents?.attached_files?.includes(f._id))
            : files
        }
        columns={columns}
        loading={filesLoading || contentsLoading}
      />
    </div>
  );
};

export default File;
