import { Hono } from "hono";
import { requestId } from "hono/request-id";

import { securityHeaders } from "./middleware/security";
import { HomePage, PrivacyPage } from "./ui/pages";

export type Bindings = {
  ASSETS: Fetcher;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", requestId());
app.use("*", securityHeaders);

app.get("/", (c) => c.html(<HomePage />));
app.get("/privacy", (c) => c.html(<PrivacyPage />));
app.get("/healthz", (c) =>
  c.json({
    healthy: true,
    service: "web-product-starter",
    time: new Date().toISOString(),
  }),
);

app.notFound((c) =>
  c.json(
    {
      error: "not_found",
      requestId: c.get("requestId"),
    },
    404,
  ),
);

app.onError((error, c) => {
  console.error(
    JSON.stringify({
      event: "request_failed",
      message: error.message,
      requestId: c.get("requestId"),
    }),
  );

  return c.json(
    {
      error: "internal_error",
      requestId: c.get("requestId"),
    },
    500,
  );
});

export { app };
export default app;
