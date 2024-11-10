export type FormStructure = {
  id: number;
  label: string;
  name: string;
  type: string;
  validators?: {
    required?: string;
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
};
