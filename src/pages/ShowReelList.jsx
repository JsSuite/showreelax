import createStyles from "@style-xper/style-xper-jss";
import React from "react";
import { useStore } from "../utils/Store";
import Card from "../components/Card";
import FilmingSvg from "../images/Filming.svg";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import AddNewDialog from "../components/AddNewDialog";

const styles = createStyles({
  container: {
    padding: "10px",
  },
  emptyContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "85vh",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "800",
    color: "var(--primary)",
  },
  subTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "var(--primary)",
  },
});

export default function ShowReelList() {
  const showReelList = useStore((store) => store?.state?.showReelList ?? []);
  const [openNewDialog, setNewDialog] = React.useState(false);
  const history = useHistory();

  const handleAddNewShowreel = () => {
    setNewDialog(true);
  };

  const handleCloseNewShowreel = () => {
    setNewDialog(false);
  };

  const handleRedirectToDetail = (id) => () => {
    history.push(`/showreels/${id}`);
  };

  return (
    <div className={styles?.container}>
      <div className="row">
        {!!showReelList?.length &&
          showReelList.map((showReel) => (
            <div className="col-lg-4 col-md-6 col-12">
              <Card onClick={handleRedirectToDetail(showReel?.id)}>
                <FilmingSvg width={300} />
                <div className={styles?.subTitle}>{showReel?.name}</div>
                <div>Total Duration: {showReel?.totalDuration}</div>
              </Card>
            </div>
          ))}
      </div>
      {!showReelList?.length && (
        <div className={styles?.emptyContainer}>
          <FilmingSvg width={300} />
          <p className={styles?.logo}>
            There is no showreel. Please create one.
          </p>
          <Button onClick={handleAddNewShowreel}>New Showreel</Button>
        </div>
      )}
      <AddNewDialog open={openNewDialog} onClose={handleCloseNewShowreel} />
    </div>
  );
}
