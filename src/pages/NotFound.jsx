import createStyles from "@style-xper/style-xper-jss";
import React from "react";
import { Link } from "react-router-dom";

const styles = createStyles({
  emptyContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "85vh",
  },
  logo: {
    fontSize: "150px",
    fontWeight: "800",
    color: "var(--primary)",
    margin: "0px",
  },
});

export default function NotFound() {
  return (
    <div className={styles?.emptyContainer}>
      <p className={styles?.logo}>404</p>
      <strong>Page Not Found</strong>
      <p>
        Please click <Link to="/">HERE</Link> to go to Home Page.
      </p>
    </div>
  );
}
