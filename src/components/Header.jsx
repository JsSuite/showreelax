import createStyles from "@style-xper/style-xper-jss";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../utils/Store";
import AddNewDialog from "./AddNewDialog";
import Button from "./Button";

const styles = createStyles({
  header: {
    padding: "10px",
    paddingLeft: "30px",
    backgroundColor: "#fff",

    boxShadow: "0 25px 50px -10px rgb(100 44 0 / 7%)",
    position: "sticky",
    top: "0px",
    display: "flex",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "800",
    color: "var(--primary)",
  },
  buttonSlot: {
    position: "absolute",
    top: "24px",
    right: "8px",
  },
});

export default function Header() {
  const location = useLocation();
  const showReelList = useStore((store) => store?.state?.showReelList ?? []);
  const [openNewDialog, setNewDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setNewDialog(false);
  };

  const handleOpenDialog = () => {
    setNewDialog(true);
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <p className={styles.logo}>ShowreelaX</p>
      </Link>
      <div className={styles?.buttonSlot}>
        {!!showReelList?.length && location.pathname === "/" && (
          <Button onClick={handleOpenDialog}>+ New Showreel</Button>
        )}
      </div>
      <AddNewDialog open={openNewDialog} onClose={handleCloseDialog} />
    </header>
  );
}
