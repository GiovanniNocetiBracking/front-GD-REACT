import React from "react";
import { ErrorMessage, useField } from "formik";
import { 
  Label,
  Input,
  Col
} from "reactstrap";

export const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Label        
       for={field.name}       
       sm={2}
      >
        {label}
      </Label>
      <Col sm={10}>
      <Input     
        {...field}
        {...props}
      />
      </Col>
      <ErrorMessage
        component="div"
        name={field.name}
      />
    </>
  );
};
