import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";

export default function Design() {
    return (
        <>

            <Flex
                key={0}
                w={"360px"}
               p={7}
               ml={10}
                mt={10}
            
                justify={"space-around"}
                align={"center"}
                borderRadius={"20px"}
                bg={"#5900d9"}
                boxShadow="rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
            >

                <Box>
                    <Text fontWeight={"bold"} color={"white"}>Allow Notifications</Text>
                    <Text fontWeight={"400"} color={"white"} fontSize={"12px"}>Stay updated with latest games</Text>
                    <Button size='sm' p={"0px 22px 0px 22px"} borderRadius={"50px"} bg={"yellow"} mt={"6px"}>Allow</Button>
                </Box>

                <Box>
                    <Image borderRadius={"50px"} w={"100px"} src=" /assets/images/dontCrash.jpeg" />
                </Box>
            </Flex>
        </>




    )
}



