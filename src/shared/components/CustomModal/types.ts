export type CustomModalProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  ariaDescription?: string;
};
