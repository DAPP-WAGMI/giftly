import type { NextPage } from "next";
import styles from "@styles/Collection.module.css";
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
import { abridgeAddress } from "@utils/abridgeAddress";
import { abridgeMessage } from "@utils/abridgeMessage";
import { useState, useEffect } from "react";
import Link from "next/link";
import withTransition from "@components/withTransition";
// This script demonstrates access to the NFT API via the Alchemy SDK.
import { Network, Alchemy } from "alchemy-sdk";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY, // Replace with your Alchemy API Key.
  network: Network.MATIC_MUMBAI, // Replace with your network.
};

const alchemy = new Alchemy(settings);

const data = {
  balance: 1,
  contract: { address: "0xae6bbc3c94d1a6c086af6a9774b4434a58c793bf" },
  description: "Giftly: desciprhgipewhgipewj",
  media: [],
  metadataError: undefined,
  rawMetadata: {
    name: "Giftly Gift Card Collection #1",
    description: "Giftly: desciprhgipewhgipewj",
    image_url:
      "https://bafkreigmxaglcivuzullazjnwvmtbzo3ioqeqp54azgw2lr66oy6rpvowa.ipfs.nftstorage.link/",
  },
  timeLastUpdated: "2022-08-21T04:27:26.274Z",
  title: "Giftly Gift Card Collection #1",
  tokenId: "1",
  tokenType: "ERC721",
  tokenUri: {
    raw: "https://bafkreiez2ez4xqb4xio3fztlu6tlsjc3slpoq4tokhxswpzqgkodbtdg4y.ipfs.nftstorage.link/",
    gateway:
      "https://bafkreiez2ez4xqb4xio3fztlu6tlsjc3slpoq4tokhxswpzqgkodbtdg4y.ipfs.nftstorage.link/",
  },
};

const receivedCardData = [
  {
    gifter: "0xD07b84827096306B01a2EF3193026Ed6A6BF8Fb8",
    date: "Aug. 21st, 2022",
    message: "Dear Alice, thank you so much for being such ",
    amount: "0.5",
    tokenSymbol: "MATIC",
    cardImage: "/cards/appreciation_2.jpg",
    claimed: false,
  },
  {
    gifter: "0x5A84969bb6627C5A094b478EE979C1dF1069b99A",
    date: "Jun. 16th, 2022",
    message: "hey alice! thanks for helping me with last week",
    amount: "50",
    tokenSymbol: "USDC",
    cardImage: "/cards/featured_3.jpg",
    claimed: true,
  },
  {
    gifter: "0x6F46CF5569A67588B43E4134D88A1aDC40e4dc6D",
    date: "May 5th, 2022",
    message: "HAPPY BIRTHDAY BADDEST BISHHHH! THIS FRIDAY",
    amount: "20",
    tokenSymbol: "MATIC",
    cardImage: "/cards/birthday_5.jpg",
    claimed: true,
  },
  {
    gifter: "0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb",
    date: "Apr. 1st, 2022",
    message: "Dear Alice, you are the kindest soul ever to exist.",
    amount: "25",
    tokenSymbol: "MATIC",
    cardImage: "/cards/love_1.jpg",
    claimed: true,
  },
  {
    gifter: "0xD07b84827096306B01a2EF3193026Ed6A6BF8Fb8",
    date: "Mar. 17th, 2022",
    message: "You are an amazing person and I cherish our.",
    amount: "100",
    tokenSymbol: "USDC",
    cardImage: "/cards/love_2.jpg",
    claimed: true,
  },
  {
    gifter: "0x95cED938F7991cd0dFcb48F0a06A5Dd051d7CC1C",
    date: "Aug 18, 2022",
    message: "sending you good vibez today:) let me know",
    amount: "30",
    tokenSymbol: "USDT",
    cardImage: "/cards/appreciation_4.jpg",
    claimed: true,
  },
  {
    gifter: "0x3E5e9111Ae8eB78Fe1CC3bb89e84269D7aA5A296",
    date: "Feb. 14th, 2022",
    message: "Alice, you single-handedly ran the show today",
    amount: "20",
    tokenSymbol: "USDC",
    cardImage: "/cards/appreciation_1.jpg",
    claimed: true,
  },
  {
    gifter: "0x28a8746e75304c0780E011B41825785639C52814",
    date: "Jan. 1st, 2022",
    message: "Thank you so much for last week's work. Really",
    amount: "20",
    tokenSymbol: "MATIC",
    cardImage: "/cards/thanks_3.jpg",
    claimed: true,
  },
  {
    gifter: "0x71f0B67FdA57F68dC5D928d0Ec775F8eF135fae6",
    date: "Oct. 28th, 2021",
    message: "Hey Alice, I know things have been tough lately",
    amount: "50",
    tokenSymbol: "MATIC",
    cardImage: "/cards/featured_4.jpg",
    claimed: true,
  },
];

