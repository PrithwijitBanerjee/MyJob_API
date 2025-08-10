import app from "./app.js"
import dev from "./config/config.js";
import { connnectDB } from "./config/db_config.js";

const PORT = dev.app.apiPort;

/** ... Bind app with port no ... **/
app.listen(PORT, async () => {
    console.log(`Server is running at: ${dev.app.baseUrl}:${dev.app.apiPort}`);
    await connnectDB();
});