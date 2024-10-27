// MUI
import { IconButton } from "@mui/material";
import { CloseOutlined as CloseIcon } from "@mui/icons-material";

function SearchScreen({ setSearch }) {
  const clickHandler = () => {
    setSearch(false);
  };

  return (
    <section className="search__screen flex-col">
      <div className="search__screen--close">
        <IconButton color="error" onClick={clickHandler}>
          <CloseIcon />
        </IconButton>
      </div>

      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>جستجو
        </h4>
      </div>
    </section>
  );
}

export default SearchScreen;
