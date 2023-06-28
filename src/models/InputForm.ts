export interface InputForm {
  value: string;
  isInvalid: boolean;
}

export const setValueInput = (input: InputForm, text: string): InputForm => {
  const newInput: InputForm = {...input, value: text};
  return newInput;
};

export const setIsInvalid = (
  input: InputForm,
  isInvalid: boolean,
): InputForm => {
  const newInput: InputForm = {...input, isInvalid: isInvalid};
  return newInput;
};

export const getIsInValid = (input: InputForm): boolean => {
  const isInvalid: boolean = input.value.length <= 0;
  return isInvalid;
};
