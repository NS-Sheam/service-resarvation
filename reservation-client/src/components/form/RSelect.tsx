import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TRSelectProps = {
  label: string;
  name: string;
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
  disabled?: boolean;
  mode?: "multiple" | "tags" | undefined;
  loading?: boolean;
  defaultValue?: string;
  required?: boolean;
  [key: string]: any;
};

const RSelect = ({
  label,
  name,
  options,
  disabled,
  mode,
  loading,
  required,
  defaultValue,
  ...remaining
}: TRSelectProps) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      rules={{ required: required && "This field is required" }}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...remaining}
            {...field}
            mode={mode}
            options={options}
            disabled={disabled}
            loading={loading}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default RSelect;
