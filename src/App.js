import React from "react";
import "./App.css";
import Stopwatch from "./Stopwatch";
import Container from "react-bootstrap/Container";

const App = () => {
  return (
    <React.Fragment>
      <Container>
        <h1 className="display-1 text-center">Stopwatch</h1>
        <Stopwatch />
      </Container>
    </React.Fragment>
  );
}

export default App;