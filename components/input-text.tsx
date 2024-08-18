import type { NextPage } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import styles from "./input-text.module.css";

export type InputTextType = {
  className?: string;
  inputText?: string;
};

const InputText: NextPage<InputTextType> = ({ className = "", inputText }) => {
  return (
    <Form className={[styles.inputText, className].join(" ")}>
      <Form.Control type="text" />
    </Form>
  );
};

export default InputText;
