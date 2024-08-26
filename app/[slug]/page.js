import React from "react";
import {
  Box,
  Flex,
  Text,
  Divider,
  Link,
} from "@chakra-ui/react";
import GamesCard from "../components/gamescard";
import games from "../../data/gamesData.json"; // Adjust the path if needed

// Group games by their categories
function groupGamesByCategory(games) {
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

// This function generates the static paths (slugs) for each category
export async function generateStaticParams() {
  const categories = [...new Set(games.map((game) =>
    game.category.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-")
  ))];
  
  return categories.map((slug) => ({
    slug: slug,
  }));
}

export default function Page({ params }) {
  const groupedGames = groupGamesByCategory(games);
  const categories = Object.keys(groupedGames);
  
  // Match the slug from params with the correct category key
  const categoryKey = Object.keys(groupedGames).find(
    (category) =>
      category.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-") === params.slug
  );

  if (!categoryKey) {
    return <Text>No games found for this category.</Text>;
  }

  return (
    <Box>
      {/* Marquee for Category Links */}
      <marquee>
        <Flex mt={"4px"}>
          {categories.sort().map((x) => (
            <Link key={x} href={`${x.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-")}`}>
              <Text
                ml={6}
                borderRadius={"47px"}
                p={"5px 30px 5px 30px"}
                bg={"ActiveBorder"}
                fontSize={"17px"}
                fontWeight={"500"}
                color={"white"}
              >
                {x}
              </Text>
            </Link>
          ))}
        </Flex>
      </marquee>

      {/* Divider */}
      <Divider border={"1px solid #5900d9"} mb={"10px"} mt={"10px"} />

      {/* Category Title */}
      <Flex align={"center"} mb={8} justify={"center"}>
        <Text fontSize={"30px"} fontWeight={"bold"}>
          {categoryKey}
        </Text>
      </Flex>

      {/* Games Grid */}
      <Flex
        w={"100vw"}
        flexWrap={"wrap"}
        overflowX={"auto"}
        flexDirection={"row"}
        alignItems={"center"}
        justify={"center"}
        paddingBottom={"15px"}
        paddingRight={"31px"}
      >
        {groupedGames[categoryKey]?.map((x, index) =>
          GamesCard(x, index, "280px", "cover", categoryKey, ["0px", "4px", "4px"])
        )}
      </Flex>
    </Box>
  );
}
