import { Image, Box, Flex, Text, Link } from "@chakra-ui/react";

import { AspectRatio } from '@chakra-ui/react'
export default function GamesCard(x, index, h, imageCover, g, ml,w) {
console.log(x)
  return (
    <>
      <Link href={x.externalLink || `${g.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-")}/${x.link}`}>
        <Box

          mb={10}
          key={index}
          minW={"200px"}
          background="linear-gradient(167.05deg, rgba(5, 27, 39, 0) 29.74%, #000 90.57%)"
          textAlign={"center"}
          borderRadius={"15px"}
          boxShadow="0px 0px 4px #ffffffb0"
          ml={ml}
          position="relative" // Allows for absolute positioning of children
        >
          {x.videolink ?

            <video style={{height:h,width:w}} loop="true"   autoPlay muted>
              <source src={`/assets/images/${x.videolink}`}  type="video/mp4" />
              Your browser does not support the video tag.

            </video>




            :
            <Image
              w={200}
              h={h}
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
      </Link>
    </>
  );
}
