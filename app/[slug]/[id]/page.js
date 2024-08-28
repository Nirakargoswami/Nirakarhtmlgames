import React from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import games from "../../../datas/gamesData.json"; // Adjust the path as needed
import Link from "next/link";

// Function to find a game by its ID (link)
function findGameById(games, id) {
  return games.find((game) => game.link === id);
}

// Function to generate static parameters for all slugs and IDs
export async function generateStaticParams() {
  // Group games by category
  const slugsAndIds = games.map((game) => ({
    slug: game.category.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-"),
    id: game.link,
  }));

  return slugsAndIds.map(({ slug, id }) => ({
    slug,
    id,
  }));
}

// Function to generate metadata for the page
export async function generateMetadata({ params }) {
  const game = findGameById(games, params.id);
  const imageUrl = `/assets/images/${game.image}`;
  
  return {
    title: `HTML5 Game | ${game.name}`,
    description: game.description,
    openGraph: {
      images: [imageUrl],
    },
  };
}

// The main page component
export default function Page({ params }) {
  console.log(params.id, "params.slug.id");
  
  const game = findGameById(games, params.id);
  console.log(game);

  if (!game) {
    return <Text>Game not found</Text>;
  }

  console.log(game.gamePath, "game.gamePath");

  return (
    <Box color={"white"} p={"20px"}>
      <Flex
        flexDir={"column"}
        p={"10px"}
        mb={"20px"}
        borderRadius={"15px"}
        boxShadow={"0px 0px 7px gray"}
      >
        <Image
          w={"100%"}
          h={"auto"}
          src={`/assets/images/${game.image}`}
          alt={game.name}
          style={{ objectFit: "cover", borderRadius: "15px" }}
        />
        <Box mt={"10px"}>
          <Text as={"h2"} fontSize={"26px"} fontWeight={"bold"}>
            {game.name}
          </Text>

          <Text as={"p"} m={"10px 0px 20px 0px"} fontSize={"18px"}>
            {game.description}
          </Text>
        </Box>
        {game.gamePath ? (
          <a href={game.gamePath} target="_blank" rel="noopener noreferrer">
            <Button color={"white"} p={"10px"} bg={"#5900d9"} w={"100%"}>
              Play now
            </Button>
          </a>
        ) : (
          <Link href={game.gamePath}>
            <Button
              color={"white"}
              p={"10px"}
              _hover={{
                background: "",
                color: "",
              }}
              bg={"#5900d9"}
              w={"100%"}
            >
              Play now
            </Button>
          </Link>
        )}
      </Flex>
    </Box>
  );
}
