import createStyles from "@style-xper/style-xper-jss";
import React from "react";
import { useParams, useHistory } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import VIDEO_CLIPS from "../data/VIDEO_CLIPS";
import Timeframe from "../models/Timeframe";
import { useStore } from "../utils/Store";

const styles = createStyles({
  emptyContainer: {
    display: "flex",
    flexDirection: "column",
  },
  form: {
    padding: "24px",
    width: "100%",
    minHeight: "60vh",
  },
  label: {
    fontSize: "18px",
    fontWeight: "800",
  },
  textField: {
    display: "flex",
    flexDirection: "column",
    padding: "5px",
  },
  input: {
    padding: "8px",
    maxWidth: "410px",
  },
  select: {
    padding: "8px",
    maxWidth: "430px",
  },
  dialogAction: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px 0px",
    width: "100%",
  },
  errorMsg: {
    fontSize: "14px",
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
    width: "100%",
  },
  descAccordion: {
    textDecoration: "underline",
    color: "var(--primary)",
    cursor: "pointer",
  },
  clipsPanel: {
    paddingTop: "14px",
    height: "345px",
    maxWidth: "450px",
    overflowY: "auto",
  },
  checkboxWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  },
});

export default function ShowReelDetail(props) {
  const params = useParams();
  const history = useHistory();
  const showReelList = useStore((store) => store?.state?.showReelList ?? []);
  const setState = useStore((store) => store?.fns?.setState);
  const [showReelDetail, setDetail] = React.useState({});

  const [filteredClips, setFilteredClips] = React.useState(
    VIDEO_CLIPS.filter(
      (v) =>
        v.standard === showReelDetail?.standard &&
        v.definition === showReelDetail?.definition
    )
  );

  const selectedShowReel = showReelList.find((v) => v?.id === params?.id);
  const standard = showReelDetail?.standard;
  const definition = showReelDetail?.definition;

  React.useEffect(() => {
    setFilteredClips(
      VIDEO_CLIPS.filter(
        (v) => v.standard === standard && v.definition === definition
      )
    );

    if (
      selectedShowReel?.definition !== definition ||
      selectedShowReel?.standard !== standard
    ) {
      setDetail((state) => ({
        ...state,
        clips: [],
        totalDuration: new Timeframe(0, standard),
        selected: false,
      }));
    }
  }, [standard, definition, selectedShowReel]);

  React.useEffect(() => {
    if (!selectedShowReel) {
      return history.push("/");
    }
    const totalDuration = new Timeframe(
      selectedShowReel?.totalDuration,
      selectedShowReel?.standard
    );
    setDetail({
      ...selectedShowReel,
      totalDuration,
      clips:
        totalDuration.toMilliSeconds() === 0 ||
        isNaN(totalDuration.toMilliSeconds())
          ? []
          : selectedShowReel?.clips,
    });
  }, [params?.id, history, selectedShowReel]);

  const handleDeleteShowReel = () => {
    const deletingList = showReelList.filter((v) => v.id !== params?.id);
    setState({ showReelList: deletingList });
  };

  const handleClipChange = (e) => {
    let changingClips = showReelDetail?.clips;

    if (!e.target.checked) {
      changingClips = showReelDetail.clips.filter((v) => v !== e.target.name);
    } else if (!showReelDetail?.clips.includes(e.target.name)) {
      changingClips.push(e.target.name);
    }

    let duration = 0;
    const allClips = VIDEO_CLIPS.filter((v) =>
      changingClips.includes(`${v.id}`)
    );
    allClips.forEach((clip) => {
      duration = duration + clip.duration.toMilliSeconds();
    });

    const totalDuration = new Timeframe(duration, showReelDetail?.standard);

    setDetail({
      ...showReelDetail,
      totalDuration,
      selected: true,
      clips: changingClips,
    });
  };

  const handleSeeMore = (index, seeMore) => () => {
    const clonedClips = JSON.parse(
      JSON.stringify(
        filteredClips.map((v) => ({ ...v, duration: v.duration.toString() }))
      )
    );
    clonedClips[index].seeMore = seeMore;
    clonedClips.forEach((clip) => {
      clip.duration = new Timeframe(clip.duration, clip.standard);
    });
    setFilteredClips(clonedClips);
  };

  const handleChangeshowReelDetail = (e) => {
    setDetail({
      ...showReelDetail,
      [e.target.id]: e.target.value,
    });
  };

  const handleUpdateShowReel = () => {
    if (!showReelDetail?.name || !showReelDetail?.clips?.length) {
      return setDetail({
        ...showReelDetail,
        edited: true,
        selected: true,
      });
    }
    const updatingIndex = showReelList.findIndex(
      (v) => v?.id === showReelDetail?.id
    );

    if (updatingIndex < 0) {
      return;
    }

    const clonedList = JSON.parse(JSON.stringify(showReelList));
    clonedList[updatingIndex] = {
      ...showReelDetail,
      totalDuration: showReelDetail.totalDuration.toString(),
    };
    setState({ showReelList: clonedList });
    history.push("/");
  };

  const handleCancel = () => {
    history.push("/");
  };

  const handleDiscard = () => {
    setDetail(selectedShowReel);
  };

  return (
    <div className={styles?.emptyContainer}>
      <div className="row">
        <div className="col-md-6 col-12">
          <Card>
            <div className={styles?.form}>
              <div className={styles.textField}>
                <div>Name</div>
                <input
                  id="name"
                  className={styles.input}
                  value={showReelDetail?.name}
                  onChange={handleChangeshowReelDetail}
                />
                <label className={styles.errorMsg}>
                  {!showReelDetail?.name && !!showReelDetail?.edited
                    ? "*required"
                    : ""}
                </label>
              </div>
              <div className={styles.textField}>
                <div>Video Standard</div>
                <select
                  id="standard"
                  className={styles.select}
                  value={showReelDetail?.standard ?? ""}
                  onChange={handleChangeshowReelDetail}>
                  <option value="PAL">PAL</option>
                  <option value="NTSC">NTSC</option>
                </select>
              </div>
              <div className={styles.textField}>
                <div>Video Definition</div>
                <select
                  id="definition"
                  className={styles.select}
                  value={showReelDetail?.definition ?? ""}
                  onChange={handleChangeshowReelDetail}>
                  <option value="HD">HD</option>
                  <option value="SD">SD</option>
                </select>
              </div>
              <div className={styles.textField}>
                <div>Total Duration</div>
                <input
                  id="totalDuration"
                  className={styles.input}
                  value={showReelDetail?.totalDuration}
                  disabled
                />
              </div>

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
                            checked={showReelDetail.clips.includes(
                              `${clip.id}`
                            )}
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
                        <strong>Duration: {clip.duration.toString()}</strong>
                      </div>
                      <div className={styles?.desc}>
                        <strong>Standard: {clip.standard}</strong>
                      </div>
                      <div className={styles?.desc}>
                        <strong>Definition: {clip.definition}</strong>
                      </div>
                    </Card>
                  ))}
              </div>
              <label className={styles.errorMsg}>
                {!showReelDetail?.clips?.length &&
                !!showReelDetail?.selected ? (
                  "  You are required to select at least one clip."
                ) : (
                  <>&nbsp;</>
                )}
              </label>
            </div>
            <div className={styles.dialogAction}>
              <div className="row">
                <div className="col-md-6 col-12">
                  <Button
                    variant="secondary"
                    onClick={handleCancel}>{`Cancel`}</Button>

                  <Button
                    variant="secondary"
                    onClick={handleDiscard}>{`Discard`}</Button>
                </div>
                <div className="col-md-6 col-12">
                  <Button onClick={handleUpdateShowReel}>{`Save`}</Button>
                  <Button variant="danger" onClick={handleDeleteShowReel}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
