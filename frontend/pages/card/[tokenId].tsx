/* eslint-disable react/no-unescaped-entities */
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
import withTransition from "@components/withTransition";
import GiftlyProtocol from "@data/GiftlyProtocol.json";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import Confetti from "react-confetti";
import { useState } from "react";

const data = {
  gifter: "Your Secret Admirer",
  date: "Aug. 21st, 2022",
  message:
    "Dear Alice, thank you so much for being such a kind and caring person. You always go out of your way to help others, and you are always so supportive and understanding. You are a true friend, and I am so grateful to have you in my life. Thank you for everything you do, and know that you are always appreciated.",
  amount: "0.5",
  tokenSymbol: "MATIC",
  cardImage: "/cards/appreciation_2.jpg",
};

const CardPage: NextPage = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const [success, setSuccess] = useState<boolean>(false);

  const { config } = usePrepareContractWrite({
    addressOrName: "0x8Dec478C52c63552708559340B6Cc4456a454d49",
    contractInterface: GiftlyProtocol.abi,
    functionName: "claim",
    args: [10],
  });

  const {
    data: txnData,
    isLoading,
    isSuccess,
    write: claimNFT,
  } = useContractWrite(config);

  return isSuccess ? (
    <VStack className={styles.container}>
      <Confetti width={2000} height={1000} numberOfPieces={200} />
      <VStack className={styles.titleContainer}>
        <Text className={styles.title}>
          Yay! You've successfully claimed your gift:)
        </Text>
      </VStack>

      <VStack className={styles.contentContainer} gap={5}>
        <Image
          src={data.cardImage}
          alt="nft sample"
          cursor="pointer"
          className={styles.cardImage}
        ></Image>
        <a
          href={
            txnData
              ? `https://mumbai.polygonscan.com/tx/${txnData.hash}`
              : "https://mumbai.polygonscan.com/tx/0x765cd806c4a62fdfe56be820487a9537d1125bc3ee2cc7c23ee3958ebffcb460"
          }
          rel="noreferrer"
          target="_blank"
        >
          <Text className={styles.yaySubtitle}>
            See Transaction on Polygonscan
          </Text>
        </a>
      </VStack>
    </VStack>
  ) : (
    <VStack className={styles.container}>
      <Confetti width={2000} height={1000} numberOfPieces={200} />
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
            <a
              href="https://polygonscan.com/tx/0x9f8f4d66d988f9b7b6c6c8b85a8d3dc0dafd8020"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLinkIcon />
            </a>
          </HStack>
          <HStack className={styles.metadataSubtitleContainer}>
            <Text className={styles.metadataSubtitle}>IPFS Metadata</Text>
            <a
              href="https://bafybeicx4wvxr4tat2a6yiszedmwfdaw6rwrufjbd5cnl4upsm47l7bpqi.ipfs.w3s.link/tokenURI.json"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLinkIcon />
            </a>
          </HStack>
          <HStack className={styles.metadataSubtitleContainer}>
            <Text className={styles.metadataSubtitle}>View on Opensea</Text>
            <ExternalLinkIcon />
          </HStack>
        </VStack>
        <HStack>
          <Button
            className={styles.claimButton}
            // onClick={() => setSuccess(true)}
            onClick={claimNFT ? (claimNFT as any) : () => {}}
          >
            {isLoading ? <Spinner color="white" /> : "Claim Gift"}
          </Button>
          <Link href="/">
            <Button className={styles.detailsButton}>Claim Later</Button>
          </Link>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default withTransition(CardPage);
