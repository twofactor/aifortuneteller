import { Flex } from "@chakra-ui/react";

const PrimaryCard = (props) => {
  return (
    <Flex
      backgroundColor="rgba(255, 167, 36, 0.1)"
      border="0.5px solid rgba(255, 210, 0, 0.1)"
      boxShadow="0px 1px 6px rgba(255, 165, 0, 0.1)"
      backdropFilter="blur(6px)"
      {...props}
    />
  );
};

export default PrimaryCard;
