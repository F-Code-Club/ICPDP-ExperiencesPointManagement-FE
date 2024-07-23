import dayjs from "dayjs";
import { z } from "zod";

export const AddSemesterFormSchema = z.object({
  year: z.coerce
    .number()
    .int()
    .min(2000)
    .max(dayjs().year() + 10)
    .safe(),
  springStartDate: z.instanceof(dayjs),
  springEndDate: z.instanceof(dayjs),
  summerStartDate: z.instanceof(dayjs),
  summerEndDate: z.instanceof(dayjs),
  fallStartDate: z.instanceof(dayjs),
  fallEndDate: z.instanceof(dayjs),
});

export const EditSemesterFormSchema = z.object({
  startDate: z.instanceof(dayjs),
  endDate: z.instanceof(dayjs),
});
