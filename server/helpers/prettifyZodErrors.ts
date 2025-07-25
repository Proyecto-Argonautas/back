import { z } from 'zod/v4';

export default function prettifyZodErrors(error: z.ZodError, separator = ', ') {
  if (error.issues.length === 1 && error.issues[0].path.length === 0) {
    return error.issues[0].message;
  }

  const errors = error.issues.reduce((acc, issue) => {
    const path = issue.path[0] as string;
    if (path in acc) {
      acc[path] += `${separator}${issue.message}`;
      return acc;
    }

    return {
      ...acc,
      [path]: issue.message,
    };
  }, {} as { [key: string]: string });
  return errors;
}
