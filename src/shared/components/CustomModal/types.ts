export type CustomModalProps = {
  title: string;
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  ariaDescription?: string;
  fullScreen?: boolean;
  bigTitle?: boolean;
};
