import { LiveMatchDetails } from "@/types/LiveMatch";

const TEAMS = [
  "Mumbai Indians",
  "Chennai Super Kings",
  "Royal Challengers Bengaluru",
  "Kolkata Knight Riders",
  "Delhi Capitals",
  "Punjab Kings",
  "Rajasthan Royals",
  "Sunrisers Hyderabad",
  "Gujarat Titans",
  "Lucknow Super Giants",
];

const PLAYERS = {
  "Mumbai Indians": [
    "Rohit Sharma",
    "Suryakumar Yadav",
    "Will Jacks",
    "Jasprit Bumrah",
    "Hardik Pandya",
    "Ryan Rickelton",
    "Tilak Verma",
    "Corbin Bosch",
    "Trent Boult",
    "Deepak Chahar",
    "Karn Sharma",
  ],
  "Chennai Super Kings": [
    "MS Dhoni",
    "Ruturaj Gaikwad",
    "Ravindra Jadeja",
    "Ayush Mhatre",
    "Vijay Shankar",
    "Shivam Dube",
    "R Ashwin",
    "Saam Curan",
    "Khaleel Ahmed",
    "Noor Ahmed",
    "M Pathirana",
  ],
  "Delhi Capitals": [
    "KL Rahul",
    "Karun Nair",
    "Abhishek Porel",
    "Faf Du Plessis",
    "T Stubbs",
    "Axar Patel",
    "Ashutosh Sharma",
    "Mitchell Starc",
    "Kuldeep Singh",
    "D Chameera",
    "Mukesh Kumar",
  ],
  "Royal Challengers Bengaluru": [
    "Rajat Patidar",
    "Virat Kohli",
    "Phil Salt",
    "D Padikkal",
    "Jitesh Sharma",
    "Krunal Pandya",
    "Romario Shephard",
    "B Kumar",
    "Josh Hazlewood",
    "Suyash Sharma",
    "Yash Dayal",
  ],
  "Kolkata Knight Riders": [
    "R Gurbaz",
    "A Rahane",
    "A Raghuvanshi",
    "V Iyer",
    "Sunil Narine",
    "Andre Russel",
    "Rinku Singh",
    "V Arora",
    "V Chakravarty",
    "Harshit Rana",
    "R Singh",
  ],
  "Punjab Kings": [
    "Priyansh Arya",
    "P Singh",
    "Josh English",
    "Shreyas Iyer",
    "Nehal Wadhera",
    "Shashank Singh",
    "Marco Jansen",
    "Musheer Khan",
    "A Singh",
    "Y Chahal",
    "Yash Thakur",
  ],
  "Rajasthan Royals": [
    "Y Jaiswal",
    "Sanju Samson",
    "Riyan Parag",
    "Dhrub Jurel",
    "S Hetmyer",
    "Nitish Rana",
    "V Suryavanshi",
    "Jofra Archer",
    "M Theeksana",
    "T Deshpande",
    "Sandeep Sharma",
  ],
  "Sunrisers Hyderabad": [
    "Ishan Kishan",
    "Travis Head",
    "H Klaseen",
    "Nitish Reddy",
    "A Sharma",
    "Pat Cummins",
    "M Shami",
    "H Patel",
    "R Chahar",
    "J Unadkat",
    "W Mulder",
  ],
  "Gujarat Titans": [
    "S Gill",
    "J Buttler",
    "Sai Sudharsan",
    "W Sundar",
    "S Rutherford",
    "S Khan",
    "R Tewatia",
    "Rashid Khan",
    "M Siraj",
    "Ishant Sharma",
    "K Rabada",
  ],
  "Lucknow Super Giants": [
    "Markram",
    "M Marsh",
    "N Pooran",
    "Rishav Pant",
    "A Badoni",
    "D Miller",
    "A Samad",
    "D S Rathi",
    "Avesh Khan",
    "Mayank Yadav",
    "Avesh Khan",
  ],
};

