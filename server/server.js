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
        "Wolverhampton", //
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

msg2 = {
    "opt": [
        "Kabul", "Tirana", "Algiers", "Andorra la Vella", "Luanda", "Saint John's",
        "Buenos Aires", "Yerevan", "Canberra", "Vienna", "Baku", "Nassau",
        "Manama", "Dhaka", "Bridgetown", "Minsk", "Brussels", "Belmopan", "Porto-Novo",
        "Thimphu", "La Paz", "Sarajevo", "Gaborone", "Brasília", "Bandar Seri Begawan",
        "Sofia", "Ouagadougou", "Gitega", "Praia", "Phnom Penh", "Yaoundé",
        "Ottawa", "Bangui", "N'Djamena", "Santiago", "Beijing", "Bogotá",
        "Moroni", "Kinshasa", "Brazzaville", "San José", "Zagreb", "Havana",
        "Nicosia", "Prague", "Copenhagen", "Djibouti", "Roseau", "Santo Domingo",
        "Quito", "Cairo", "San Salvador", "Malabo", "Asmara", "Tallinn",
        "Mbabane", "Addis Ababa", "Suva", "Helsinki", "Paris", "Libreville",
        "Banjul", "Tbilisi", "Berlin", "Accra", "Athens", "Saint George's",
        "Guatemala City", "Conakry", "Bissau", "Georgetown", "Port-au-Prince",
        "Tegucigalpa", "Budapest", "Reykjavik", "New Delhi", "Jakarta",
        "Tehran", "Baghdad", "Dublin", "Jerusalem", "Rome", "Kingston",
        "Tokyo", "Amman", "Nur-Sultan", "Nairobi", "Tarawa", "Pyongyang",
        "Seoul", "Pristina", "Kuwait City", "Bishkek", "Vientiane", "Riga",
        "Beirut", "Maseru", "Monrovia", "Tripoli", "Vaduz", "Vilnius",
        "Luxembourg", "Antananarivo", "Lilongwe", "Kuala Lumpur", "Male",
        "Bamako", "Valletta", "Majuro", "Nouakchott", "Port Louis", "Mexico City",
        "Palikir", "Chisinau", "Monaco", "Ulaanbaatar", "Podgorica", "Rabat",
        "Maputo", "Naypyidaw", "Windhoek", "Yaren", "Kathmandu", "Amsterdam",
        "Wellington", "Managua", "Niamey", "Abuja", "Skopje", "Oslo",
        "Muscat", "Islamabad", "Ngerulmud", "Panama City", "Port Moresby",
        "Asunción", "Lima", "Manila", "Warsaw", "Lisbon", "Doha", "Bucharest",
        "Moscow", "Kigali", "Basseterre", "Castries", "Kingstown", "Apia",
        "San Marino", "Riyadh", "Dakar", "Belgrade", "Victoria", "Freetown",
        "Singapore", "Bratislava", "Ljubljana", "Honiara", "Mogadishu", "Pretoria",
        "Juba", "Madrid", "Colombo", "Khartoum", "Paramaribo", "Stockholm",
        "Bern", "Damascus", "Taipei", "Dushanbe", "Dodoma", "Bangkok", "Lomé",
        "Nukuʻalofa", "Port of Spain", "Tunis", "Ankara", "Ashgabat", "Funafuti",
        "Kampala", "Kyiv", "Abu Dhabi", "London", "Washington, D.C.", "Montevideo",
        "Tashkent", "Port Vila", "Vatican City", "Caracas", "Hanoi", "Sanaa",
        "Lusaka", "Harare",
        // Città italiane principali
        "Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence",
        "Bari", "Catania", "Venice", "Verona", "Messina", "Padua", "Trieste", "Brescia",
        "Parma", "Taranto", "Prato", "Modena", "Reggio Calabria", "Reggio Emilia",
        "Perugia", "Ravenna", "Livorno", "Cagliari", "Foggia", "Rimini", "Salerno",
        "Ferrara", "Sassari", "Latina", "Giugliano in Campania", "Monza", "Siracusa",
        "Pescara", "Bergamo", "Forlì", "Trento", "Vicenza", "Terni", "Bolzano",
        "Novara", "Piacenza", "Ancona", "Andria", "Arezzo", "Udine", "Cesena",
        "Lecce", "Pesaro", "Barletta", "Alessandria", "La Spezia", "Pisa",
        "Catanzaro", "Pistoia", "Brindisi", "Como", "Lucca", "Treviso", "Marsala",
        "Busto Arsizio", "Varese", "Caserta", "Sesto San Giovanni", "Guidonia Montecelio",
        "Cosenza", "Gela", "Cinisello Balsamo", "Massa", "Ragusa", "Trapani",
        "Altamura", "Imola", "Castellammare di Stabia", "Molfetta", "Asti", "Viterbo",
        "Pavia", "Lamezia Terme", "Cremona", "Potenza", "Carrara", "Caltanissetta",
        "Agrigento", "Rovigo", "Crotone", "Siena", "Bitonto", "Savona", "Vittoria",
        "Trani", "Marano di Napoli", "Gravina in Puglia", "Afragola", "Scandicci",
        "Bagheria", "Benevento", "San Severo", "Cava de' Tirreni", "Modica",
        "Cerignola", "Acerra", "Moncalieri", "Faenza", "Matera"
    ]
}

msg3 = {
    "opt": [
    ]
}

for (let index = 0; index < 300; index++) {
    msg3["opt"].push("prova" + index)
    
}


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/options', (req, res) => {
    const start = req.query["start"]
    const end = req.query["end"]
    const filter = req.query["filter"]

    if (filter != "")
        data = msg3["opt"].filter(value => value.toLowerCase().includes(filter.toLowerCase())).slice(start, end)
    else
        data = msg3["opt"].slice(start, end)

    res.status(200).json({ "opt": data })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})