const sentCardData = [
  {
    gifter: "0xD07b84827096306B01a2EF3193026Ed6A6BF8Fb8",
    date: "Aug 18, 2022",
    message:
      "Dear Mr. President,\nI would like to express my gratitude for your tireless efforts to make America great again. I appreciate all that you have done to improve the economy and create jobs. I also appreciate your efforts to keep America safe by strengthen our military and improve our security. I am proud to have you as my president and I look forward to seeing more great things from you in the future.\n  Sincerely, [Your name]",
    amount: "200",
    tokenSymbol: "MATIC",
    cardImage: "/cards/featured_5.png",
  },
  {
    gifter: "0xD07b84827096306B01a2EF3193026Ed6A6BF8Fb8",
    date: "Aug 18, 2022",
    message:
      "Dear Mr. President,\nI would like to express my gratitude for your tireless efforts to make America great again. I appreciate all that you have done to improve the economy and create jobs. I also appreciate your efforts to keep America safe by strengthen our military and improve our security. I am proud to have you as my president and I look forward to seeing more great things from you in the future.\n  Sincerely, [Your name]",
    amount: "200",
    tokenSymbol: "MATIC",
    cardImage: "/cards/featured_6.png",
  },
  {
    gifter: "0xD07b84827096306B01a2EF3193026Ed6A6BF8Fb8",
    date: "Aug 18, 2022",
    message:
      "Dear Mr. President,\nI would like to express my gratitude for your tireless efforts to make America great again. I appreciate all that you have done to improve the economy and create jobs. I also appreciate your efforts to keep America safe by strengthen our military and improve our security. I am proud to have you as my president and I look forward to seeing more great things from you in the future.\n  Sincerely, [Your name]",
    amount: "200",
    tokenSymbol: "MATIC",
    cardImage: "/cards/featured_7.png",
  },
  {
    gifter: "0xD07b84827096306B01a2EF3193026Ed6A6BF8Fb8",
    date: "Aug 18, 2022",
    message:
      "Dear Mr. President,\nI would like to express my gratitude for your tireless efforts to make America great again. I appreciate all that you have done to improve the economy and create jobs. I also appreciate your efforts to keep America safe by strengthen our military and improve our security. I am proud to have you as my president and I look forward to seeing more great things from you in the future.\n  Sincerely, [Your name]",
    amount: "200",
    tokenSymbol: "MATIC",
    cardImage: "/cards/thanks_1.png",
  },
];

