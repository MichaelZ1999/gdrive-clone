// import React from "react";
// import { Container } from "react-bootstrap";

// const CenteredContainer = ({ children }) => {
//   return <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
//     <div className="w-100" style={{ maxWidth: "400px" }}>{children}
//         </div>
//     </Container>;
// };

// export default CenteredContainer;
import React, { ReactNode } from "react";
import { Container } from "react-bootstrap";

interface CenteredContainerProps {
  children: ReactNode;
}

const CenteredContainer: React.FC<CenteredContainerProps> = ({ children }) => {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {children}
      </div>
    </Container>
  );
};

export default CenteredContainer;
