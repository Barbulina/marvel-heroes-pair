import { Tabs } from "antd";
import Layout from "antd/lib/layout";
import { useLocation } from "wouter";

const { Footer } = Layout;
const { TabPane } = Tabs;

export default function FooterApp({
  sections,
}: {
  sections: Array<{
    key: string;
    label: string;
    default?: boolean;
    path: string;
  }>;
}): JSX.Element {
  const [location, setLocation] = useLocation();
  const handlerChangeTab = function (value: string): void {
    setLocation(`/${value}`);
  };
  const defaultSection = sections.find((section) => section.default);
  const currentLocation =
    sections.find((section) => section.path === location)?.key ||
    defaultSection?.key;
  return (
    <Footer className="App__footer">
      <Tabs defaultActiveKey={currentLocation} onChange={handlerChangeTab}>
        {sections.map((section) => (
          <TabPane tab={section.label} key={section.key} />
        ))}
      </Tabs>
    </Footer>
  );
}
