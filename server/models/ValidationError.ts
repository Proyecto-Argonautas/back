import { ZodError, z } from "zod/v4";

export default class ValidationError extends Error {
  constructor(error: ZodError) {
    const prettyfiedErrors = z.prettifyError(error);
    super(prettyfiedErrors);
  }
}
