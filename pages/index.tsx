import Head from "next/head";
import Image from "next/image";

import { Flex, Box, Text } from "@chakra-ui/react";
import PrimaryCard from "../components/@UI/PrimaryCard";
import SecondaryCard from "../components/@UI/SecondaryCard";

import FortuneTeller from "../components/FortuneTeller";

import { Space_Mono } from "next/font/google";

const spacemono = Space_Mono({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fortune Teller</title>
        <link rel="icon" type="image/png" href="kirbyfortune.png"></link>
      </Head>
      <Flex
        backgroundColor="black"
        height="100vh"
        boxSizing="border-box"
        padding="8px"
        className={spacemono.className}
        backgroundImage="/background.jpg"
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
      >
        <Flex
          width={["100vw", "100vw", "360px", "360px"]}
          flexDirection="column"
          gap="8px"
          margin="auto"
          boxSizing="border-box"
          padding={["8px", "16px", "0px", "0px"]}
          height="100%"
        >
          <PrimaryCard
            padding="12px"
            width="100%"
            textAlign={"center"}
            alignItems="center"
            justifyContent="center"
          >
            <Text
              color={"#FFC266"}
              textShadow="0px 0px 3px rgba(255, 167, 36, 0.5)"
              fontSize="3xl"
            >
              Fortune Teller
            </Text>
          </PrimaryCard>
          <SecondaryCard
            flexDirection="column"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize="xl">
              <Image
                src="/kirbyfortune-export.png"
                width="128"
                height="128"
                alt="Pixel art of Kirby as a fortune teller"
              />
            </Text>
          </SecondaryCard>
          <FortuneTeller />
        </Flex>
      </Flex>
    </div>
  );
}
