import createStyles from "@style-xper/style-xper-jss";
import React from "react";
import Modal from "../components/Modal";
import Dialog from "../components/Dialog";

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
  button: {
    padding: "12px",
    background: "var(--primary)",
    color: "white",
    fontSize: "16px",
    fontWeight: "800",
    borderRadius: "12px",
    border: "unset",
    cursor: "pointer",
    margin: "4px",
  },
  buttonSec: {
    background: "white",
    color: "var(--primary)",
    border: "solid 2px var(--primary)",
  },
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
});

const NEWREEL_CONST = {
  name: "",
  standard: "PAL",
  definition: "HD",
};

export default function ShowReelList() {
  const showReelList = store.state?.showReelList ?? [];
  const [openNewDialog, setNewDialog] = React.useState(false);
  const [newReel, setNewReel] = React.useState(NEWREEL_CONST);

  const handleAddNewShowreel = () => {
    setNewDialog(true);
  };

  const handleCloseNewShowreel = () => {
    setNewDialog(false);
  };

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

    const showReelList = store.state?.showReelList ?? [];
    showReelList.push(newReel);
    setStore({ showReelList });
  };

  return (
    <div className={styles?.container}>
      {!!showReelList?.length && <></>}
      {!showReelList?.length && (
        <div className={styles?.emptyContainer}>
          <p className={styles?.logo}>
            There is no showreel. Please create one.
          </p>
          <button className={styles?.button} onClick={handleAddNewShowreel}>
            New Showreel
          </button>
        </div>
      )}
      {openNewDialog && (
        <Modal>
          <Dialog>
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
                <select id="definition" className={styles.select}>
                  <option value="HD">HD</option>
                  <option value="SD">SD</option>
                </select>
              </div>

              <div className={styles.dialogAction}>
                <button className={styles?.button} onClick={handleCreate}>
                  Create
                </button>
                <button
                  className={styles?.button + " " + styles.buttonSec}
                  onClick={handleCloseNewShowreel}>
                  Cancel
                </button>
              </div>
            </form>
          </Dialog>
        </Modal>
      )}
    </div>
  );
}