const Collection: NextPage = () => {
  const [selected, setSelected] = useState<string>("received");
  const [fetchedNFTCards, setFetchedNFTCards] = useState<any[]>([]);

  const filteredCards =
    selected === "received" ? receivedCardData : sentCardData;

  useEffect(() => {
    async function fetchMumbaiNFTs() {
      // Print owner's wallet address:
      const ownerAddr = "0xC33003bcEF8DB78167EC77f6ed3B904f8C814649";
      console.log("fetching NFTs for address:", ownerAddr);
      console.log("...");

      // Print total NFT count returned in the response:
      const nftsForOwner = await alchemy.nft.getNftsForOwner(
        "0xC33003bcEF8DB78167EC77f6ed3B904f8C814649"
      );
      console.log("number of NFTs found:", nftsForOwner.totalCount);
      console.log("...");

      // Print contract address and tokenId for each NFT:
      for (const nft of nftsForOwner.ownedNfts) {
        console.log("===");
        console.log("contract address:", nft.contract.address);
        console.log("token ID:", nft.tokenId);
        console.log("nft", nft);
      }
      console.log("===");

      setFetchedNFTCards(nftsForOwner.ownedNfts);
    }
    fetchMumbaiNFTs();
  }, []);

  return (
    <VStack className={styles.container}>
      <HStack className={styles.titleContainer}>
        <Text className={styles.title}>Your Gift Cards</Text>
        <ButtonGroup isAttached>
          <Button
            isDisabled={selected === "received"}
            className={styles.groupButton}
            onClick={() => setSelected("received")}
          >
            Received
          </Button>
          <Button
            isDisabled={selected === "sent"}
            className={styles.groupButton}
            onClick={() => setSelected("sent")}
          >
            Sent
          </Button>
        </ButtonGroup>
      </HStack>
      <VStack className={styles.cardListContainer}>
        {/* {fetchedNFTCards.map(
          (
            { gifter, date, message, amount, tokenSymbol, cardImage },
            index
          ) => (
            <NFTCard
              key={index}
              gifter={gifter}
              date={date}
              message={message}
              amount={amount}
              tokenSymbol={tokenSymbol}
              cardImage={cardImage}
              index={index}
              selected={selected}
              showDivider={index !== filteredCards.length - 1}
            />
          )
        )} */}
        {filteredCards.map(
          (
            { gifter, date, message, amount, tokenSymbol, cardImage, claimed },
            index
          ) => (
            <NFTCard
              key={index}
              gifter={gifter}
              date={date}
              message={message}
              amount={amount}
              tokenSymbol={tokenSymbol}
              cardImage={cardImage}
              index={index}
              selected={selected}
              claimed={claimed}
              showDivider={index !== filteredCards.length - 1}
            />
          )
        )}
      </VStack>
    </VStack>
  );
};

type NFTCardProps = {
  selected?: string;
  gifter: string;
  date: string;
  message: string;
  amount: string;
  tokenSymbol: string;
  cardImage: string;
  index: number;
  claimed: boolean;
  showDivider?: boolean;
};

const NFTCard = ({
  selected,
  gifter,
  date,
  message,
  amount,
  tokenSymbol,
  cardImage,
  index,
  claimed,
  showDivider = true,
}: NFTCardProps) => {
  return (
    <>
      <HStack key={index} className={styles.cardContainer} gap={10}>
        <Image
          src={cardImage}
          alt="nft sample"
          cursor="pointer"
          className={styles.cardImage}
        ></Image>
        <VStack className={styles.textContainer}>
          <Text className={styles.fromText}>{`${
            selected === "received" ? "From" : "To"
          }: ${abridgeAddress(gifter)}`}</Text>
          <Text className={styles.dateText}>{`Date: ${date}`}</Text>
          <Text className={styles.messageText}>
            {abridgeMessage(message, 50)}
          </Text>
          <Text
            className={styles.amountText}
          >{`Gift Amount: ${amount} ${tokenSymbol}`}</Text>
        </VStack>
        <HStack>
          <Link href="/card/27">
            <Button className={styles.detailsButton}>View Details</Button>
          </Link>
          {!claimed ? (
            <Button className={styles.claimButton}>Claim Gift</Button>
          ) : (
            <Button isDisabled className={styles.claimedButton}>
              Claimed
            </Button>
          )}
        </HStack>
      </HStack>
      {showDivider && <hr className={styles.divider}></hr>}
    </>
  );
};

export default withTransition(Collection);
