import { z } from 'zod';
import { insertDesignIdeaSchema, insertOrderSchema, designIdeas, orders } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  designIdeas: {
    list: {
      method: 'GET' as const,
      path: '/api/design-ideas',
      responses: {
        200: z.array(z.custom<typeof designIdeas.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/design-ideas',
      input: insertDesignIdeaSchema,
      responses: {
        201: z.custom<typeof designIdeas.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    generateImage: {
      method: 'POST' as const,
      path: '/api/design-ideas/generate',
      input: z.object({ prompt: z.string() }),
      responses: {
        200: z.object({ imageUrl: z.string() }),
        500: errorSchemas.internal,
      },
    },
  },
  orders: {
    create: {
      method: 'POST' as const,
      path: '/api/orders',
      input: insertOrderSchema,
      responses: {
        201: z.custom<typeof orders.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

// ============================================
// REQUIRED: buildUrl helper
// ============================================
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

// ============================================
// TYPE HELPERS
// ============================================
export type CreateDesignIdeaInput = z.infer<typeof api.designIdeas.create.input>;
export type CreateOrderInput = z.infer<typeof api.orders.create.input>;
