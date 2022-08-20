import Link from "next/link";
import styles from "@styles/Navbar.module.css";
import {
  HStack,
  Spacer,
  Text,
  Image,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { BellIcon, HamburgerIcon } from "@chakra-ui/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Sidebar } from "@components/Sidebar";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack className={styles.navbar}>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="giftly Logo"
          cursor="pointer"
          className={styles.logo}
        ></Image>
      </Link>
      <HStack gap={2}>
        <ConnectButton />
        <BellIcon
          // onClick={onOpen}
          className={styles.bellButton}
          w={7}
          h={7}
        />
        <HamburgerIcon
          onClick={onOpen}
          className={styles.hamburgerButton}
          w={7}
          h={7}
        />
      </HStack>
      <Sidebar isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
};

export default Navbar;
