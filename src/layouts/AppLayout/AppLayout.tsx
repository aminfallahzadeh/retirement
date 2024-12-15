// IMPORTS
import { Header } from "@/shared/components/Header";
import { Outlet } from "react-router-dom";
import { SEARCH } from "@/constants/const";
import useToggleState from "@/hooks/useToggleState";
import SearchIcon from "@mui/icons-material/SearchRounded";
import CloseIcon from "@mui/icons-material/CloseRounded";
import { CustomModal } from "@/shared/components/CustomModal";
import { SearchScreen } from "@/screens/SearchScreen";

const AppLayout = () => {
  const [search, toggleSearch] = useToggleState(false);

  return (
    <>
      <CustomModal title={SEARCH} open={search} fullScreen={true}>
        <SearchScreen />
      </CustomModal>

      <main>
        <Header />
        <div className="body">
          <Outlet />
        </div>

        <div onClick={toggleSearch} className="search-btn">
          {search ? <CloseIcon /> : <SearchIcon />}
        </div>
      </main>
    </>
  );
};

export default AppLayout;
