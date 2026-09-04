import app from "./app.js";
import { connectToDb } from "./src/db/connect.js";

const PORT = process.env.PORT;

if (!PORT) {
    throw Error("Port is missing.")
}

async function startServer() {
    try {
        await connectToDb()

        app.listen(PORT, () => {
            console.log(`Server started. Listening on port: ${PORT}`);
        });
    } catch(error) {
        console.log("Connection to database failed: ", error.message)
    }
}

await startServer();