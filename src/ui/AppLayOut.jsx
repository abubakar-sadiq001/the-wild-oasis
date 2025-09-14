import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { useEffect, useState } from "react";

const StyledApplayout = styled.div`
  display: grid;
  /* grid-template-columns: 26rem 1fr; */
  /* grid-template-columns: repeat(2, 1fr); */
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayOut() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(function () {
    function handleMouse(e) {
      setPos({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("mousemove", handleMouse);

    return function () {
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  /*
  
   style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          width: 20,
          height: 20,
          backgroundColor: "red",
          borderRadius: "50%",
          pointerEvents: "none",
        }}

  */

  return (
    <StyledApplayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledApplayout>
  );
}

export default AppLayOut;
