import './Components/Main/Main.module.scss';
import Main from "./Components/Main/Main";
import {Route} from "react-router-dom";
import Daily from "./Components/Daily/Daily";

function App() {
  return (
    <div>
      <Route path={'/'} exact>
        <Main/>
      </Route>

      <Route path={'/daily'} exact>
        <Daily/>
      </Route>
    </div>
  );
}

export default App;
