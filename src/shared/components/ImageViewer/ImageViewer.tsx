// IMPORTS
import { RViewer } from "react-viewerjs";

const options = {
  toolbar: {
    prev: false,
    next: false,
    play: false,
    stop: false,
  },

  title: (imageData) =>
    `(${imageData.naturalWidth} × ${imageData.naturalHeight})`,

  viewed() {
    this.viewer.scale(1.2);
  },
};

export const ImageViewer = ({ url }: { url: string }) => {
  return <RViewer options={options} imageUrls={url} />;
};
