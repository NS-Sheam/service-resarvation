import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Controller } from "react-hook-form";

type TRTextAreaInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  [key: string]: any;
};
const RTextAreaInput = ({ label, name, placeholder, ...remaining }: TRTextAreaInputProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <TextArea
            {...remaining}
            {...field}
            name={name}
            // value={value}
            // onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            autoSize={{ minRows: 5, maxRows: 5 }}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default RTextAreaInput;
