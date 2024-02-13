// src/routes/api/index.ts
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ request }) => {
  return new Response('Chat endpoint is working', { status: 200 });
};

export const post: RequestHandler = async ({ request }) => {
  
  return new Response('Method Not Allowed', { status: 405 });
};
