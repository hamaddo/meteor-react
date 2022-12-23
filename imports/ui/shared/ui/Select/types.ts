export type Option = {
  label: string;
  value: any;
};

export type Size = 'default' | 'small' | 'medium';

export type AdditionalSelectProps = {
  options?: Option[];
  number?: number;
  name?: string;
  placeholder?: string;
  size?: Size;
  isSearchable?: boolean;
  width?: string;
};
