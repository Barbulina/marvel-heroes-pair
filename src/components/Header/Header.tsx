import { Layout, PageHeader } from "antd";
const { Header } = Layout;
export default function HeaderApp({ title }: { title: string }) {
  return (
    <Header className="App__header">
      <PageHeader className="site-page-header" title={title} />
    </Header>
  );
}
