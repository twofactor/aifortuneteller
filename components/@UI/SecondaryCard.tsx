import React from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

interface SecondaryCardProps extends FlexProps {}

const SecondaryCard: React.FC<SecondaryCardProps> = (props) => {
  return (
    <Flex
      backgroundColor="rgba(0, 0, 0, 0.2)"
      border="0.5px solid rgba(255, 194, 102, 0.2)"
      boxShadow="0px 1px 6px rgba(255, 165, 0, 0.12)"
      backdropFilter="blur(6px)"
      {...props}
    />
  );
};

export default SecondaryCard;
