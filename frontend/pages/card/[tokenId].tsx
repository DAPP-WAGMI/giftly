import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "@styles/Card.module.css";
import {
  Box,
  HStack,
  VStack,
  Text,
  Input,
  Button,
  Select,
  Switch,
  Image,
  Spacer,
  Spinner,
  Textarea,
  ButtonGroup,
} from "@chakra-ui/react";
import Link from "next/link";
import { abridgeAddress } from "@utils/abridgeAddress";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const data = {
  gifter: "0xD07b84827096306B01a2EF3193026Ed6A6BF8Fb8",
  date: "Aug 18, 2022",
  message:
    "Dear Mr. President,\nI would like to express my gratitude for your tireless efforts to make America great again. I appreciate all that you have done to improve the economy and create jobs. I also appreciate your efforts to keep America safe by strengthen our military and improve our security. I am proud to have you as my president and I look forward to seeing more great things from you in the future.\n  Sincerely, [Your name]",
  amount: "200",
  tokenSymbol: "MATIC",
  cardImage: "/main.png",
};

const CardPage: NextPage = () => {
  const router = useRouter();
  const { tokenId } = router.query;

  return (
    <VStack className={styles.container}>
      <VStack className={styles.titleContainer}>
        <Text className={styles.title}>
          You’ve received a special gift from
        </Text>
        <Text className={styles.coloredTitle}>
          {abridgeAddress(data.gifter)}
        </Text>
      </VStack>

      <VStack className={styles.contentContainer} gap={5}>
        <Image
          src={data.cardImage}
          alt="nft sample"
          cursor="pointer"
          className={styles.cardImage}
        ></Image>

        <Text
          className={styles.amountText}
        >{`Gift Amount: ${data.amount} ${data.tokenSymbol}`}</Text>

        <VStack className={styles.messageContainer} gap={5}>
          <Text className={styles.messageText}>{data.message}</Text>
          <Text className={styles.dateText}>{`Date: ${data.date}`}</Text>
        </VStack>

        <VStack className={styles.metadataContainer} gap={5}>
          <Text className={styles.metadataTitle}>Gift Card Details</Text>
          <HStack className={styles.metadataSubtitleContainer}>
            <Text className={styles.metadataSubtitle}>
              Polygonscan Transaction
            </Text>
            <ExternalLinkIcon />
          </HStack>
          <HStack className={styles.metadataSubtitleContainer}>
            <Text className={styles.metadataSubtitle}>IPFS Metadata</Text>
            <ExternalLinkIcon />
          </HStack>
          <HStack className={styles.metadataSubtitleContainer}>
            <Text className={styles.metadataSubtitle}>View on Opensea</Text>
            <ExternalLinkIcon />
          </HStack>
        </VStack>
        <HStack>
          <Link href="/">
            <Button className={styles.claimButton}>Claim Gift</Button>
          </Link>
          <Button className={styles.detailsButton}>Claim Later</Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default CardPage;
