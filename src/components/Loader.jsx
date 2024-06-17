import LoadingBar from "react-redux-loading-bar";

function Loader({ isHomePage }) {
  return (
    <div className={`loader${isHomePage ? " loader_home" : ""}`}>
      <LoadingBar style={{ backgroundColor: "#FFA800", height: "8px" }} />
    </div>
  );
}

export default Loader;
