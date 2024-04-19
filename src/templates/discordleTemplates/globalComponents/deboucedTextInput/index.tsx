import { Input } from 'antd_components';
import React, { useCallback } from 'react';
import * as I from './IDebouncedTextInput';

export default function DebouncedTextInput({
  size,
  style,
  suffix,
  autoFocus,
  placeholder,
  defaultValue,
  handleDebounce,
  onClick,
}: I.IDebouncedTextInput) {
  const debounce = useCallback(
    (func: (value: string) => void, delay: number) => {
      let timerId: NodeJS.Timeout;

      return function (value: string) {
        if (timerId) clearTimeout(timerId);

        timerId = setTimeout(() => {
          func(value);
        }, delay);
      };
    },
    []
  );

  const debouncedFilter = debounce(handleDebounce, 1000);

  function filter(value: string) {
    debouncedFilter(value);
  }

  return (
    <Input
      size={size}
      style={style}
      suffix={suffix}
      onClick={onClick}
      autoFocus={autoFocus}
      placeholder={placeholder}
      onChange={(event) => filter(event.target.value)}
      defaultValue={defaultValue}
    />
  );
}
