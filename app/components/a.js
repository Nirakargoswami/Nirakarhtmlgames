import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import games from "../../../data/gamesData.json"; // Adjust the path as needed
import Link from "next/link";

function findGameById(games, id) {
  return games.find((game) => game.link === id);
}

export default function Page({ params }) {
  console.log(params.id, "params.slug.id");
  
  const game = findGameById(games, params.id);

  if (!game) {
    return <Text>Game not found</Text>;
  }

  console.log(game.gamePath,"game.gamePath");
  return (
    <Box p={"20px"}>
      <Flex
        flexDir={"column"}
        p={"10px"}
        mb={"20px"}
        borderRadius={"10px"}
        boxShadow={"0px 0px 7px gray"}
      >
        <Image
          w={"100%"}
          h={"auto"}
          src={`/assets/images/${game.image}`}
          alt={game.name}
          style={{ objectFit: "cover", borderRadius: "15px" }}
        />
        <Box textAlign={"center"} mt={"10px"}>
          <Text as={"h2"} fontSize={"26px"} fontWeight={"bold"}>
            {game.name}
          </Text>
        </Box>
        {game.externalLink ? (
          <a
            href={game.externalLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button color={"white"} p={"10px"} bg={"#5900d9"} w={"100%"}>
              Play now
            </Button>
          </a>
        ) : (
          <Link href={game.gamePath}>
            <Button color={"white"} p={"10px"}
              _hover={{
                background: "",
                color: "",
              }}            
            bg={"#5900d9"} w={"100%"}>
              Play now
            </Button>
          </Link>
        )}
      </Flex>
    </Box>
  );
}
