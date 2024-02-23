import { Form } from "antd";
import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
type TFormConfig = {
  defaultValues?: Record<string, unknown>;
  resolver?: any;
};

type TRFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;
const RForm = ({ onSubmit, children, defaultValues, resolver }: TRFormProps) => {
  const formConfig: TFormConfig = {};
  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }
  if (resolver) {
    formConfig.resolver = resolver;
  }

  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <Form
        onFinish={methods.handleSubmit(submit)}
        layout="vertical"
      >
        {children}
      </Form>
    </FormProvider>
  );
};

export default RForm;
