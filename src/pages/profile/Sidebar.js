import React from "react";
import { Paper, Box, Typography, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import styled from "styled-components";
import { sidemenu } from "./sidebardata";
import { NavLink } from "react-router-dom";

const MySidebarWrapper = styled.div`
  display: flex;
  max-width: 270px;
  width: 100%;
  max-height: 100vh;
  height: 100%;
  background: #ffffff;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  box-shadow: 0px 2px 16px rgba(61, 61, 61, 0.06);
  border-radius: 10px;
  flex-direction: column;
`;
const MyTitle = styled.h4`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 33px;
  color: #3d3d3d;
  border-bottom: 1px solid #ebebeb;
  padding: 2rem;
`;
const MySidebar = styled.ul`
  list-style: none;
  padding: 0px;
`;
const MySideMenu = styled.li`
  display: flex;
  max-height: 100%;
  border-bottom: 1px solid #ebebeb;
  height: 61px;
  padding: 15px 0 15px 30px;
  width: 100%;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #3d3d3d;
`;

const useStyle = makeStyles({
  bottomLine: {
    display: "block",
    width: "50px",
    borderBottom: "  0.1rem solid #3D3D3D",
  },
});
const Sidebar = () => {
  const classes = useStyle();

  console.log("id", window.location);
  return (
    <MySidebarWrapper>
      <MyTitle>
        About You
        <span className={classes.bottomLine}></span>
      </MyTitle>
      <MySidebar>
        {sidemenu.map((i) => (
          <NavLink
            to={i.link}
            key={i.id}
            className={({ isActive }) => (isActive ? "sidebarActive" : "")}
          >
            <MySideMenu> {i.title} </MySideMenu>
          </NavLink>
        ))}
      </MySidebar>
    </MySidebarWrapper>
  );
};
export default Sidebar;
