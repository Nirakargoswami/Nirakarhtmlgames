import { Box, Flex, Link, Text } from "@chakra-ui/react";
// import Link from "next/link";

const CategoryLinks = ({ categories }) => {

  return (
   <Box>
     <marquee>
    <Flex mt={"10px"}>
      {categories.sort().map((x) => (
        <Link href={`${x.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-")}`}>
          <Text
            ml={6}
            mb={2}
            borderRadius={"47px"}
            p={"5px 30px 5px 30px"}
            bg={"ActiveBorder"}
            boxShadow={"0px 0px 3px white"}
            fontSize={"12px"}
            fontWeight={"500"}
            color={"white"}
          >
            {x}
          </Text>
        </Link>
      ))}
    </Flex>
  </marquee>
   </Box>
  );
};

export default CategoryLinks;
