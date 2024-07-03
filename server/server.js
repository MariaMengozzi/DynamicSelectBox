const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/options', (req, res) => {
    msg = {
        "opt": []
    }
    for (let index = 0; index < 30; index++) {
        msg["opt"].push("opt" + index)  
    }

    res.status(200).json(msg)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})