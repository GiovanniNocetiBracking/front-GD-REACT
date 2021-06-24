import React from "react";
import { ErrorMessage, useField } from "formik";
import { Label, Input, Col } from "reactstrap";

export const TextField = ({ label, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Label for={field.name} sm={4}>
        {label}
      </Label>
      <Col sm={12}>
        <Input
          type="text"
          placeholder={placeholder}
          {...field}
          {...props}
        ></Input>
        <ErrorMessage component="div" name={field.name} />
      </Col>
    </>
  );
};