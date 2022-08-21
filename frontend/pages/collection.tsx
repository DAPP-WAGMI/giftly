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
import { useState } from "react";
import Link from "next/link";
import withTransition from "@components/withTransition";

const receivedCardData = [
  {
    gifter: "0xD07b84827096306B01a2EF3193026Ed6A6BF8Fb8",
    date: "Aug 18, 2022",
    message:
      "Dear Mr. President,\nI would like to express my gratitude for your tireless efforts to make America great again. I appreciate all that you have done to improve the economy and create jobs. I also appreciate your efforts to keep America safe by strengthen our military and improve our security. I am proud to have you as my president and I look forward to seeing more great things from you in the future.\n  Sincerely, [Your name]",
    amount: "200",
    tokenSymbol: "MATIC",
    cardImage: "/1.png",
  },
  {
    gifter: "0xD07b84827096306B01a2EF3193026Ed6A6BF8Fb8",
    date: "Aug 18, 2022",
    message:
      "Dear Mr. President,\nI would like to express my gratitude for your tireless efforts to make America great again. I appreciate all that you have done to improve the economy and create jobs. I also appreciate your efforts to keep America safe by strengthen our military and improve our security. I am proud to have you as my president and I look forward to seeing more great things from you in the future.\n  Sincerely, [Your name]",
    amount: "200",
    tokenSymbol: "MATIC",
    cardImage: "/2.png",
  },
  {
    gifter: "0xD07b84827096306B01a2EF3193026Ed6A6BF8Fb8",
    date: "Aug 18, 2022",
    message:
      "Dear Mr. President,\nI would like to express my gratitude for your tireless efforts to make America great again. I appreciate all that you have done to improve the economy and create jobs. I also appreciate your efforts to keep America safe by strengthen our military and improve our security. I am proud to have you as my president and I look forward to seeing more great things from you in the future.\n  Sincerely, [Your name]",
    amount: "200",
    tokenSymbol: "MATIC",
    cardImage: "/3.png",
  },
  {
    gifter: "0xD07b84827096306B01a2EF3193026Ed6A6BF8Fb8",
    date: "Aug 18, 2022",
    message:
      "Dear Mr. President,\nI would like to express my gratitude for your tireless efforts to make America great again. I appreciate all that you have done to improve the economy and create jobs. I also appreciate your efforts to keep America safe by strengthen our military and improve our security. I am proud to have you as my president and I look forward to seeing more great things from you in the future.\n  Sincerely, [Your name]",
    amount: "200",
    tokenSymbol: "MATIC",
    cardImage: "/4.png",
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
    cardImage: "/5.png",
  },
  {
    gifter: "0xD07b84827096306B01a2EF3193026Ed6A6BF8Fb8",
    date: "Aug 18, 2022",
    message:
      "Dear Mr. President,\nI would like to express my gratitude for your tireless efforts to make America great again. I appreciate all that you have done to improve the economy and create jobs. I also appreciate your efforts to keep America safe by strengthen our military and improve our security. I am proud to have you as my president and I look forward to seeing more great things from you in the future.\n  Sincerely, [Your name]",
    amount: "200",
    tokenSymbol: "MATIC",
    cardImage: "/6.png",
  },
  {
    gifter: "0xD07b84827096306B01a2EF3193026Ed6A6BF8Fb8",
    date: "Aug 18, 2022",
    message:
      "Dear Mr. President,\nI would like to express my gratitude for your tireless efforts to make America great again. I appreciate all that you have done to improve the economy and create jobs. I also appreciate your efforts to keep America safe by strengthen our military and improve our security. I am proud to have you as my president and I look forward to seeing more great things from you in the future.\n  Sincerely, [Your name]",
    amount: "200",
    tokenSymbol: "MATIC",
    cardImage: "/7.png",
  },
  {
    gifter: "0xD07b84827096306B01a2EF3193026Ed6A6BF8Fb8",
    date: "Aug 18, 2022",
    message:
      "Dear Mr. President,\nI would like to express my gratitude for your tireless efforts to make America great again. I appreciate all that you have done to improve the economy and create jobs. I also appreciate your efforts to keep America safe by strengthen our military and improve our security. I am proud to have you as my president and I look forward to seeing more great things from you in the future.\n  Sincerely, [Your name]",
    amount: "200",
    tokenSymbol: "MATIC",
    cardImage: "/8.png",
  },
];

const Collection: NextPage = () => {
  const [selected, setSelected] = useState<string>("received");

  const filteredCards =
    selected === "received" ? receivedCardData : sentCardData;

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
        {filteredCards.map(
          (
            { gifter, date, message, amount, tokenSymbol, cardImage },
            index
          ) => (
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
                  <Button className={styles.detailsButton}>View Details</Button>
                  <Link href="/card/1">
                    <Button className={styles.claimButton}>Claim Gift</Button>
                  </Link>
                </HStack>
              </HStack>
              {index !== filteredCards.length - 1 && (
                <hr className={styles.divider}></hr>
              )}
            </>
          )
        )}
      </VStack>
    </VStack>
  );
};

export default withTransition(Collection);
