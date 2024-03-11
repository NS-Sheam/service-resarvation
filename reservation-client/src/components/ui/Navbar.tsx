import { Col, Row } from "antd";
import "../../styles/Navbar.css";
import ActiveNavLink from "../ActiveNavLink";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleMenu } from "../../redux/features/header/header.slice";
import { FaUser } from "react-icons/fa";
import { logOut } from "../../redux/auth/auth.Slice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/auth");
  };

  const { isMenuOpen } = useAppSelector((state) => state.header);
  const mainMenuItems = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Services",
      path: "/services",
    },
  ];
  if (!user) {
    mainMenuItems.push({
      title: "Login",
      path: "/auth",
    });
  } else {
    user?.role === "admin"
      ? mainMenuItems.push({
          title: "Providers",
          path: "/providers",
        })
      : mainMenuItems.push({
          title: "booking",
          path: "/my-bookings",
        });
  }

  return (
    <>
      <div className="bg-grayBlack">
        <Row
          align="middle"
          justify="space-between"
          className="inner-container navbar text-center h-16 hidden md:flex"
        >
          <Col span={6}>
            <h1
              onClick={() => navigate("/")}
              className="text-white text-4xl cursor-pointer"
            >
              <span className="text-orange">B</span>oo<span className=" text-primary">K</span>Ease
            </h1>
          </Col>
          <Col
            span={14}
            className="h-full"
          >
            <Row
              justify="center"
              className="h-full"
              align="middle"
            >
              {mainMenuItems.map((item, index) => (
                <Col
                  key={index}
                  span={4}
                  className="h-full"
                >
                  <ActiveNavLink
                    to={item.path}
                    className="menu-link "
                  >
                    {item.title}
                  </ActiveNavLink>
                </Col>
              ))}
              {user && (
                <>
                  <Col
                    span={4}
                    className="h-full"
                  >
                    <span
                      onClick={() => handleLogout()}
                      className="text-white text-xl font-semibold h-full flex justify-center items-center py-1 md:py-0 mx-1 cursor-pointer hover:bg-gray"
                    >
                      Logout
                    </span>
                  </Col>
                  <Col span={4}>
                    {user?.image ? (
                      <img
                        onClick={() => {
                          user?.role !== "admin" && navigate("/profile");
                        }}
                        style={{ border: "2px solid #ffffff" }}
                        src={user?.image}
                        alt="user"
                        className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                      />
                    ) : (
                      <FaUser
                        onClick={() => {
                          user?.role !== "admin" && navigate("/profile");
                        }}
                        style={{
                          border: "2px solid #ffffff",
                          padding: "0.25rem",
                        }}
                        className="text-white w-10 h-10 rounded-full cursor-pointer"
                      />
                    )}
                  </Col>
                </>
              )}
            </Row>
          </Col>
        </Row>
      </div>

      {/* Mobile Menu */}
      <Row
        align="middle"
        justify="end"
        className="z-50"
      >
        <Col
          span={20}
          className={`absolute top-12 right-6 transform ${
            isMenuOpen ? "flex" : "hidden"
          } transition-all duration-300 z-50`}
        >
          <Row
            align="middle"
            justify="space-between"
            style={{
              border: "2px solid #48cae4",
              borderRadius: "0.5rem",
            }}
            className="py-6 px-4 bg-grayBlack md:hidden shadow-lg bg-opacity-80 shadow-white"
            gutter={[0, 16]}
          >
            <Col span={24}>
              <h1
                onClick={() => navigate("/")}
                className="text-white text-4xl cursor-pointer text-center"
              >
                <span className="text-orange">B</span>oo<span className=" text-primary">K</span>Ease
              </h1>
            </Col>
            {user && (
              <Col
                span={24}
                className="text-center"
              >
                {user?.image ? (
                  <img
                    onClick={() => navigate("/profile")}
                    style={{ border: "2px solid #ffffff" }}
                    src={user?.image}
                    alt="user"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                ) : (
                  <FaUser
                    onClick={() => navigate("/profile")}
                    style={{
                      border: "2px solid #ffffff",
                      padding: "0.25rem",
                    }}
                    className="text-white w-10 h-10 rounded-full"
                  />
                )}
              </Col>
            )}
            {mainMenuItems.map((item, index) => (
              <Col
                key={index}
                span={24}
              >
                <ActiveNavLink
                  to={item.path}
                  onClick={() => dispatch(toggleMenu())}
                >
                  {item.title}
                </ActiveNavLink>
              </Col>
            ))}
            {user && (
              <>
                <Col
                  span={24}
                  className=""
                >
                  <span
                    onClick={() => handleLogout()}
                    className="text-white text-xl md:text-2xl font-semibold h-full flex justify-center items-center py-1 md:py-0 mx-1"
                  >
                    Logout
                  </span>
                </Col>
              </>
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Navbar;
