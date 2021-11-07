import "./App.scss";
import { Route, useLocation } from "wouter";
import { Layout, PageHeader, Tabs } from "antd";
import Characters from "./pages/CharactersSearch/CharatersSearch";
import Album from "./pages/Album/Album";
import Detail from "./pages/Detail/Detail";

const { Header, Footer, Content } = Layout;
const { TabPane } = Tabs;

export default function App() {
  const title = "Marvel Character";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [location, setLocation] = useLocation();
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
          <Route path="/character/:characterId" component={Detail} />
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
