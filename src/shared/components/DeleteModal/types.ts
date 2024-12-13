export type DeleteModalProps = {
  title?: string;
  open: boolean;
  onClose: () => void;
  isLoading: boolean;
  handleRemove: () => void;
  description?: string;
};