let currentMatch: LiveMatchDetails | null = null;
let lastUpdateTime = 0;
let ballCount = 0;

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateNewMatch(): LiveMatchDetails {
  const team1 = getRandomElement(TEAMS);
  let team2 = getRandomElement(TEAMS);
  while (team2 === team1) team2 = getRandomElement(TEAMS);

  const tossWinner = Math.random() > 0.5 ? team1 : team2;
  const tossLoser = tossWinner === team1 ? team2 : team1;
  const tossDecision = Math.random() > 0.5 ? "bat" : "bowl";

  return {
    matchId: `match-${Date.now()}`,
    team1,
    team2,
    tossWinner,
    tossDecision,
    currentInnings: 1,
    currentScore: "0/0",
    currentOver: 0,
    currentBall: 0,
    totalRuns: 0,
    totalWickets: 0,
    batsmen: [
      {
        id: "1",
        name: getRandomElement(PLAYERS[tossWinner as keyof typeof PLAYERS]),
        runs: 0,
        ballsFaced: 0,
        fours: 0,
        sixes: 0,
        isOut: false,
      },
      {
        id: "2",
        name: getRandomElement(PLAYERS[tossWinner as keyof typeof PLAYERS]),
        runs: 0,
        ballsFaced: 0,
        fours: 0,
        sixes: 0,
        isOut: false,
      },
    ],
    bowlers: [
      {
        id: "1",
        name: getRandomElement(
          PLAYERS[
            tossWinner === team1
              ? (team2 as keyof typeof PLAYERS)
              : (team1 as keyof typeof PLAYERS)
          ]
        ),
        overs: 0,
        maidens: 0,
        runsGiven: 0,
        wickets: 0,
        economy: 0,
      },
    ],
    lastWicket: null,
    partnership: "0 (0)",
    requiredRunRate: null,
    matchStatus: "live",
    lastUpdated: new Date().toISOString(),
    teamBatting: tossDecision === "bat" ? tossWinner : tossLoser
  };
}

