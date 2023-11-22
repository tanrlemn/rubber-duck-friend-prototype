'use client';

// chakra-ui
import { Flex, Heading, Link, Box, Highlight } from '@chakra-ui/react';

// local components
import Underscore from '@/app/_components/brandElements/underscore.js';

export default function Logo({
  color,
  shouldLink = true,
  animate = false,
  isDesktop = false,
}) {
  return (
    <>
      {shouldLink ? (
        <Link
          pt={isDesktop ? 0 : '0.2rem'}
          mr={isDesktop ? 0 : '1.25rem'}
          href='/'
          _hover={{ textDecoration: 'none' }}
          textDecoration={'none'}>
          <LogoContent color={color} />
        </Link>
      ) : (
        <LogoContent
          color={color}
          animate={animate}
        />
      )}
    </>
  );
}

export const LogoContent = ({ color, animate }) => {
  return (
    <Flex
      maxW={'fit-content'}
      minW={'fit-content'}
      pt={'0.2rem'}
      color={color?.font || 'var(--purpleGrayAlt)'}
      borderRadius={'var(--mainBorderRadius)'}
      transition={'all 0.2s ease-in-out'}
      _hover={{
        outline: '1px solid var(--midPurpleGray, #432E4C)',
      }}
      align={'flex-end'}
      p={'0.3125rem 1.4375rem'}>
      <Box
        pb={'0.3rem'}
        className={animate && 'animateUnderscore'}>
        <Underscore color={color?.underscore || 'var(--orange, #FF7300)'} />
      </Box>

      <Heading
        ml={'0.3125rem'}
        className={animate && 'animateText'}
        color={color?.font || 'var(--purpleGrayAlt)'}
        fontWeight={600}
        lineHeight={'1.56288rem'}
        letterSpacing={'-0.02688rem'}
        textTransform={'lowercase'}
        size={'md'}>
        <Highlight
          styles={{
            color: 'var(--teal)',
            fontWeight: 700,
            fontSize: '0.7rem',
            verticalAlign: 'super',
          }}
          query={'Beta'}>
          Rubber Duck Friend Beta
        </Highlight>
      </Heading>
    </Flex>
  );
};
