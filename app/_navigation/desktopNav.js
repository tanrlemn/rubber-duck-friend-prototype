'use client';

// context
// import { SessionContext } from '../lib/providers/SessionProvider';

// hooks
import { useContext } from 'react';

// chakra-ui
import { HStack, Link } from '@chakra-ui/react';

// local components
import { routeList } from './routeList';

export default function DesktopNav() {
  return (
    <>
      <HStack
        justify={'space-between'}
        flexGrow={1}>
        <HStack>
          {/* {routeList.map((route) => (
            <NavLink
              key={route.path}
              title={route.title}
              path={route.path}
            />
          ))} */}
        </HStack>
      </HStack>
    </>
  );
}

const NavLink = ({ title, path }) => {
  return (
    <Link
      _hover={{
        background: 'var(--lightOrange, #F8AD4F)',
        color: 'var(--darkPurpleGrayAlt, #432E4C)',
        borderRadius: 'var(--mainBorderRadius)',
      }}
      transition={'all 0.2s ease-in-out'}
      p={'0.5625rem 1.25rem'}
      href={path}>
      {title}
    </Link>
  );
};
