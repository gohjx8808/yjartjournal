import useScrollTrigger from "@mui/material/useScrollTrigger";
import { cloneElement } from "react";

interface Props {
  children: React.ReactElement;
}

const ElevationScroll = (props: Props) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

export default ElevationScroll;
