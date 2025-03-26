// CSS from UI Library
import "@fchh/fcos-suite-ui/style.css";
import "@fchh/fcos-suite-map/style.css";
// Local fonts
import "@fontsource/karla";
import "@fontsource/inter";
import "@fontsource/ibm-plex-sans";
// Local styles
import "../base.css";
import { CarbonIcon } from "../components/CarbonIcon";
import FabCityMap from "@fchh/fcos-suite-map";

import { Header } from "@fchh/fcos-suite-ui";

const MAPBOX_TOKEN = import.meta.env.VITE_PUBLIC_MAPBOX_TOKEN;

export default (props) => {
  console.log("Map Template:", props);

  return (
    <div className="h-full">
      <Header
        disableAnimation
        topBarItems={props?.menu.children}
        toolBarItems={props?.toolbar?.map((item) => ({
          ...item,
          icon: (
            <CarbonIcon
              name={item.icon}
              className="size-6 sm:size-5 sm:mr-2 mb-1 sm:mb-0"
            />
          ),
        }))}
        hideSearchIcon
        backgroundImageClasses="bg-[url('/map-pattern.svg')] bg-cover bg-no-repeat"
        className="!absolute lg:!static"
      />
      <main className="h-full basis-full relative">
        <FabCityMap
          baseUrl={props.basePath}
          data={props.pois.map((poi) => ({
            ...poi,
            tags: [
              {
                id: "12",
                displayName: "Unternehmen",
                color: "hsl(257,60%,80%)",
              },
              {
                id: "13",
                displayName: "Metallwerkstatt",
                color: "hsl(273,60%,80%)",
              },
              {
                id: "9",
                displayName: "Holzwerkstatt",
                color: "hsl(22,60%,80%)",
              },
              { id: "8", displayName: "Workshops", color: "hsl(229,60%,80%)" },
            ],
          }))}
          mapboxToken={MAPBOX_TOKEN}
        />
      </main>
    </div>
  );
};
