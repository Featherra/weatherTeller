import express from 'express';
import path from 'path';
import  {fileURLToPath} from 'url';


const app = express();
const PORT = 3000;

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);



// server static files from the 'public' folder
app.use(express.static(path.join(_dirname, 'public')));

// serve index.html directly
app.get("/", (req, res) => {
    res.sendFile(path.join(_dirname, "public", "index.html"));
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})



