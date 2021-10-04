import createStyles from "@style-xper/style-xper-jss";

const styles = createStyles({
  header: {
    padding: "10px",
    paddingLeft: "30px",
    backgroundColor: "#fff",
    boxShadow: "0 15px 50px 8px rgb(100 44 0 / 7%)",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "800",
    color: "var(--primary)",
  },
});

export default function Header() {
  return (
    <header className={styles.header}>
      <p className={styles.logo}>ShowreelaX</p>
    </header>
  );
}
