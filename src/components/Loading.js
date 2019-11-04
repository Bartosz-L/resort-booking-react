import React from "react";
import loadingGif from "../static/images/gif/loading-arrow.gif";

const Loading = () => {
  return (
    <div className="loading">
      <h4>rooms data loading...</h4>
      <img src={loadingGif} alt="loading gif" />
    </div>
  );
};

export default Loading;
