import Modal from "../components/Modal";
import Dialog from "../components/Dialog";
import createStyles from "@style-xper/style-xper-jss";
import { useStore } from "../utils/Store";
import React from "react";
import { v4 } from "uuid";
import Button from "./Button";
import VIDEO_CLIPS from "../data/VIDEO_CLIPS";
import Card from "./Card";
import Timeframe from "../models/Timeframe";

const NEWREEL_CONST = {
  name: "",
  standard: "PAL",
  definition: "HD",
  clips: [],
  totalDuration: new Timeframe(0, "PAL"),
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
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  name: {
    fontSize: "18px",
    fontWeight: "600",
  },
  desc: {
    fontSize: "14px",
    fontWeight: "400",
    maxWidth: "300px",
    width: "100%",
  },
  descAccordion: {
    textDecoration: "underline",
    color: "var(--primary)",
    cursor: "pointer",
  },
  clipsPanel: {
    maxHeight: "550px",
    overflowY: "auto",
  },
  checkboxWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  },
});

export default function AddNewDialog({ onClose = () => {}, open, ...props }) {
  const showReelList = useStore((store) => store?.state?.showReelList ?? []);
  const setState = useStore((store) => store?.fns?.setState);
  const [newReel, setNewReel] = React.useState(NEWREEL_CONST);
  const [page, setPage] = React.useState("summary");

  const standard = newReel?.standard;
  const definition = newReel?.definition;

  const [filteredClips, setFilteredClips] = React.useState(
    VIDEO_CLIPS.filter(
      (v) => v.standard === standard && v.definition === definition
    )
  );

  React.useEffect(() => {
    setFilteredClips(
      VIDEO_CLIPS.filter(
        (v) => v.standard === standard && v.definition === definition
      )
    );

    setNewReel((state) => ({
      ...state,
      clips: [],
      totalDuration: new Timeframe(0, standard),
      selected: false,
    }));
  }, [standard, definition]);

  const handleChangeNewReel = (e) => {
    setNewReel({
      ...newReel,
      [e.target.id]: e.target.value,
      edited: true,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (newReel?.name === "" || !newReel?.clips?.length) {
      return setNewReel({
        ...newReel,
        edited: true,
        selected: true,
      });
    }
    const addingReel = {
      id: v4(),
      ...newReel,
      totalDuration: newReel?.totalDuration.toString(),
    };

    delete addingReel.selected;
    delete addingReel.edited;

    const concattedList = showReelList.concat(addingReel);
    setState({ showReelList: concattedList });

    setPage("summary");
    setNewReel(NEWREEL_CONST);
    onClose();
  };

  const handleChooseClips = () => {
    if (newReel?.name === "") {
      return setNewReel({
        ...newReel,
        edited: true,
      });
    }
    setPage("clips");
  };

  const handleUpdateSummary = () => {
    setPage("summary");
  };

  const handleClipChange = (e) => {
    let changingClips = newReel?.clips;

    if (!e.target.checked) {
      changingClips = newReel.clips.filter((v) => v !== e.target.name);
    } else if (!newReel?.clips.includes(e.target.name)) {
      changingClips.push(e.target.name);
    }

    let duration = 0;
    const allClips = VIDEO_CLIPS.filter((v) =>
      changingClips.includes(`${v.id}`)
    );
    allClips.forEach((clip) => {
      duration = duration + clip.duration.toMilliSeconds();
    });

    const totalDuration = new Timeframe(duration, newReel?.standard);

    setNewReel({
      ...newReel,
      selected: true,
      clips: changingClips,
      totalDuration,
    });
  };

  const handleSeeMore = (index, seeMore) => () => {
    const clonedClips = JSON.parse(JSON.stringify(filteredClips));
    clonedClips[index].seeMore = seeMore;
    setFilteredClips(clonedClips);
  };

  if (!open) {
    return <></>;
  }

  return (
    <Modal>
      <Dialog>
        {page === "summary" && (
          <div className={styles.form}>
            <span className={styles?.title}>Create new showreel</span>
            <div className={styles.textField}>
              <div>Name</div>
              <input
                id="name"
                className={styles.input}
                value={newReel?.name}
                onChange={handleChangeNewReel}
              />
              <label className={styles.errorMsg}>
                {!newReel?.name && !!newReel?.edited ? (
                  "*required"
                ) : (
                  <>&nbsp;</>
                )}
              </label>
            </div>
            <div className={styles.textField}>
              <div>Video Standard</div>
              <select
                id="standard"
                className={styles.select}
                value={newReel?.standard ?? ""}
                onChange={handleChangeNewReel}>
                <option value="PAL">PAL</option>
                <option value="NTSC">NTSC</option>
              </select>
            </div>
            <div className={styles.textField}>
              <div>Video Definition</div>
              <select
                id="definition"
                className={styles.select}
                value={newReel?.definition ?? ""}
                onChange={handleChangeNewReel}>
                <option value="HD">HD</option>
                <option value="SD">SD</option>
              </select>
            </div>
            <div className={styles.dialogAction}>
              <Button onClick={handleChooseClips}>{"> Next"}</Button>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        )}
        {page === "clips" && (
          <div className={styles.form}>
            <span className={styles?.title}>
              Select one or more video clips
            </span>
            <div className={styles?.clipsPanel}>
              {!!filteredClips?.length &&
                filteredClips.map((clip, index) => (
                  <Card dense kye={clip?.id}>
                    <div className={styles?.checkboxWrapper}>
                      <label class="checkbox-input">
                        {clip?.name}
                        <input
                          type="checkbox"
                          name={`${clip?.id}`}
                          checked={newReel.clips.includes(`${clip.id}`)}
                          onChange={handleClipChange}
                        />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                    <div className={styles?.desc}>
                      {clip?.description?.length > 38 ? (
                        !clip?.seeMore ? (
                          <>
                            {clip?.description.substring(0, 38)}{" "}
                            <span
                              className={styles?.descAccordion}
                              onClick={handleSeeMore(index, true)}>
                              ..See more
                            </span>
                          </>
                        ) : (
                          <>
                            {clip?.description}{" "}
                            <span
                              className={styles?.descAccordion}
                              onClick={handleSeeMore(index, false)}>
                              See less
                            </span>
                          </>
                        )
                      ) : (
                        clip?.description
                      )}
                    </div>
                    <div className={styles?.desc}>
                      Duration: {clip.duration.toString()}
                    </div>
                  </Card>
                ))}
            </div>
            <label className={styles.errorMsg}>
              {!newReel?.clips?.length && !!newReel?.selected ? (
                "  You are required to select at least one clip."
              ) : (
                <>&nbsp;</>
              )}
            </label>
            <div>
              <strong>
                Total Duration of Showreel: {newReel.totalDuration.toString()}
              </strong>
            </div>
            <div className={styles.dialogAction}>
              <Button onClick={handleCreate}>{"Create"}</Button>
              <Button variant="secondary" onClick={handleUpdateSummary}>
                {"< Back"}
              </Button>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </Modal>
  );
}