function updateMatch(match: LiveMatchDetails): LiveMatchDetails {
  const now = new Date();
  const updatedMatch = { ...match };

  // Increment ball count
  ballCount++;
  updatedMatch.currentBall = (updatedMatch.currentBall + 1) % 6;
  if (updatedMatch.currentBall === 0) {
    updatedMatch.currentOver++;
  }

  // Simulate ball outcome (0-6 runs, wicket, or wide/no-ball)
  const outcome = Math.random();
  let runs = 0;
  let isWicket = false;

  if (outcome < 0.05) {
    // 5% chance of wicket
    isWicket = true;
    updatedMatch.totalWickets++;
    const outBatsmanIndex = Math.floor(Math.random() * 2);
    updatedMatch.batsmen[outBatsmanIndex].isOut = true;
    updatedMatch.lastWicket = `${
      updatedMatch.batsmen[outBatsmanIndex].name
    } ${getRandomElement(["b", "c", "lbw", "st", "run out"])} ${
      updatedMatch.bowlers[0].name
    } ${
      Math.random() > 0.5
        ? ""
        : getRandomElement(["bouncer", "yorker", "googly"])
    }`;

    // Bring in new batsman if not all out
    if (updatedMatch.totalWickets < 10) {
      updatedMatch.batsmen[outBatsmanIndex] = {
        id: `${updatedMatch.batsmen.length + 1}`,
        name: getRandomElement(
          PLAYERS[
            updatedMatch.currentInnings === 1
              ? (updatedMatch.team1 as keyof typeof PLAYERS)
              : (updatedMatch.team2 as keyof typeof PLAYERS)
          ]
        ),
        runs: 0,
        ballsFaced: 0,
        fours: 0,
        sixes: 0,
        isOut: false,
      };
    }
  } else if (outcome < 0.1) {
    // 5% chance of wide/no-ball
    runs = 1;
    updatedMatch.totalRuns += runs;
  } else {
    // Normal ball
    runs = Math.floor(Math.random() * 7); // 0-6 runs
    if (runs === 4) updatedMatch.batsmen[0].fours++;
    if (runs === 6) updatedMatch.batsmen[0].sixes++;

    updatedMatch.totalRuns += runs;
    updatedMatch.batsmen[0].runs += runs;
    updatedMatch.batsmen[0].ballsFaced++;
  }

  // Update bowler stats
  updatedMatch.bowlers[0].runsGiven += runs;
  if (updatedMatch.currentBall === 0) {
    updatedMatch.bowlers[0].overs++;
    updatedMatch.bowlers[0].economy = parseFloat(
      (
        updatedMatch.bowlers[0].runsGiven / updatedMatch.bowlers[0].overs
      ).toFixed(2)
    );
  }
  if (isWicket) updatedMatch.bowlers[0].wickets++;

  // Update score string
  updatedMatch.currentScore = `${updatedMatch.totalRuns}/${updatedMatch.totalWickets}`;
  updatedMatch.partnership = `${
    updatedMatch.batsmen[0].runs + updatedMatch.batsmen[1].runs
  } (${ballCount})`;
  updatedMatch.lastUpdated = now.toISOString();

  // Check innings completion
  if (updatedMatch.totalWickets >= 10 || ballCount >= 120) {
    if (updatedMatch.currentInnings === 1) {
      updatedMatch.currentInnings = 2;
      updatedMatch.matchStatus = "innings break";
      // Reset for second innings
      updatedMatch.totalRuns = 0;
      updatedMatch.totalWickets = 0;
      updatedMatch.currentOver = 0;
      updatedMatch.currentBall = 0;
      ballCount = 0;
      updatedMatch.batsmen = [
        {
          id: "1",
          name: getRandomElement(PLAYERS[updatedMatch.team2 as keyof typeof PLAYERS]),
          runs: 0,
          ballsFaced: 0,
          fours: 0,
          sixes: 0,
          isOut: false,
        },
        {
          id: "2",
          name: getRandomElement(PLAYERS[updatedMatch.team2  as keyof typeof PLAYERS]),
          runs: 0,
          ballsFaced: 0,
          fours: 0,
          sixes: 0,
          isOut: false,
        },
      ];
      updatedMatch.bowlers = [
        {
          id: "1",
          name: getRandomElement(PLAYERS[updatedMatch.team1  as keyof typeof PLAYERS]),
          overs: 0,
          maidens: 0,
          runsGiven: 0,
          wickets: 0,
          economy: 0,
        },
      ];
      updatedMatch.requiredRunRate = parseFloat(
        (updatedMatch.totalRuns / 20).toFixed(2)
      );
    } else {
      updatedMatch.matchStatus = "completed";
    }
  }

  return updatedMatch;
}

export function getDummyLiveMatchDetails() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = `${hours}:${minutes.toString().padStart(2, "0")}`;

  // Check if within live match hours (7:30 PM to 11:30 PM)
  const isLiveTime =
    (hours === 19 && minutes >= 30) || // After 7:30 PM
    (hours > 20 && hours < 23) || // 8PM-10:59PM
    (hours === 23 && minutes <= 30); // Before 11:30 PM

  if (!isLiveTime) {
    return {
      data: null,
      meta: {
        isLive: false,
        message:
          "No live match currently. Check back between 7:30 PM and 11:30 PM IST.",
        currentTime,
      },
    };
  }

  // Initialize or update match
  if (!currentMatch || Date.now() - lastUpdateTime > 15000) {
    // Update every 15 seconds
    currentMatch = currentMatch
      ? updateMatch(currentMatch)
      : generateNewMatch();
    lastUpdateTime = Date.now();
  }

  return {
    data: currentMatch,
    meta: {
      isLive: true,
      message: "Live match in progress",
      currentTime,
    },
  };
}
