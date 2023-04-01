import Head from "next/head";
import Image from "next/image";

import { Flex, Box, Text } from "@chakra-ui/react";
import PrimaryCard from "../components/@UI/PrimaryCard";
import SecondaryCard from "../components/@UI/SecondaryCard";

import FortuneTeller from "../components/FortuneTeller";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Flex backgroundColor="black" minHeight="100vh">
        <Flex
          maxWidth="320px"
          flexDirection="column"
          gap="8px"
          margin="auto"
          marginTop={["8px", "16px", "32px", "32px"]}
        >
          <PrimaryCard padding="12px" width="100%">
            <Text
              color={"#FFC266"}
              textShadow="0px 0px 3px rgba(255, 167, 36, 0.5)"
              fontSize="3xl"
            >
              AI Fortune Teller
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
