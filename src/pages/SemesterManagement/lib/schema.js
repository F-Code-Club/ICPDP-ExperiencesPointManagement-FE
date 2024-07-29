import dayjs from "dayjs";
import { z } from "zod";

export const AddSemesterFormSchema = z
  .object({
    year: z.coerce
      .number()
      .int()
      .min(dayjs().year() - 5, { message: "Year must be in appropriate range" })
      .max(dayjs().year() + 5, { message: "Year must be in appropriate range" })
      .safe(),
    springStartDate: z.instanceof(dayjs, { message: "Date is required" }),
    springEndDate: z.instanceof(dayjs, { message: "Date is required" }),
    summerStartDate: z.instanceof(dayjs, { message: "Date is required" }),
    summerEndDate: z.instanceof(dayjs, { message: "Date is required" }),
    fallStartDate: z.instanceof(dayjs, { message: "Date is required" }),
    fallEndDate: z.instanceof(dayjs, { message: "Date is required" }),
  })
  .refine((values) => values.springStartDate.year() === values.year, {
    message: "Spring start year must be the same as chosen year",
    path: ["springStartDate"],
  })
  .refine((values) => values.summerStartDate.year() === values.year, {
    message: "Summer start year must be the same as chosen year",
    path: ["summerStartDate"],
  })
  .refine((values) => values.fallStartDate.year() === values.year, {
    message: "Fall start year must be the same as chosen year",
    path: ["fallStartDate"],
  });

export const EditSemesterFormSchema = z.object({
  startDate: z.instanceof(dayjs, { message: "Date is required" }),
  endDate: z.instanceof(dayjs, { message: "Date is required" }),
});
