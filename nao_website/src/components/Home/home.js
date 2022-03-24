import React from "react";

import { MyContext } from "../../context/context";
import MyNavbar from "../Navbar/navbar";

function Home() {
  const context = React.useContext(MyContext);
  console.log("Dans home");
  console.log(context);
  return (
    <>
      <MyNavbar />
    </>
  );
}

export default Home;
