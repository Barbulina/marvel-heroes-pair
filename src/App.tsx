import "./App.scss";
import { Route } from "wouter";
import { Layout } from "antd";
import CharactersSearch from "./pages/CharactersSearch/CharatersSearch";
import Album from "./pages/Album/Album";
import Detail from "./pages/Detail/Detail";
import HeaderApp from "components/Header/Header";
import FooterApp from "components/FooterApp/FooterApp";
const { Content } = Layout;

const SECTIONS = [
  {
    label: "Album",
    path: "/album",
    key: "album",
    component: Album,
    default: true,
  },
  {
    label: "Searchs",
    path: "/searchs",
    key: "searchs",
    component: CharactersSearch,
  },
];

export default function App() {
  const title = "Character App";

  return (
    <Layout className="App">
      <HeaderApp title={title}></HeaderApp>
      <Layout>
        <Content className="App__container">
          <Route path="/" component={Album} />
          <Route path="/character/:characterId" component={Detail} />
          {SECTIONS.map((section) => (
            <Route
              key={section.key}
              path={section.path}
              component={section.component}
            />
          ))}
        </Content>
      </Layout>
      <FooterApp sections={SECTIONS}></FooterApp>
    </Layout>
  );
}
