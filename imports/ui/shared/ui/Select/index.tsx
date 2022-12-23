import React, { forwardRef, ReactElement, Ref } from 'react';

import ReactSelect, { SelectInstance, Props, GroupBase } from 'react-select';

import { AdditionalSelectProps, Option } from './types';

const SelectRef = <O extends Option = Option, B extends boolean = false, G extends GroupBase<O> = GroupBase<O>>(
  props: Props<O, B, G> & AdditionalSelectProps,
  ref: Ref<SelectInstance<O, B, G>>
) => {
  return <ReactSelect {...props} ref={ref} placeholder={props.placeholder ?? 'Выберите'} />;
};

export const Select = forwardRef(SelectRef) as <
  O extends Option = Option,
  B extends boolean = false,
  G extends GroupBase<O> = GroupBase<O>
>(
  props: Props<O, B, G> & AdditionalSelectProps & { ref?: Ref<SelectInstance<O, B, G>> }
) => ReactElement;
