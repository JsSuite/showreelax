import createStyles from "@style-xper/style-xper-jss";
import React from "react";
import { useParams, useHistory } from "react-router-dom";
import Card from "../components/Card";
import { useStore } from "../utils/Store";

const styles = createStyles({
  emptyContainer: {
    display: "flex",
    flexDirection: "column",
    height: "85vh",
    padding: "24px",
  },
  form: {
    padding: "24px",
  },
  label: {
    fontSize: "18px",
    fontWeight: "800",
  },
});

export default function ShowReelDetail(props) {
  const params = useParams();
  const history = useHistory();
  const showReelList = useStore((store) => store?.state?.showReelList ?? []);
  const [showReelDetail, setDetail] = React.useState({});

  React.useEffect(() => {
    const selectedShowReel = showReelList.find((v) => v?.id === params?.id);
    if (!selectedShowReel) {
      return history.push("/");
    }
    setDetail(selectedShowReel);
  }, [params?.id, history, showReelList]);

  return (
    <div className={styles?.emptyContainer}>
      <Card>
        <form>
          <label className={styles?.label}>ID</label>
          <div>{showReelDetail?.id}</div>
        </form>
      </Card>
    </div>
  );
}
