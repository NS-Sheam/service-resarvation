import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TRInputProps = {
  type: string;
  name: string;
  label: string;
  disabled?: boolean;
  defaultValue?: string;
  [key: string]: any;
};

const RInput = ({ type, name, label, disabled, defaultValue, ...remainingProps }: TRInputProps) => {
  console.log(defaultValue);

  return (
    <div>
      <Controller
        defaultValue={defaultValue}
        name={name}
        rules={{ required: "This field is required" }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              defaultValue={defaultValue}
              {...remainingProps}
              {...field}
              type={type}
              disabled={disabled}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default RInput;
