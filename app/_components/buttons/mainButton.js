'use client';

// chakra-ui
import { Button } from '@chakra-ui/react';

export default function MainButton({
  text,
  bgColor = 'var(--midPurpleGray, #e0c8ea)',
  textColor = 'var(--blackAlt, #161616)',
  borderColor = 'var(--darkPurpleGray, #584361)',
  hoverBgColor = 'var(--lightPurpleGray, #B397BF)',
  hoverTextColor = 'var(--blackAlt, #161616)',
  hoverBorderColor = 'var(--darkPurpleGray, #584361)',
  borderRadius = 'var(--mainBorderRadius)',
  setOpenContact,
}) {
  return (
    <Button
      onClick={() => setOpenContact && setOpenContact(true)}
      _hover={{
        background: hoverBgColor,
        color: hoverTextColor,
        borderColor: hoverBorderColor,
      }}
      p={'0.8125rem 1.4375rem'}
      border={`2px solid ${borderColor}`}
      borderRadius={borderRadius}
      background={bgColor}
      color={textColor}
      fontSize={'0.9rem'}
      fontWeight={600}>
      {text}
    </Button>
  );
}
