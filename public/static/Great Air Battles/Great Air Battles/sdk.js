const SDK = (() => {
  const addCORS = "https://cors-anywhere.herokuapp.com"
  const API_Domain = "https://www.atmegame.com"
  const API_sportsg_Domain = "https://games.atmegame.com"
  const API_pub17_Domain = "https://pub17cdn.atmegame.com"
  const gameURL = window.location.href
  var myurls = gameURL.split("/?userid=")
  console.log("1sturl: " + myurls)
  var mylasturls = myurls[1].split("&appid=")
  console.log("2ndturl: " + mylasturls)
  var mylast_uid = mylasturls[0]
  console.log("1stval: " + mylast_uid)
  var var_envs = mylasturls[1]
  console.log("2ndval: " + var_envs)
  let userid = 1
  if (mylast_uid === undefined) {
  } else {
    userid = mylast_uid
  }
  localStorage.setItem("userid", userid)
  console.log("USERID: " + userid)
  let environment = 1
  if (var_envs === undefined) {
  } else {
    environment = var_envs
  }
  localStorage.setItem("environment", environment)
  console.log("APPID: " + environment)
  let g2url = ""
  if (localStorage.getItem("gameurl") === null) {
    console.log("played gameif: ")
    g2url = gameURL
  } else {
    g2url = localStorage.getItem("gameurl")
    console.log("played gameelse: ")
  }
  var pieces = g2url.split(/[\s/]+/)
  const gURL = pieces[pieces.length - 2]
  console.log("played game: ", gURL)
  const finalgUrl = gURL.replace(/-/g, "_")
  let pub17games = []
  ;(pub17games["air-hockey"] = "app_001"),
    (pub17games["air-warfare"] = "app_002"),
    (pub17games["alien-hunter-2"] = "app_003"),
    (pub17games["basketball"] = "app_004"),
    (pub17games["billiards"] = "app_005"),
    (pub17games["block-snake"] = "app_006"),
    (pub17games["breakfast-time"] = "app_007"),
    (pub17games["brickout"] = "app_008"),
    (pub17games["burger-time"] = "app_009"),
    (pub17games["cube-ninja"] = "app_010"),
    (pub17games["cyber-slashman"] = "app_011"),
    (pub17games["cyber-soldier"] = "app_012"),
    (pub17games["dark-ninja"] = "app_013"),
    (pub17games["dead-land-adventure-2"] = "app_014"),
    (pub17games["fruitslasher"] = "app_015"),
    (pub17games["girl-dress-up"] = "app_016"),
    (pub17games["going-nuts"] = "app_017"),
    (pub17games["gold-miner-jack"] = "app_018"),
    (pub17games["great-air-battles"] = "app_019"),
    (pub17games["handless-millionaire"] = "app_020"),
    (pub17games["mad-scientist"] = "app_021"),
    (pub17games["monster-rush"] = "app_022"),
    (pub17games["mummy-candies"] = "app_023"),
    (pub17games["ninja-run"] = "app_024"),
    (pub17games["playful-kitty"] = "app_025"),
    (pub17games["plumber"] = "app_026"),
    (pub17games["pool-8-ball"] = "app_027"),
    (pub17games["popstar-dress-up"] = "app_028"),
    (pub17games["ranger-vs-zombies"] = "app_029"),
    (pub17games["santa-run"] = "app_030"),
    (pub17games["speed-racer"] = "app_031"),
    (pub17games["stack-jump"] = "app_032"),
    (pub17games["swat-vs-zombies"] = "app_033"),
    (pub17games["tank-defender"] = "app_034"),
    (pub17games["tank-wars"] = "app_035"),
    (pub17games["the-bandit-hunter"] = "app_036"),
    (pub17games["traffic-command"] = "app_037"),
    (pub17games["wothan-escape"] = "app_039"),
    (pub17games["zombie-buster"] = "app_040"),
    (pub17games["zombie-shooter"] = "app_041")
  ;(pub17games["crazy-runner"] = "app_042"),
    (pub17games["shoot-robbers"] = "app_043")
  pub17games["space-purge"] = "app_044"
  ;(pub17games["fishing-frenzy"] = "app_045"),
    (pub17games["duck-shooter"] = "app_046")
  pub17games["duck-hunter"] = "app_047"
  ;(pub17games["happy-halloween"] = "app_048"),
    (pub17games["floor-jumpe-escape"] = "app_049")
  pub17games["piggybank-adventure"] = "app_050"
  ;(pub17games["stick-monkey"] = "app_051"),
    (pub17games["halloween-bubble-shooter"] = "app_052")
  pub17games["fruit-snake"] = "app_053"
  ;(pub17games["super-cowboy-run"] = "app_054"),
    (pub17games["traffic"] = "app_055")
  pub17games["super-pon-goal"] = "app_056"
  ;(pub17games["viking-escape"] = "app_057"),
    (pub17games["stick-panda"] = "app_058")
  pub17games["scary-run"] = "app_059"
  ;(pub17games["road-racer"] = "app_060"),
    (pub17games["pops-billiards"] = "app_061")
  pub17games["funny-animals-match3"] = "app_062"
  ;(pub17games["frog-super-bubbles"] = "app_063"),
    (pub17games["cars"] = "app_064")
  pub17games["animals-crush-match3"] = "app_065"
  ;(pub17games["lollipops-match3"] = "app_066"),
    (pub17games["vikings-vs-skeletons"] = "app_067")
  pub17games["rocky-jetpack"] = "app_068"
  ;(pub17games["creepy-day"] = "app_069"),
    (pub17games["flappy-pig"] = "app_070")
  pub17games["jungle-treasure"] = "app_071"
  ;(pub17games["fire-soldier"] = "app_072"),
    (pub17games["block-pile"] = "app_073")
  pub17games["zoo-run"] = "app_074"
  ;(pub17games["jumpers"] = "app_075"), (pub17games["jump-jump"] = "app_076")
  pub17games["duosometric-jump"] = "app_077"
  ;(pub17games["dashers"] = "app_078"), (pub17games["cube-dash"] = "app_079")
  pub17games["barn-dash"] = "app_080"
  pub17games["penalty-challenge"] = "app_081"
  pub17games["virus-attack"] = "app_082"
  pub17games["bubblegum-balloon"] = "app_083"
  pub17games["strike-expert"] = "app_084"
  const gameID = pub17games[gURL]
  console.log("game appid:", gameID)
  const postScore = async (score, userId, avatar) => {
    try {
      const scoreAPI = `${API_sportsg_Domain}/mgamer/mha_code.php`
      const rawRes = await fetch(scoreAPI, {
        method: "POST",
        mode: "same-origin",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid: userid, score: score, game_id: gameID }),
      })
      const jsonData = await rawRes.json()
      if (jsonData.status == "success") {
        return jsonData.code
      } else {
        console.log("Something went wrong..!", jsonData)
      }
    } catch (err) {
      console.log(err)
    }
  }
  function reverseString(str) {
    var splitString = str.split("")
    var reverseArray = splitString.reverse()
    var joinArray = reverseArray.join("")
    return joinArray
  }
  const sendScore = async score => {
    try {
      if (score > 0) {
        let getencryptscore = ""
        var storeds = await postScore(score, usercode, null).then(function (
          result
        ) {
          return result
        })
        const scoreAPI2 = `${API_sportsg_Domain}/mgamer/mha_wow.php`
        var usercode = `${localStorage.getItem("userid")}`
        var scorecode2 = storeds
        var gamecode = `${gameID}`
        const rawRes = await fetch(scoreAPI2, {
          method: "POST",
          mode: "same-origin",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userid: usercode,
            score: scorecode2,
            game_id: gamecode,
          }),
        })
        const jsonData = await rawRes.json()
        if (jsonData.status === "success") {
        } else {
          console.log("User is not logged in..!", jsonData)
        }
      } else {
        console.log("Score not received..!")
      }
    } catch (err) {
      console.log(err)
    }
  }
  return { sendScore }
})()
