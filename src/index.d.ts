import express from 'express';

export {};

declare global {
  type ParsedRequest<P, Q, B> = express.Request & {
    params?: P;
    query?: Q;
    body?: B;
  };
}
