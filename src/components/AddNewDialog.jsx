import Modal from "../components/Modal";
import Dialog from "../components/Dialog";
import createStyles from "@style-xper/style-xper-jss";
import { useStore } from "../utils/Store";
import React from "react";
import { v4 } from "uuid";
import Button from "./Button";
import VIDEO_CLIPS from "../data/VIDEO_CLIPS";
import Card from "./Card";

const NEWREEL_CONST = {
  name: "",
  standard: "PAL",
  definition: "HD",
};

const styles = createStyles({
  form: {
    padding: "10px",
    minWidth: "300px",
  },
  textField: {
    display: "flex",
    flexDirection: "column",
    padding: "5px",
  },
  input: {
    padding: "8px",
    width: "92%",
  },
  select: {
    padding: "8px",
    width: "99%",
  },
  dialogAction: {
    display: "flex",
    padding: "10px 0px",
  },
  errorMsg: {
    fontSize: "12px",
    color: "red",
  },
  name: {
    fontSize: "18px",
    fontWeight: "600",
  },
  desc: {
    fontSize: "14px",
    fontWeight: "400",
    maxWidth: "300px",
  },
  clipsPanel: {
    maxHeight: "550px",
    overflowY: "auto",
  },
});

export default function AddNewDialog({ onClose = () => {}, open, ...props }) {
  const showReelList = useStore((store) => store?.state?.showReelList ?? []);
  const setState = useStore((store) => store?.fns?.setState);
  const [newReel, setNewReel] = React.useState(NEWREEL_CONST);
  const [page, setPage] = React.useState("summary");

  const filteredClips = VIDEO_CLIPS.filter(
    (v) =>
      v.standard === newReel?.standard && v.definition === newReel?.definition
  );

  const handleChangeNewReel = (e) => {
    setNewReel({
      ...newReel,
      [e.target.id]: e.target.value,
      edited: true,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (newReel?.name === "") {
      return;
    }
    const addingReel = {
      id: v4(),
      ...newReel,
    };
    const concattedList = showReelList.concat(addingReel);
    setState({ showReelList: concattedList });
    onClose();
  };

  const handleChooseClips = () => {
    setPage("clips");
  };

  const handleUpdateSummary = () => {
    setPage("summary");
  };

  if (!open) {
    return <></>;
  }

  return (
    <Modal>
      <Dialog>
        {page === "summary" && (
          <form className={styles.form}>
            <div className={styles.textField}>
              <div>Name</div>
              <input
                id="name"
                className={styles.input}
                value={newReel?.name}
                onChange={handleChangeNewReel}
              />
              <label className={styles.errorMsg}>
                {!newReel?.name && !!newReel?.edited && "*required"}
              </label>
            </div>
            <div className={styles.textField}>
              <div>Video Standard</div>
              <select
                id="standard"
                className={styles.select}
                onChange={handleChangeNewReel}>
                <option value="PAL">PAL</option>
                <option value="PAL">NTSC</option>
              </select>
            </div>
            <div className={styles.textField}>
              <div>Video Definition</div>
              <select
                id="definition"
                className={styles.select}
                onChange={handleChangeNewReel}>
                <option value="HD">HD</option>
                <option value="SD">SD</option>
              </select>
            </div>

            <div className={styles.dialogAction}>
              <Button onClick={handleChooseClips}>Next</Button>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        )}
        {page === "clips" && (
          <form className={styles.form}>
            <div className={styles?.clipsPanel}>
              {!!filteredClips?.length &&
                filteredClips.map((clip) => (
                  <Card dense>
                    <input type="checkbox" />
                    <div className={styles?.name}>{clip?.name}</div>
                    <div className={styles?.desc}>{clip?.description}</div>
                  </Card>
                ))}
            </div>
            <div className={styles.dialogAction}>
              <Button onClick={handleUpdateSummary}>Back</Button>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Dialog>
    </Modal>
  );
}
