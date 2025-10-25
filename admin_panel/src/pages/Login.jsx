import { Form, Input, Button } from "antd";
const Login = () => {
  return (
    <div className="login">
      <div className="login-form">
        <Form
          autoComplete="off"
          onFinish={(data) => {
            localStorage.setItem("username", data.username);
            localStorage.setItem("password", data.password);
            window.location.href = "/";
          }}
          layout="vertical"
        >
          <Form.Item label="Foydalanuvchi nomi" name="username">
            <Input style={{ height: "40px" }} />
          </Form.Item>
          <Form.Item label="Parol" name="password">
            <Input.Password style={{ height: "40px" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Kirish
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
