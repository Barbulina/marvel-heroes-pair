import "./App.scss";
import { Route, useLocation } from "wouter";
import { Layout, PageHeader, Tabs } from "antd";
import Characters from "./pages/CharactersSearch/CharatersSearch";
import Album from "./pages/Album/Album";

const { Header, Footer, Content } = Layout;
const { TabPane } = Tabs;
const BASE_PATH = "/album";

export default function App() {
  const title = "Marvel Character";
  const [location, setLocation] = useLocation();
  if (location === "/") setLocation(BASE_PATH);

  const handlerChangeTab = function (value: string): void {
    setLocation(`/${value}`);
  };
  return (
    <Layout className="App">
      <Header className="App__header">
        <PageHeader className="site-page-header" title={title} />
      </Header>
      <Layout>
        <Content className="App__container">
          <Route path="/" component={Album} />
          <Route path="/album" component={Album} />
          <Route path="/searchs" component={Characters} />
        </Content>
      </Layout>
      <Footer className="App__footer">
        <Tabs defaultActiveKey="1" onChange={handlerChangeTab}>
          <TabPane tab="Album" key="Album" />
          <TabPane tab="Searchs" key="Searchs" />
        </Tabs>
      </Footer>
    </Layout>
  );
}
