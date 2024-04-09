import React from "react";
import Header from "./app/_components/Header";

function Provider({ children }) {
  return (
    <div>
      <Header />
      <div className="top160">{children}</div>
    </div>
  );
}

export default Provider;
