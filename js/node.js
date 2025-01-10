//how to write an array to a specific .json file
const fs = require('fs');
const path = require('path');

const users = [
    {
        name: "Harrison @Harrison",
        type: "sports",
        followers: 100000,
        category: "bowling",
        role: "platform-tiktok",
        link: "@Harrison(link)",
        backgroundImg: "../img/wavetitle.png",
        gender: "male",
        username: "heyzah"
    },
    {
        name: "Alex @Alex",
        type: "fitness",
        followers: 200000,
        category: "gym",
        role: "platform-youtube",
        link: "@Alex(link)",
        backgroundImg: "",
        gender: "male"
    },
    {
        name: "Chloe",
        type: "lifestyle",
        followers: 10,
        category: "baking",
        role: "platform-influencer",
        link: "@Chloe(link)",
        backgroundImg: "../img/cookies.png",
        gender: "female"
    },
    {
        name: "Liam @LiamFitness",
        type: "fitness",
        followers: 50000,
        category: "running",
        role: "platform-instagram",
        link: "@LiamFitness(link)",
        gender: "male"
    },
    {
        name: "Mia @TechWithMia",
        type: "technology",
        followers: 300000,
        category: "gadgets",
        role: "platform-blogger",
        link: "@TechWithMia(link)",
        backgroundImg: "",
        gender: "female"
    },
    {
        name: "Sophia @SophiaDIY",
        type: "lifestyle",
        followers: 150000,
        category: "DIY",
        role: "platform-tiktok",
        link: "@SophiaDIY(link)",
        gender: "female"
    },
    {
        name: "Ryan @GamingRyan",
        type: "gaming",
        followers: 500000,
        category: "streaming",
        role: "platform-streamer",
        link: "@GamingRyan(link)",
        gender: "male"
    },
    {
        name: "Emma @EcoEmma",
        type: "environment",
        followers: 20000,
        category: "sustainability",
        role: "platform-influencer",
        link: "@EcoEmma(link)",
        gender: "female"
    },
    {
        name: "Lucas @ArtByLucas",
        type: "art",
        followers: 80000,
        category: "painting",
        role: "platform-artist",
        link: "@ArtByLucas(link)",
        gender: "male"
    },
    {
        name: "Ava @CookWithAva",
        type: "food",
        followers: 120000,
        category: "cooking",
        role: "platform-youtube",
        link: "@CookWithAva(link)",
        gender: "female"
    },
    {
        name: "Isabella @SurfBella",
        type: "sports",
        followers: 300000,
        category: "surfing",
        role: "platform-instagram",
        link: "@SurfBella(link)",
        gender: "female"
    },
    {
        name: "Daniel @NewsDan",
        type: "journalism",
        followers: 1000000,
        category: "breaking news",
        role: "platform-journalist",
        link: "@NewsDan(link)",
        gender: "male"
    },
    {
        name: "Megan @DanceQueenMegan",
        type: "dance",
        followers: 500000,
        category: "hip hop",
        role: "platform-tiktok",
        link: "@DanceQueenMegan(link)",
        gender: "female"
    },
    {
        name: "Olivia @CookedWithLiv",
        type: "food",
        followers: 10000,
        category: "vegan recipes",
        role: "platform-blogger",
        link: "@CookedWithLiv(link)",
        gender: "female"
    },
    {
        name: "James @ComicJames",
        type: "comedy",
        followers: 75000,
        category: "stand-up",
        role: "platform-youtube",
        link: "@ComicJames(link)",
        gender: "male"
    },
    {
        name: "Lily @ArtWithLily",
        type: "art",
        followers: 2000000,
        category: "sculpture",
        role: "platform-instagram",
        link: "@ArtWithLily(link)",
        gender: "female"
    },
    {
        name: "Sam @StreamSam",
        type: "gaming",
        followers: 600000,
        category: "live streaming",
        role: "platform-streamer",
        link: "@StreamSam(link)",
        gender: "male"
    },
    {
        name: "Grace @GraceHealth",
        type: "fitness",
        followers: 250000,
        category: "nutrition",
        role: "platform-influencer",
        link: "@GraceHealth(link)",
        gender: "female"
    },
    {
        name: "Ethan @OutdoorEthan",
        type: "adventure",
        followers: 40000,
        category: "hiking",
        role: "platform-influencer",
        link: "@OutdoorEthan(link)",
        gender: "male"
    },
    {
        name: "Sophie @EcoSophie",
        type: "environment",
        followers: 150000,
        category: "wildlife",
        role: "platform-youtube",
        link: "@EcoSophie(link)",
        gender: "female"
    }
];

