import createStyles from "@style-xper/style-xper-jss";

const styles = createStyles({
  button: {
    padding: "12px",
    background: "var(--primary)",
    color: "white",
    minWidth: "100px",

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
});

export default function Button({ children, variant = "primary", ...props }) {
  return (
    <button
      className={
        styles?.button + (variant === "secondary" ? ` ${styles.buttonSec}` : "")
      }
      {...props}>
      {children}
    </button>
  );
}
