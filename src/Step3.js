import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import FileImport from "./components/FileImport";
import { useForm } from "react-hook-form";
import PrimaryButton from "./components/PrimaryButton";
import Form from "./components/Form";
import MainContainer from "./components/MainContainer";
import { useData } from "./DataContext";

const Step3 = () => {
  const navigate = useNavigate();
  const { data, setValues } = useData();
  const { handleSubmit, control } = useForm({
    mode: "onBlur",
    defaultValues: {
      files: data.files || [],
    },
  });

  const onSubmit = (data) => {
    setValues(data);
    navigate("/result");
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        🦄 Step 3
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FileImport control={control} name="files" />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default Step3;
