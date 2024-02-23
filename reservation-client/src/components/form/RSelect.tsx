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
  [key: string]: any;
};

const RSelect = ({ label, name, options, disabled, mode, loading, defaultValue, ...remaining }: TRSelectProps) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
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
