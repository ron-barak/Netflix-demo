import CreateMovie from "./movieComponents/createMovie";

const MainNav = ({
  setDataFromServer,
  userConnected,
  handleSearchField,
  orderBySelectVal,
}) => {
  return (
    <nav className="container main-nav">
      <div className="row align-items-center" style={{ marginTop: "150px" }}>
        <div className="mr-auto p-2">
          <CreateMovie
            setDataFromServer={setDataFromServer}
            userConnected={userConnected}
          />
        </div>

        <form className="form-inline search-form p-2">
          <label>
            <input
              onChange={(e) => handleSearchField(e.target.value)}
              autoComplete="off"
              type="search"
              className="search-field "
              placeholder=" Search…"
              name="inputValue"
            />
          </label>
          <input type="submit" className="search-submit" value="Search" />
        </form>
        <select
          className="custom-select text-white "
          aria-label="Default select example"
          onChange={(e) => orderBySelectVal(e.target.value)}
          name="selectValue"
        >
          <option value="release_date">New</option>
          <option value="title">Title</option>
          <option value="vote_average">Vote average</option>
        </select>
      </div>
    </nav>
  );
};
export default MainNav;
