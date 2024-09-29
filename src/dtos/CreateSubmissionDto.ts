import { z } from "zod";

//separate interface:- no need this time but we have if we need in future
// export interface CreateSubmissionDto {
//     userId : string,
//     problemId : string,
//     code : string,
//     language : string
// };

//type of createsubmissionDto :- we can define from a zod method called infer
export type CreateSubmissionDto = z.infer<typeof CreateSubmissionZodSchema>

//zod schema
export const CreateSubmissionZodSchema = z.object({
    userId: z.string(),
    problemId: z.string(),
    code: z.string(),
    language: z.string(),

}).strict();
// through strict we cannot add extra key or property into it.
