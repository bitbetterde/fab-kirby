// CSS from UI Library
import "@fchh/fcos-suite-ui/dist/fcos-suite-ui.css";
// Local fonts
import "@fontsource/karla";
import "@fontsource/inter";
import "@fontsource/ibm-plex-sans";
// Local styles
import "../base.css";

import { Article, Footer, Header } from "@fchh/fcos-suite-ui";
import {
  ApplicationVirtual,
  Calendar,
  Chat,
  ChoroplethMap,
  Folders,
  Home,
} from "@carbon/icons-react";

export default (props) => {
  console.log(props);

  const TOOLBAR_ITEMS = [
    {
      title: "Map",
      icon: (
        <ChoroplethMap className="w-6 sm:w-5 h-6 sm:h-5 sm:mr-2 mb-1 sm:mb-0" />
      ),
      target: "/map",
    },
    {
      title: "Knowledge Hub",
      icon: <Folders className="w-6 sm:w-5 h-6 sm:h-5 sm:mr-2 mb-1 sm:mb-0" />,
      target: "/hub",
      onlyDesktop: true,
    },
    {
      title: "Connect",
      icon: <Chat className="w-6 sm:w-5 h-6 sm:h-5 sm:mr-2 mb-1 sm:mb-0" />,
      target: "/connect",
    },
    {
      title: "Events",
      icon: <Calendar className="w-6 sm:w-5 h-6 sm:h-5 sm:mr-2 mb-1 sm:mb-0" />,
      target: "/events",
    },
    {
      title: "FCOS Core",
      icon: (
        <ApplicationVirtual className="w-6 sm:w-5 h-6 sm:h-5 sm:mr-2 mb-1 sm:mb-0" />
      ),
      target: "/map",
    },
  ];

  return (
    <div>
      <Header
        topBarItems={props?.menu.children}
        toolBarItems={TOOLBAR_ITEMS}
        hideSearchIcon
      />
      <Article
        titleImage={props?.page?.files[0]}
        imageTag={"Copyright 2025"}
        breadcrumbs={[
          { target: "/home", title: "Home", icon: <Home className="size-6" /> },
        ]}
        hideFooterSeparator={true}
        title={props?.page?.content.title}
        subtitle={"abc123"}
        teaser={"Hallo Teaser"}
      >
        <div style={{ paddingTop: "4rem" }}>{props?.page?.content?.text}</div>
      </Article>
      <Footer menu={props?.menu.children} />
    </div>
  );
};
