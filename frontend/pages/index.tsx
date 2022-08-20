import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { HStack, VStack, Image, Text, Button } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Giftly</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <HStack className={styles.bannerContainer}>
          <VStack className={styles.bannerLeftSection}>
            <Text className={styles.bannerTitle}>
              Send a gift card to express your love and gratitude to someone
              <span className={styles.specialWord}> special</span> today.
            </Text>
            <Text className={styles.bannerSubtitle}>
              The perfect gift, for every occasion.
            </Text>
            <HStack>
              <Button className={styles.bannerSendButton}>Send Gift</Button>
              <Button className={styles.bannerExploreButton}>Explore </Button>
            </HStack>
          </VStack>
          <VStack className={styles.bannerRightSection}>
            <Image
              src="/main.png"
              alt="Banner gift card"
              className={styles.bannerCard}
            />
          </VStack>
        </HStack>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
