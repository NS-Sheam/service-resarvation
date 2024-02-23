import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TRInputProps = {
  type: string;
  name: string;
  label: string;
  disabled?: boolean;
};

const RInput = ({ type, name, label, disabled }: TRInputProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
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
