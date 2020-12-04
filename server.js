const express = require("express");
const app = express();
const port = 5000;
app.get('/api/posts', (req, res) => { // TODO Tee mongodb
    const posts = [
        {id: 1, poster: "Johnny", message: "Hello World!"},
        {id: 2, poster: "Timothy", message: "This is fun!"}
    ];
    res.json(posts);
}) ;
app.listen(port, () => console.log(`Server started on port ${port}`));