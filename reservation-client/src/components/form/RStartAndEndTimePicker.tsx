import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

type TRStartAndEndTimePickerProps = {
  type?: string;
  name: string;
  label?: string;
  disabled?: boolean;
  [key: string]: any;
};

const RStartAndEndTimePicker = ({ type, name, label, disabled, ...remaining }: TRStartAndEndTimePickerProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <TimePicker.RangePicker
              {...remaining}
              use12Hours
              format="h:mm a"
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

export default RStartAndEndTimePicker;
