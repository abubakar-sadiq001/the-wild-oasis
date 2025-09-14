import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en";
import { useCreateGuest } from "./useCreateGuest";
import { useEditGuest } from "./useEditGuest";

countries.registerLocale(en);

function CreateGuestForm({ guestToEdit = {}, onCloseModal }) {
  const { id: editId, ...guestValuesToEdit } = guestToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, watch, reset, formState } = useForm({
    defaultValues: isEditSession ? guestValuesToEdit : {},
  });

  const { createNewGuest, isCreating } = useCreateGuest();
  const { editGuest, isEditingGuest } = useEditGuest();

  const { errors } = formState;

  const nationality = watch("nationality"); // watch nationality input

  // Convert to ISO2 code
  const countryCode = countries.getAlpha2Code(nationality || "", "en");
  const flagUrl = countryCode
    ? `https://flagcdn.com/${countryCode.toLowerCase()}.svg`
    : "";

  function onSubmit(data) {
    if (isEditSession) {
      editGuest(
        { newGuestData: { ...data, countryFlag: flagUrl }, id: editId },
        {
          onSettled: () => {
            onCloseModal?.();
            reset();
          },
        }
      );
    } else {
      createNewGuest(
        { ...data, countryFlag: flagUrl },
        {
          onSettled: () => {
            onCloseModal?.();
            reset();
          },
        }
      );
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Full name" errors={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isCreating || isEditingGuest}
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email" errors={errors?.email?.message}>
        <Input
          type="text"
          id="email"
          disabled={isCreating || isEditingGuest}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="National id" errors={errors?.nationalID?.message}>
        <Input
          type="number"
          id="nationalID"
          disabled={isCreating || isEditingGuest}
          {...register("nationalID", {
            required: "This field is required",
            min: {
              value: 5,
              message: "Your ID shouldn't be less than 5",
            },
          })}
        />
      </FormRow>

      <FormRow label="Nationality" errors={errors?.nationality?.message}>
        <Input
          type="text"
          id="nationality"
          disabled={isCreating || isEditingGuest}
          {...register("nationality", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Country flag" errors={errors?.countryFlag?.message}>
        <Input
          type="text"
          id="countryFlag"
          disabled
          defaultValue={flagUrl}
          {...register("countryFlag")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isCreating || isEditingGuest}>
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isEditSession ? "Edit guest" : "Create new guest"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
