/**
 * Entry point for the API Gateway service.
 *
 * - Imports and starts the Express app
 * - Listens on the specified port and logs service status
 */

import { app } from "./app.js";

const PORT = 4009;
app.listen(PORT, () => console.log(`[API Gateway] running on port ${PORT}`));
