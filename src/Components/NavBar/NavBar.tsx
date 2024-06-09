import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../NavBar/logo_wide.png";
import { getAccessToken, removeAccessToken } from "../../Api/Util/token";

export default function NavBar() {
  const location = useLocation();
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const isLoggedIn = !!getAccessToken();

  const handleLogout = () => {
    removeAccessToken();
    window.location.reload();
  };

  const getNavLinkClass = (path: string) =>
    location.pathname === path
      ? "border-b-2 border-white"
      : "hover:border-b-2 hover:border-gray-300";

  return (
    <div>
      <nav className="bg-white p-8 border-b">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex justify-start items-center">
            <Link to="/">
              <img src={logo} alt="로고" className="h-14" />
            </Link>
          </div>
          <div className="flex justify-center items-center mt-3">
            <form
              className="mb-4 w-full max-w-lg"
              onSubmit={handleSearchSubmit}
            >
              <div className="flex">
                <input
                  type="text"
                  placeholder="검색어를 입력해주세요."
                  className="flex-grow p-2 border border-gray-300 rounded-l"
                />
                <button
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded-r"
                >
                  검색
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col justify-center items-end space-y-2">
            <Link
              to="/admin/eventmanage"
              className="flex justify-center items-center"
            >
              관리자 페이지
            </Link>
            {isLoggedIn ? (
              <div className="flex space-x-2">
                <button
                  onClick={handleLogout}
                  className="flex justify-center items-center"
                >
                  로그아웃
                </button>
                <Link to="/mypage" className="flex justify-center items-center">
                  마이페이지
                </Link>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="flex justify-center items-center">
                  로그인
                </Link>
                <Link
                  to="/register"
                  className="flex justify-center items-center"
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="bg-blue-500 text-white flex justify-around py-2">
        <Link to="/EventListPage" className={getNavLinkClass("/EventListPage")}>
          행사 둘러보기
        </Link>
        <Link to="/addEvent" className={getNavLinkClass("/addEvent")}>
          행사 등록하기
        </Link>
        <Link to="/BoothListPage" className={getNavLinkClass("/BoothListPage")}>
          부스 둘러보기
        </Link>
      </div>
    </div>
  );
}
