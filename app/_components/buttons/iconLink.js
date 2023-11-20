'use client';

// chakra-ui
import { Button, Text, Icon } from '@chakra-ui/react';
// import { ArrowDownIcon } from '@chakra-ui/icons';

export default function IconLink({
  text,
  fontSize = '1rem',
  bgColor = 'transparent',
  textColor = 'var(--blackAlt, #161616)',
  borderColor = 'transparent',
  borderBottom = '1px solid var(--lightGreen, #B6E8BE)',
  hoverBgColor = 'transparent',
  hoverTextColor = 'var(--blackAlt, #161616)',
  hoverBorderColor = 'transparent',
  borderRadius = 0,
  // rightIcon = <ArrowDownIcon />,
  reverse = false,
  padding = 0,
}) {
  return (
    <Button
      _hover={{
        background: hoverBgColor,
        color: hoverTextColor,
        borderColor: hoverBorderColor,
      }}
      p={padding}
      border={`2px solid ${borderColor}`}
      borderRadius={borderRadius}
      background={bgColor}
      color={textColor}
      fontSize={'0.9rem'}
      fontWeight={600}>
      {/* {reverse && rightIcon} */}
      <Text
        fontSize={fontSize}
        mr={reverse ? 0 : '0.2rem'}
        ml={reverse ? '0.3rem' : 0}
        pb={'0.1rem'}
        borderBottom={borderBottom}>
        {text}
      </Text>
      {/* {!reverse && rightIcon} */}
    </Button>
  );
}
