import "./App.scss";
import { Route, useLocation } from "wouter";
import { Layout, PageHeader, Tabs } from "antd";
import Characters from "./pages/Charaters";

const { Header, Footer, Content } = Layout;
const { TabPane } = Tabs;
const BASE_PATH = "/searchs";

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
          <Route path="/searchs" component={Characters} />
        </Content>
      </Layout>
      <Footer className="App__footer">
        <Tabs defaultActiveKey="1" onChange={handlerChangeTab}>
          <TabPane tab="Searchs" key="Searchs" />
          <TabPane tab="Album" key="Album" />
        </Tabs>
      </Footer>
    </Layout>
  );
}
