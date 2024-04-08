import React from "react";
import Header from "./app/_components/Header";

function Provider({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Provider;
