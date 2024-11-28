// IMAGES
import { useState, useEffect } from "react";
import { ImgProps } from "./types";

/**
 * We extend <img>'s properties as we want our
 * component to act as a drop-in replacement for it
 */

export function Img(props: ImgProps) {
  const { fallback = null } = props;

  /**
   * is our image broken?
   */
  const [isBroken, setIsBroken] = useState(false);

  function handleError() {
    setIsBroken(true);
  }

  // EFFECTS
  useEffect(() => {
    setIsBroken(false);
  }, [props.src]);

  if (isBroken) {
    return fallback;
  }

  return <img onError={handleError} {...props} />;
}
