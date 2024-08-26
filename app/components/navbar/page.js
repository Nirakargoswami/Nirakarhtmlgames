"use client";
import { useDisclosure, Spinner, Flex, Button, Heading, VStack, Link, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, CloseButton, IconButton, Divider, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import jsonData from "../../../data/sidebar.json"; // Adjust the path as needed



const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // console.log(jsonData);
  return (
    <>
      {/* Button to open the drawer */}
      <Flex
        as="nav"
        h="70px"
        align="center"
        boxShadow="0px 0px 5px #ebebeb47"
        bg="#070a35"
        color="white"
      >

        <IconButton
          icon={<HamburgerIcon />}
          variant="ghost"
          color={"white"}
          aria-label="Open menu"
          _hover={{
            color: "#151c6a",
          }}
          onClick={onOpen}
        />
        <Flex justifyContent={"center"} w={"100%"}>
          <Heading fontSize={["18px"]}>Games World</Heading>
        </Flex>
      </Flex>


      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="#151c6a">
          <DrawerHeader color={"white"} borderBottomWidth="1px">
          Mini Games
            <CloseButton onClick={onClose} color="white" float="right" />
          </DrawerHeader>
          <DrawerBody>
            <VStack align="flex-start" spacing="4">
              {jsonData[0].menuLinks?.map((link) => (
                <Link
                  key={link.label}
                  href={link.path}
                  color="white"
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              ))}

              <Divider border={"1px solid"} color={"white"} />

              {/* Generate other links dynamically */}
              {jsonData[0].otherLinks.map((link) => (
                <Link key={link.label} href={link.path} color="white" onClick={onClose}>
                  {link.label}
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
