/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
type ErrorType = {
  response: {
    data: string
  },

};
export function isTypicalError(
  error: unknown
): error is ErrorType {
  return typeof error === 'object' && error != null;
}
