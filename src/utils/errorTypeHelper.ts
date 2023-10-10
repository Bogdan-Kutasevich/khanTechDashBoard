/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
type ErrorType = {
  status: number,
  data: {
    error: string,
    message: string,
    statusCode: number
  }
};
export function isTypicalError(
  error: unknown
): error is ErrorType {
  return typeof error === 'object' && error != null && 'status' in error;
}