let companies = [
    {
        name: "Bowling Pros",
        type: "sports",
        followers: 100000,
        category: "bowling",
        role: "sponsor",
        link: "@BowlingPros(link)",
        platform: "platform-instagram",
        gender: "male"
    },
    {
        name: "FitHub",
        type: "fitness",
        followers: 300000,
        category: "equipment",
        role: "sponsor",
        link: "@FitHub(link)",
        platform: "platform-youtube",
        gender: "female"
    },
    {
        name: "BakeCentral",
        type: "lifestyle",
        followers: 50000,
        category: "baking",
        role: "influencer",
        link: "@BakeCentral(link)",
        platform: "platform-instagram",
        gender: "female"
    },
    {
        name: "GreenEat",
        type: "lifestyle",
        followers: 500000,
        category: "health food",
        role: "collaborator",
        link: "@GreenEat(link)",
        platform: "platform-tiktok",
        gender: "non-binary"
    },
    {
        name: "Adventure Gear Co",
        type: "outdoors",
        followers: 750000,
        category: "camping",
        role: "sponsor",
        link: "@AdventureGear(link)",
        platform: "platform-facebook",
        gender: "male"
    },
    {
        name: "SurfX",
        type: "sports",
        followers: 120000,
        category: "surfing",
        role: "sponsor",
        link: "@SurfX(link)",
        platform: "platform-twitter",
        gender: "female"
    },
    {
        name: "CycleLife",
        type: "fitness",
        followers: 1000000,
        category: "cycling",
        role: "sponsor",
        link: "@CycleLife(link)",
        platform: "platform-youtube",
        gender: "male"
    },
    {
        name: "ArtistryNow",
        type: "creative",
        followers: 200000,
        category: "arts & crafts",
        role: "influencer",
        link: "@ArtistryNow(link)",
        platform: "platform-instagram",
        gender: "female"
    },
    {
        name: "TechExplorers",
        type: "technology",
        followers: 2000000,
        category: "gadgets",
        role: "sponsor",
        link: "@TechExplorers(link)",
        platform: "platform-youtube",
        gender: "non-binary"
    },
    {
        name: "YogaFlow",
        type: "fitness",
        followers: 80000,
        category: "yoga",
        role: "influencer",
        link: "@YogaFlow(link)",
        platform: "platform-tiktok",
        gender: "female"
    }
];

let usersTest = [];

const userFilePath = 'E:/code/socialQ/v2/json/users.json';
const companyFilePath = 'E:/code/socialQ/v2/json/companies.json';

function saveUserData(array) {
    const usersJson = JSON.stringify(array, null, 2); // Pretty print JSON
    fs.writeFile(userFilePath, usersJson, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Data has been written to user.json');
        }
    });
}

function saveCompanyData(array) {
    const companiesJson = JSON.stringify(array, null, 2); // Pretty print JSON
    fs.writeFile(companyFilePath, companiesJson, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Data has been written to companies.json');
        }
    });
}

//Saves users.json into the usersTest array var
function saveArray(array) {
    fs.readFile(userFilePath, 'utf-8', function (err, data) {
        if(err){
            console.log("error error");
        } else {
        usersTest = data;
        console.log(usersTest);
        }
    })
}

//saveUserData(users);
saveCompanyData(companies);
// saveArray();


