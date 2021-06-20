import React from "react";
import { Container } from "react-bootstrap";

export default function NotFound() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100 text-center" style={{ maxWidth: "500px" }}>
        <h1>Error 404 Pagina no encontrada</h1>
      </div>
    </Container>
  );
}
