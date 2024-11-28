// IMPORTS
import { HTMLProps, ReactNode } from "react";

export type ImgProps = HTMLProps<HTMLImageElement> & {
  /**
   * Optional fallback to render in place of a missing image
   * @default null
   */
  fallback?: ReactNode;
};
