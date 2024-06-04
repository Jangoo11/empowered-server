import app from './app';
import serverless from "serverless-http";

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

export const handler = serverless(app);

