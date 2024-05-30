import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <div>Bảng điểm</div>
            <ul>
              <li>
                <Link to="/movement-point">Điểm phong trào</Link>
              </li>
              <li>
                <Link to="/final-grade">Điểm tổng kết</Link>
              </li>
            </ul>
          </li>
          <li>
            <div>Cấu hình</div>
            <ul>
              <li>
                <Link to="/student-management">Quản lí sinh viên</Link>
              </li>
              <li>
                <Link to="/club-management">Quản lí câu lạc bộ</Link>
              </li>
              <li>
                <Link to="/department-management"> Quản lí phòng ban</Link>
              </li>
              <li>
                <Link to="/semester-management">Quản lí kì học</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
