export interface HttpRequest<B = unknown, P = unknown, Q = unknown> {
  body: B;
  params: P;
  query: Q;
}
