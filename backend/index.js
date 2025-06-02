// const port = 4000;
// const express = require("express");
// const app = new express();
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");

// const cors = require("cors");
// const path = require("path");
// const fs = require("fs");

// app.use(express.json());
// app.use(cors());

// app.post('/search', async (req,res)=>{
//     const search=req.body.search;
//     if(search){
//         res.status(201).json(`https://api.github.com/search/repositories?q=${encodeURIComponent(search)}`)
//     }
// })

// app.listen(port,()=>{
//     console.log("Server running on port: "+port);
// })



const port = 4000;
const express = require("express");
const app = express(); // Remove "new"
const axios = require("axios");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post('/search', async (req, res) => {
    const search = req.body.search;
    if (!search) {
        return res.status(400).json({ error: "Search term is required" });
    }
    const githubSearchURL = ` https://api.github.com/search/repositories?q=${encodeURIComponent(search)}`;
    const response = await axios.get(githubSearchURL);
    res.status(200).json(response.data);
    res.redirect(githubSearchURL);
});


app.post('/search/users', async (req,res)=>{
    const search = req.body.search;
    if(!search){
        return res.status(400).json({error:'Search query is required'});
    }
    try{
        const response = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(search)}`);
        // const data = await response.json();
        res.status(200).json(response.data.items.slice(0,10));
    }
    catch(error){
        console.error("Error fetching users:",error);
        res.status(500).json({error:"Failed to fetch users"});
    }
});

app.listen(port, () => {
    console.log("Server running on port: " + port);
})
