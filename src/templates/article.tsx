// CSS from UI Library
import "@fchh/fcos-suite-ui/dist/fcos-suite-ui.css";
// Local fonts
import "@fontsource/karla";
import "@fontsource/inter";
import "@fontsource/ibm-plex-sans";
// Local styles
import "../base.css";

import {Article, Footer, Header} from "@fchh/fcos-suite-ui";
import {Home} from "@carbon/icons-react";
import {CarbonIcon} from "../components/CarbonIcon";

// interface ArticleTemplateProps {
//   toolbar: IToolbarItem[];
//   menu: IMenuItem[];
// }

// The article template is for any kind of "article" like content. Could be a blog post, a news post or an event. It is not intended as home page.
export default (props) => {
    console.log("Article Template", props);

    const blocks = props?.page?.content?.text ?? [];

    return (
        <div>
            <Header
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
            />
            <Article
                titleImage={props?.page?.files[0]}
                imageTag={"Copyright 2025"}
                breadcrumbs={props?.breadcrumbs.map((crumb, i) =>
                    i == 0 ? {...crumb, icon: <Home className="size-4"/>} : crumb
                )}
                hideFooterSeparator={true}
                title={props?.page?.content.title}
                subtitle={props?.page?.content.subheading}
                teaser={props?.page.content.teaser}
            >
                <div style={{paddingTop: "4rem"}}>
                    {blocks?.map((block) => {
                        // TODO: Here we need to conditionally render the right frontend component. Probably need a big switch case or object map here
                        return <div key={block.id} dangerouslySetInnerHTML={{__html: block.content.text}}></div>;
                    })}
                </div>
            </Article>
            <Footer menu={props?.menu.children}/>
        </div>
    );
};
