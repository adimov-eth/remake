import React, { FC, useCallback } from 'react';
import * as S from './RadioGroup.styles';

export interface RadioOption {
  id: string;
  value: string;
  label: string;
}

export interface IRadioGroupProps {
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  name: string;
}

export const RadioGroup: FC<IRadioGroupProps> = ({
  options,
  selectedValue,
  onChange,
  name,
}) => {
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('RadioGroup onChange called with:', event.target.value);
    onChange(event.target.value);
  }, [onChange]);

  return (
    <S.RadioGroup>
      {options.map((option) => (
        <RadioGroupOption
          key={option.value}
          id={option.id}
          name={name}
          value={option.value}
          label={option.label}
          checked={selectedValue === option.value}
          onChange={handleChange}
        />
      ))}
    </S.RadioGroup>
  );
};

interface RadioGroupOptionProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const RadioGroupOption: FC<RadioGroupOptionProps> = ({
  label,
  ...props
}) => {
  return (
    <S.RadioGroupOption>
      <S.RadioInput
        type="radio"
        {...props}
      />
      <S.RadioLabel htmlFor={props.id}>{label}</S.RadioLabel>
    </S.RadioGroupOption>
  );
};
