import app from "./app.js";
import "dotenv/config";

const PORT = process.env.PORT;

if (!PORT) {
    throw Error("Port is missing.")
}

app.listen(PORT, () => {
    console.log(`Server started. Listening on port: ${PORT}`);
});