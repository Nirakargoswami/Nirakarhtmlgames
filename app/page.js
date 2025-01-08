"use client"
import {
  Image,
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
  Divider,
  Link,
} from "@chakra-ui/react";
// import Image from "next/image";
import games from "../datas/gamesData.json"
import Design from "./design/page";
import GamesCard from "./components/gamescard";
import CategoryLinks from "./components/CategoryLinks";

// export const metadata = {
//   title: "HTML5 Games | Instant play and fund",
//   description: "Discover a wide range of HTML5 games that you can play instantly. Enjoy seamless gaming experiences and easily fund your gaming account. Start playing now!"
// }

const BRIANGMEDATA = [
  {
    "name": "NUMBER MEMEORY",
    "category": "Braingame",
    "gamePath": "https://brainbenchmark.upmspboard.com",
    "image": "Numb.png"
  },
  {
    "name": "REACTION TIME",
    "category": "Braingame",
    "gamePath": "https://brainbenchmark.upmspboard.com",
    "image": "Reacion.png"
  },
  {
    "name": "CHIMP MEMEORY",
    "category": "Braingame",
    "gamePath": "https://brainbenchmark.upmspboard.com",
    "image": "ChimpTest.png"
  },
  {
    "name": "SEQUENCE MEMEORY",
    "category": "Braingame",
    "gamePath": "https://brainbenchmark.upmspboard.com",
    "image": "SEQUEN.png"
  },
  {
    "name": "VISUAL MEMEORY",
    "category": "Braingame",
    "gamePath": "https://brainbenchmark.upmspboard.com",
    "image": "Visual.png"
  },
]


export default function Home() {
  const groupedGames = groupGamesByCategory(games);
  const categories = Object.keys(groupedGames);

  return (
    <Box p={2} >
<Box p={2} >
        <Text color={"white"} mt={"5px"} mb={"15px"} textAlign={"center"} fontSize={["1.2rem", "1.2rem", "1.2rem", "2.2rem"]} fontWeight={"bold"} >
         NEW BRAIN GAME
        </Text>

        <Flex
          w={"100vw"}
          overflowX={"auto"}
          // overflow={"hidden"}
          // flexDirection={"column"}
          alignItems={"center"}
          justify={["", "", "", "center"]}
          paddingBottom={"10px"}
          paddingRight={"31px"}
        // scrollBehavior={"none"}
        >
          {BRIANGMEDATA.map((x, index) => {
            return (
              <>
                <Box
                  onClick={() => {
                    window.location.href = x.gamePath; // Redirects and forces a full page reload
                  }}
                  mb={10}
                  key={index}
                  minW={"200px"}
                  background="linear-gradient(167.05deg, rgba(5, 27, 39, 0) 29.74%, #000 90.57%)"
                  textAlign={"center"}
                  borderRadius={"15px"}
                  boxShadow="0px 0px 4px #ffffffb0"
                  ml={["20px", "20px", "20px"]}
                  position="relative" // Allows for absolute positioning of children
                >
                  {x.videolink ?

                    <video style={{ height: h, width: w }} loop="true" autoPlay muted>
                      <source src={`/assets/images/${x.videolink}`} type="video/mp4" />
                      Your browser does not support the video tag.

                    </video>




                    :
                    <Image
                      w={200}
                      h={280}
                      src={`/assets/images/${x.image}`}
                      style={{ objectFit: "cover", borderRadius: "15px" }}
                    />}
                  <Box
                    background="linear-gradient(167.05deg, rgba(5, 27, 39, 0) 29.74%, #000 90.57%)"
                    borderRadius={"15px"}
                    position="absolute"
                    bottom={0}
                    left={0}
                    width={"100%"}
                    height={"100%"}
                  />

                  <Flex
                    justify={"center"}
                    align={"center"}
                    position={"absolute"}
                    bottom={0}
                    width={"100%"}
                    height={"40px"}
                  >
                    <Text color={"white"} fontWeight={"700"}>
                      {x.name.slice(0, 15)}
                    </Text>
                  </Flex>
                </Box>
              </>
            )
          }


          )}
        </Flex>

      </Box>
      
      <Divider border={"1px solid white"} />

      <Box p={2} >
      
        {
          GamesCard(games.filter((X) => X.link === "hextris-puzzle")[0], 1, "200px", "cover", "puzzle", ["20px", "20px", "20px"], "366px")

        }

      </Box>

      


      <CategoryLinks categories={categories} />
      {categories.sort().map((g) => {
        return (
          <>
            <Divider border={"1px solid white"} />
            <Flex align={"center"} justify={"space-between"}>
              <Flex p={3} align={"center"}>
                <Text color={"white"} fontSize={["1.2rem", "1.2rem", "1.2rem", "2.2rem"]} fontWeight={"bold"} >
                  {g}
                </Text>
                {/* <Text
                  as={"span"}
                  backgroundColor="rgba(128, 128, 128, 0.233)"
                  borderRadius="10px"
                  padding="2px 10px"
                  marginLeft="10px"
                  fontSize="14px"
                  color={"white"}
                >
                  {`${g.length} games`}{" "}
                </Text> */}
              </Flex>
              <Link href={`${g.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-")}`}>
                {g.length < 6 ? (
                  <Text color={"white"} fontSize={["15px", "1.2rem", "1.2rem", "1.2rem", "2.2rem"]} fontWeight={"bold"} >
                    {"view all"}
                  </Text>
                ) : (
                  <Text color={"white"} fontSize={["15px", "1.2rem", "1.2rem", "1.2rem", "2.2rem"]} fontWeight={"bold"} >
                    {"view all"}
                  </Text>
                )}
              </Link>
            </Flex>
            <Flex
              w={"100vw"}
              overflowX={"auto"}
              // overflow={"hidden"}
              // flexDirection={"column"}
              alignItems={"center"}
              justify={["", "", "", "center"]}
              paddingBottom={"10px"}
              paddingRight={"31px"}
            // scrollBehavior={"none"}
            >
              {groupedGames[g]
                .map((x, index) => GamesCard(x, index, "280px", "cover", g, ["20px", "20px", "20px"]), "200px")}
            </Flex>
          </>
        );
      })}
    </Box>
  );
}

export function groupGamesByCategory(games) {
  const categoryGroups = {};

  games.forEach((game) => {
    const category = game.category;
    if (!categoryGroups[category]) {
      categoryGroups[category] = [game];
    } else {
      categoryGroups[category].push(game);
    }
  });

  return categoryGroups;
}
