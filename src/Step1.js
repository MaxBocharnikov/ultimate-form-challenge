import React from "react";
import MainContainer from "./components/MainContainer";
import { Typography } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "./components/Input";
import PrimaryButton from "./components/PrimaryButton";
import Form from "./components/Form";
import { useData } from "./DataContext";

const schema = yup.object({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is a required field"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
    .required("Last name is a required field"),
});

const Step1 = () => {
  const navigate = useNavigate();
  const { data, setValues } = useData();
  const { handleSubmit, control } = useForm({
    defaultValues: { firstName: data.firstName, lastName: data.lastName },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setValues(data);
    navigate("step2");
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        🦄 Step 1
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          render={({ field, formState }) => (
            <Input
              id="firstname"
              label="First Name"
              error={!!formState?.errors.firstName?.message}
              helperText={formState?.errors?.firstName?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          render={({ field, formState }) => {
            return (
              <Input
                id="lastname"
                label="Last Name"
                error={!!formState?.errors.lastName?.message}
                helperText={formState?.errors?.lastName?.message}
                {...field}
              />
            );
          }}
        />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default Step1;
