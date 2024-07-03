const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

const port = 8000


msg = {
    "opt": [
        "London",
        "Birmingham",
        "Manchester",
        "Liverpool",
        "Leeds",
        "Sheffield",
        "Bristol",
        "Newcastle upon Tyne",
        "Sunderland",
        "Wolverhampton",
        "Plymouth",
        "Nottingham",
        "Leicester",
        "Stoke-on-Trent",
        "Southampton",
        "Reading",
        "Derby",
        "Dudley",
        "Coventry",
        "Northampton",
        "Portsmouth",
        "Luton",
        "Preston",
        "Milton Keynes",
        "Aberdeen",
        "Norwich",
        "Walsall",
        "Swansea",
        "Bournemouth",
        "Southend-on-Sea",
        "Swindon",
        "Oxford",
        "Dundee",
        "Huddersfield",
        "Poole",
        "Middlesbrough",
        "Bolton",
        "Blackburn",
        "Peterborough",
        "Stockport",
        "Brighton",
        "Slough",
        "Gloucester",
        "Watford",
        "Rotherham",
        "Newport",
        "Cambridge",
        "Exeter",
        "Eastbourne",
        "Colchester",
        "Crawley",
        "Sutton Coldfield",
        "Blackpool",
        "Birkenhead",
        "Woking",
        "Cheltenham",
        "Chelmsford",
        "Bath",
        "Maidstone",
        "Sale",
        "Carlisle",
        "Doncaster",
        "Wakefield",
        "Hastings",
        "Rochdale",
        "Solihull",
        "Basildon",
        "Worthing",
        "High Wycombe",
        "Basingstoke",
        "Burnley",
        "Worcester",
        "Grimsby",
        "Saint Helens",
        "Weston-super-Mare",
        "Guildford",
        "Southport",
        "Wokingham",
        "Hemel Hempstead",
        "Aylesbury",
        "Lincoln",
        "Barnsley",
        "Stevenage",
        "Harlow",
        "Chesterfield",
        "Oldham",
        "Basingstoke",
        "Chatham",
        "Rugby",
        "Scunthorpe",
        "Gateshead",
        "Eastleigh",
        "Bedford",
        "Hartlepool",
        "Warrington",
        "Shrewsbury",
        "Keighley",
        "Kingston upon Hull",
        "Telford",
        "Bromley"
    ]
}


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/options', (req, res) => {

    res.status(200).json(msg)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})