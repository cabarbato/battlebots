import Sections from "../../views/Sections";
import Picker from "../../views/Picker";
import Robots from "../../views/Robots";
import Versus from "../../views/Versus";

import dataset from "../../assets/data/placeholder.csv";
import { importAll, getRandomEl } from "../../utils";

const images = importAll(
    require.context("../../assets/images/header", true, /\.(png|jpg)$/)
  ),
  content = importAll(
    require.context("../../assets/content/", true, /\.(js|jsx)$/)
  );

const App = () => (
  <div className="App">
    <header className="header">
        <img
          src={getRandomEl(images)["default"]}
          className="header__background"
          alt=""
        />
      <Sections
        className="header__title py-4"
        content={content["header.jsx"]["default"]}
      >
      </Sections>
      <Sections
        as="section"
        id="intro"
        className="header__intro py-4"
        content={content["intro.jsx"]["default"]}
      >
        <Picker dataset={dataset} />
      </Sections>
    </header>
    <main>
      <Robots as="section" className="py-4" />
      <Versus as="section" className="py-4 bg-white" />
    </main>
    <Sections
      as="footer"
      className="footer py-5 bg-white"
      content={content["footer.jsx"]["default"]}
    />
  </div>
);

export default App;
