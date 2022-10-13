import React, { useState } from "react";
import "../App.css";

const profileInfo = () => {
  return (
    <>
      <div className="profile">
        <img src={require("./profileIcon.png")} class="ProfileImage" />
      </div>
    </>
  );
};

export default profileInfo;
