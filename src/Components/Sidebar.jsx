import React from "react";
import { Menu, Layout, Divider } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BookOutlined,
  AuditOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/Slices/authSlice";

const { Sider } = Layout;
const { SubMenu } = Menu; // Import SubMenu from Menu

const Sidebar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get current route path

  // Get role from localStorage
  const userRole = localStorage.getItem("role"); // Expected: "Student", "Reviewer", "Contributor", "Admin"

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Set active menu item based on the current path
  const getSelectedKey = () => {
    if (location.pathname === "/") return "1";
    if (location.pathname.startsWith("/books")) return "2";
    if (location.pathname.startsWith("/codes")) return "3";
    if (location.pathname.startsWith("/profile")) return "4";
    if (location.pathname.startsWith("/users")) return "5";
    if (location.pathname.startsWith("/createset")) return "6-1";
    if (location.pathname.startsWith("/assessents")) return "6-2";
    if (location.pathname.startsWith("/report")) return "6-3";
    if (location.pathname.startsWith("/createmcq")) return "7-1";
    if (location.pathname.startsWith("/mcqtest")) return "7-2";
    if (location.pathname.startsWith("/mcqreport")) return "7-3";
    return "1"; // Default to Home
  };

  return (
    <Sider>
      <div
        className="logo"
        style={{
          textAlign: "center",
          padding: "20px",
          color: "black",
          height: "66px",
          fontSize: "18px",
          fontWeight: "bold",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          Medical Coding
        </Link>
      </div>

      <Menu
        theme=""
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        style={{ color: "#000", flexGrow: 1, fontWeight: 500, paddingTop: 10 }}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<BookOutlined />}>
          <Link to="/books">Books</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<InfoCircleOutlined />}>
          <Link to="/codes">Codes</Link>
        </Menu.Item>

        {/* SubMenu for personality test */}
        <SubMenu key="6" icon={<AuditOutlined />} title="Personality Test">
          <Menu.Item key="6-1" icon={<CheckCircleOutlined />}>
            <Link to="/createset">Create Set</Link>
          </Menu.Item>
          <Menu.Item key="6-2" icon={<CheckCircleOutlined />}>
            <Link to="/assessents">Test</Link>
          </Menu.Item>
          <Menu.Item key="6-3" icon={<BarChartOutlined />}>
            <Link to="/report">Report</Link>
          </Menu.Item>
        </SubMenu>

        {/* subMenu for assessments */}
        {/* <SubMenu key="7" icon={<AuditOutlined />} title="Assessments">
          <Menu.Item key="7-1" icon={<CheckCircleOutlined />}>
            <Link to="/createmcq">Create MCQ</Link>
          </Menu.Item>
          <Menu.Item key="7-2" icon={<CheckCircleOutlined />}>
            <Link to="/mcqtest">MCQ Test</Link>
          </Menu.Item>
          <Menu.Item key="7-3" icon={<BarChartOutlined />}>
            <Link to="/mcqreport">MCQ Report</Link>
          </Menu.Item>
        </SubMenu> */}


        <Menu.Item key="5" icon={<InfoCircleOutlined/>}>
          <Link to="/users">Users</Link>
        </Menu.Item>

        <Menu.Item key="4" icon={<UserOutlined />}>
          <Link to="/profile">Profile</Link>
        </Menu.Item>
      </Menu>

      {/* Show Logout only if the user is logged in */}
      {isAuthenticated && (
        <Menu
          theme=""
          mode="inline"
          style={{ position: "absolute", bottom: "0", fontWeight: 500 }}
        >
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      )}
    </Sider>
  );
};

export default Sidebar;
