import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { AddRounded, ExploreRounded } from "@mui/icons-material";
import Button from "./button";
import logo from "../assests/logo5.png";

const Container = styled.div`

  flex: 1;
  margin : 1rem;
  border-radius: 10px;
  box-shadow: 0 0 20px 4px rgba(50, 50, 50, 0.5); /* Highly blurred shadow spreading in all directions */
  background: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.text_primary};
  font-weight: bold;
  font-size: 25px;
  padding: 14px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 600px) {
    padding: 10px 12px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 70px; // Adjust the height as needed
  margin-right: 0; // Space between the logo and the name
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");

  return (
    <Container>
      <LogoContainer>
        <Logo src={logo} alt="Logo" /> 
        <span>Brahm.Ai</span>
      </LogoContainer>
      {path[1] === "post" ? (
        <Button
          onClick={() => navigate("/")}
          text="Explore Posts"
          leftIcon={
            <ExploreRounded
              style={{
                fontSize: "18px",
              }}
            />
          }
          type="secondary"
        />
      ) : (
        <Button
          onClick={() => navigate("/post")}
          text="Create new post"
          leftIcon={
            <AddRounded
              style={{
                fontSize: "18px",
              }}
            />
          }
        />
      )}
    </Container>
  );
};

export default Navbar;
