import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCabins } from "../cabins/useCabins";

import { useGuests } from "../../features/guests/useGuests";
import BookingCheckbox from "../../ui/BookingCheckbox";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { useCreateBooking } from "./useCreateBooking";

function CreateBookingForm({ onCloseModal }) {
  const [breakfast, setBreakfast] = useState(null);
  const [isPaid, setIsPaid] = useState(null);

  const { createNewBooking, isCreatingBooking } = useCreateBooking();
  const { cabins } = useCabins();
  const { guests } = useGuests();
  const { register, handleSubmit, reset, formState, watch } = useForm();
  const { errors } = formState;

  const watchBreakfast = watch("hasBreakfast");

  function onSubmit(data) {
    createNewBooking(data, {
      onSettled: () => {
        onCloseModal?.();
        reset();
      },
    });

    // console.log(data);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Start date" errors={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          disabled={isCreatingBooking}
          {...register("startDate", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="End date" errors={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          disabled={isCreatingBooking}
          {...register("endDate", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Num nights" errors={errors?.numNights?.message}>
        <Input
          type="number"
          id="numNights"
          disabled={isCreatingBooking}
          {...register("numNights", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Num guests" errors={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          disabled={isCreatingBooking}
          {...register("numGuests", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin price" errors={errors?.cabinPrice?.message}>
        <Input
          type="number"
          id="cabinPrice"
          disabled={isCreatingBooking}
          {...register("cabinPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Breakfast ?" errors={errors?.hasBreakfast?.message}>
        <BookingCheckbox
          type="checkbox"
          onChange={() => setBreakfast((breakfast) => !breakfast)}
          checked={breakfast}
          disabled={isCreatingBooking}
          id="hasBreakfast"
          {...register("hasBreakfast")}
        />
      </FormRow>

      <FormRow label="Paid ?" errors={errors?.isPaid?.message}>
        <BookingCheckbox
          type="checkbox"
          checked={isPaid}
          onChange={() => setIsPaid((paid) => !paid)}
          disabled={isCreatingBooking}
          id="isPaid"
          {...register("isPaid")}
        />
      </FormRow>

      {watchBreakfast && (
        <FormRow label="Extras price" errors={errors?.extrasPrice?.message}>
          <Input
            type="number"
            id="extrasPrice"
            disabled={!watchBreakfast || isCreatingBooking}
            defaultValue={0}
            {...register("extrasPrice", {
              required: watchBreakfast ? "This field is required" : false,
            })}
          />
        </FormRow>
      )}

      <FormRow label="Total price" errors={errors?.totalPrice?.message}>
        <Input
          type="number"
          id="totalPrice"
          disabled={isCreatingBooking}
          {...register("totalPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Status" errors={errors?.status?.message}>
        <Input
          type="text"
          id="status"
          disabled={isCreatingBooking}
          {...register("status", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Observations" errors={errors?.observations?.message}>
        <Textarea
          type="number"
          id="observations"
          disabled={isCreatingBooking}
          {...register("observations")}
        />
      </FormRow>

      <FormRow label="Cabin ID" errors={errors?.cabinId?.message}>
        <Input
          type="number"
          id="cabinId"
          disabled={isCreatingBooking}
          {...register("cabinId", {
            required: "This field is required",
            validate: (value) =>
              cabins?.some((cabin) => cabin.id === Number(value)) ||
              "Provided cabin ID isn't available",
          })}
        />
      </FormRow>

      <FormRow label="Guest ID" errors={errors?.guestId?.message}>
        <Input
          type="number"
          id="guestId"
          disabled={isCreatingBooking}
          {...register("guestId", {
            required: "This field is required",
            validate: (value) =>
              guests?.some((guest) => guest.id === Number(value)) ||
              "Provided guest ID isn't available",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isCreatingBooking}
        >
          Cancel
        </Button>
        <Button disabled={isCreatingBooking}>Create booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
