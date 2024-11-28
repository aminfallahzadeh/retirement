declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

// declare module "react" {
//   interface CSSProperties {
//     "--tree-view-color"?: string;
//     "--tree-view-bg-color"?: string;
//   }
// }

declare module "react-viewerjs" {
  import { ReactNode } from "react";

  export interface RViewerProps {
    options?: Record<string>;
    imageUrls: string | string[];
    children: ReactNode;
  }

  export interface RViewerTriggerProps {
    children: ReactNode;
  }

  export class RViewer extends React.Component<RViewerProps> {}
  export class RViewerTrigger extends React.Component<RViewerTriggerProps> {}
}

declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
declare module "*.webp";
