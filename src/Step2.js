import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import parsePhoneNumberFromString from "libphonenumber-js";
import MainContainer from "./components/MainContainer";
import Form from "./components/Form";
import Input from "./components/Input";
import PrimaryButton from "./components/PrimaryButton";
import { useData } from "./DataContext";

const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value);
  if (!phoneNumber) return value;
  return phoneNumber.formatInternational();
};

const schema = yup.object({
  email: yup
    .string()
    .email("Email should have correct format")
    .required("Email is a required field"),
});

const Step2 = () => {
  const navigate = useNavigate();
  const { data, setValues } = useData();
  const { handleSubmit, control, watch } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      email: data.email,
      hasPhone: data.hasPhone,
      phoneNumber: data.phoneNumber,
    },
  });

  const hasPhone = watch("hasPhone");

  const onSubmit = (data) => {
    setValues(data);
    navigate("/step3");
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        🦄 Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field, formState }) => (
            <Input
              id="email"
              label="Email"
              error={!!formState?.errors.email?.message}
              helperText={formState?.errors?.email?.message}
              type="email"
              required
              {...field}
            />
          )}
        />
        <Controller
          name="hasPhone"
          control={control}
          render={({ field, formState }) => (
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  defaultChecked={formState.defaultValues.hasPhone}
                  {...field}
                />
              }
              label="Do you have a phone?"
            />
          )}
        />
        {hasPhone && (
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            render={({ field, formState }) => (
              <Input
                id="phonenumber"
                label="Phone Number"
                type="tel"
                error={!!formState?.errors.phoneNumber?.message}
                helperText={formState?.errors?.phoneNumber?.message}
                {...field}
                onChange={(event) => {
                  field.onChange(normalizePhoneNumber(event.target.value));
                }}
              />
            )}
          />
        )}
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default Step2;
