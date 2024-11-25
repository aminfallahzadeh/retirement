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

declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
declare module "*.webp";
