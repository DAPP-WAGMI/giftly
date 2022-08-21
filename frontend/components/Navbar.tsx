import Link from "next/link";
import styles from "@styles/Navbar.module.css";
import {
  HStack,
  VStack,
  Spacer,
  Text,
  Image,
  Box,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { BellIcon, HamburgerIcon } from "@chakra-ui/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Sidebar } from "@components/Sidebar";
import { useAccount } from "wagmi";

const Navbar = () => {
  const { address } = useAccount();
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

        {address === "0x005A4A8Ae3a332b953880Cd6c05A559b36bD3394" ? (
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Box className={styles.notificationBox}>
                <Image
                  src="/one.png"
                  alt="notification"
                  cursor="pointer"
                  className={styles.redAlert}
                ></Image>
                <BellIcon className={styles.bellButton} w={7} h={7} />
              </Box>
            </PopoverTrigger>
            <PopoverContent zIndex={4}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <Link href="/collection">
                  <HStack className={styles.notificationContainer}>
                    <Image
                      src="/gifticon.png"
                      alt="notification"
                      className={styles.giftIcon}
                    ></Image>
                    <VStack className={styles.notificationTitleContainer}>
                      <Text className={styles.notificationTitle}>
                        You’ve received a gift card!
                      </Text>
                      <Text className={styles.notificationSubtitle}>
                        1 minute ago
                      </Text>
                    </VStack>
                  </HStack>
                </Link>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ) : (
          <Box className={styles.notificationBox}>
            <BellIcon className={styles.bellButton} w={7} h={7} />
          </Box>
        )}
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
