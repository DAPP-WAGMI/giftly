import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import styles from "@styles/Navbar.module.css";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent
        bgColor="#fef7fa"
        borderLeft="1px solid rgba(255,255,255,.3)"
        paddingTop="3rem"
      >
        <DrawerCloseButton color="#000000" />

        <DrawerBody className={styles.drawerBody}>
          <Link href="/about">
            <Button className={styles.drawerButton}>ABOUT</Button>
          </Link>
          <Link href="/create">
            <Button className={styles.drawerButton}>CREATE</Button>
          </Link>
          <Link href="/mycards">
            <Button className={styles.drawerButton}>MY CARDS</Button>
          </Link>
          <Link href="/leaderboard">
            <Button className={styles.drawerButton}>LEADERBOARD</Button>
          </Link>
          <Link href="/rewards">
            <Button className={styles.drawerButton}>REWARDS</Button>
          </Link>
          <Link href="/">
            <Button className={styles.drawerButton}>DEMO</Button>
          </Link>
        </DrawerBody>

        <DrawerFooter className={styles.drawerFooter}>
          <HStack>
            <div className={styles.drawerFooterLabel}>Made With ❤️ By</div>
            <Button className={styles.drawerFooterButton}>
              <a
                href="https://twitter.com/iamminci"
                target="
                _blank"
              >
                @iamminci
              </a>
            </Button>
          </HStack>
          <a
            href="https://github.com/iamminci/giftly"
            rel="noreferrer"
            target="_blank"
          >
            <IconButton
              aria-label="github icon"
              colorScheme="dark"
              variant="ghost"
              opacity=".7"
              icon={<FaGithub />}
            />
          </a>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
