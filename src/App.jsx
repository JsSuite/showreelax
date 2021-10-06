import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import ShowReelDetail from "./pages/ShowReelDetail";
import ShowReelList from "./pages/ShowReelList";
import { useStore } from "./utils/Store";

function App() {
  const showReelList = useStore((store) => store?.state?.showReelList ?? []);

  React.useEffect(() => {
    localStorage.setItem("showReelList", JSON.stringify(showReelList));
  }, [showReelList]);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={ShowReelList} />
        <Route path="/showreels" exact component={() => <Redirect to="/" />} />
        <Route path="/showreels/:id" exact component={ShowReelDetail} />
        <Route path="/*" exact component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
