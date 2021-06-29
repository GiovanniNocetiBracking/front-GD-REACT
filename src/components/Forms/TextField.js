import React from "react";
import { ErrorMessage, useField } from "formik";
import { Label, Input, Col } from "reactstrap";

export const TextField = ({ label, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Label for={field.name} sm={12}>
        {label}
      </Label>
      <Col sm={12}>
        <Input
          className={`form-control shadow-none ${
            meta.touched && meta.error && "is-invalid"
          }`}
          type="text"
          placeholder={placeholder}
          {...field}
          {...props}
        ></Input>
        <ErrorMessage
          component="div"
          name={field.name}
          className="text-danger mt-2"
        />
      </Col>
    </>
  );
};
