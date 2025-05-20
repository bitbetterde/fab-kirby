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
import { InertiaLinkWrapper } from "../components/InertiaLinkWrapper";

const MAPBOX_TOKEN = import.meta.env.VITE_PUBLIC_MAPBOX_TOKEN;

export default (props) => {
  // console.log("Map Template:", props);

  return (
    <InertiaLinkWrapper>
      <div className="h-full">
        <Header
          disableAnimation
          topBarItems={props?.menu.children}
          toolBarItems={props?.toolbar?.map((item) => ({
            ...item,
            icon: (
              <CarbonIcon
                name={item.icon}
                className="size-6 sm:size-5 sm:mr-2 mb-1 sm:mb-0 shrink-0"
              />
            ),
          }))}
          hideSearchIcon
          backgroundImageClasses="bg-[url('/assets/map-pattern.svg')] bg-cover bg-no-repeat"
          className="!static"
          itemsAlwaysLight
          organization="frbs"
        />
        <main className="h-[calc(100%-56px)] lg:h-[calc(100%-155px)] basis-full relative">
          <FabCityMap
            baseUrl={props.basePath}
            data={props.pois}
            mapboxToken={MAPBOX_TOKEN}
            poiRoutePrefix={""}
            categoryColorMapping={props.categoryColorMapping}
            tagColorMapping={props.tagColorMapping}
          />
        </main>
      </div>
    </InertiaLinkWrapper>
  );
};
