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
  // console.log("Poi Template:", props);

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
        organization={props.organization || "frbs"}
      />
      <main className="h-full basis-full relative">
        <FabCityMap
          baseUrl={props.basepath}
          data={props.pois}
          mapboxToken={MAPBOX_TOKEN}
          poiRoutePrefix={""}
          categoryColorMapping={props.categorycolormapping}
          tagColorMapping={props.tagcolormapping}
        />
      </main>
    </div>
    </InertiaLinkWrapper>
  );
};
