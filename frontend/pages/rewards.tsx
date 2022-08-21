import type { NextPage } from "next";
import Head from "next/head";
import styles from "@styles/Rewards.module.css";
import { HStack, VStack, Image, Text, Button, Box } from "@chakra-ui/react";
import Link from "next/link";
import withTransition from "@components/withTransition";

const Rewards: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Giftly</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <HStack className={styles.bannerContainer}>
          <VStack className={styles.bannerLeftSection} gap={2}>
            <Text className={styles.bannerTitle}>Giftly Rewards Program</Text>
            <Text className={styles.bannerSubtitle}>
              Returning kindness, with kindness.
            </Text>
            <Text className={styles.bannerText}>
              Every month, the “Giftly Rewards Program” sends the Top 10 Gifters
              and Top 10 Giftees 50% of the Giftly Treasury as a reward for
              their kindness.
            </Text>
            <HStack>
              <Button className={styles.bannerSendButton}>
                See Past Recipients
              </Button>
              <Button className={styles.bannerExploreButton}>Learn More</Button>
            </HStack>
          </VStack>
          <VStack className={styles.bannerRightSection}>
            <Image
              src="/gifter.png"
              alt="Banner gift card"
              className={styles.gifterCard}
            />
            <Image
              src="/giftee.png"
              alt="Banner gift card"
              className={styles.gifteeCard}
            />
          </VStack>
        </HStack>
        <Box h="5rem"></Box>
      </main>
    </div>
  );
};

export default withTransition(Rewards);
