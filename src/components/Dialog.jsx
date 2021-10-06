import createStyles from "@style-xper/style-xper-jss";

const styles = createStyles({
  dialog: {
    background: "white",
    minWidth: "200px",
    minHeight: "100px",
    borderRadius: "8px",
    padding: "12px",
  },
});

export default function Dialog({ children }) {
  return <div className={styles.dialog}>{children}</div>;
}
