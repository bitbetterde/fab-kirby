import { Fragment } from "react";
import * as CarbonIcons from "@carbon/icons-react";

export interface CarbonIconProps {
  name: keyof typeof CarbonIcons;
  className?: string;
}

export const CarbonIcon: React.FC<CarbonIconProps> = ({
  name,
  className,
  ...props
}: CarbonIconProps) => {
  const Comp = CarbonIcons[name];
  return (
    <Fragment>
      {Comp ? <Comp className={className} {...props} /> : null}
    </Fragment>
  );
};
