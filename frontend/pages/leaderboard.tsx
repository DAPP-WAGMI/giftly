import type { NextPage } from "next";
import styles from "@styles/Leaderboard.module.css";
import {
  Box,
  HStack,
  VStack,
  Text,
  Input,
  Button,
  Select,
  ButtonGroup,
} from "@chakra-ui/react";
import { abridgeAddress } from "@utils/abridgeAddress";
import { abridgeMessage } from "@utils/abridgeMessage";
import { useState } from "react";
import Link from "next/link";
import withTransition from "@components/withTransition";
import { ExternalLinkIcon } from "@chakra-ui/icons";

type ScoreData = {
  wallet: string;
  numSent: string;
  frequency: string;
  amount: string;
  donated: string;
};

const gifterData: ScoreData[] = [
  {
    wallet: "0x5A84969bb6627C5A094b478EE979C1dF1069b99A",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x6F46CF5569A67588B43E4134D88A1aDC40e4dc6D",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x95cED938F7991cd0dFcb48F0a06A5Dd051d7CC1C",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x3E5e9111Ae8eB78Fe1CC3bb89e84269D7aA5A296",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x28a8746e75304c0780E011B41825785639C52814",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x71f0B67FdA57F68dC5D928d0Ec775F8eF135fae6",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x1dF62f291b2E969fB0849d99D9Ce41e2F137006e",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4b",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x95cED938F7991cd0dFcb48F0a06A5Dd051d7CC1C",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x3E5e9111Ae8eB78Fe1CC3bb89e84269D7aA5A296",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x28a8746e75304c0780E011B41825785639C52814",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x71f0B67FdA57F68dC5D928d0Ec775F8eF135fae6",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
];

const gifteeData: ScoreData[] = [
  {
    wallet: "kartik.eth",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x6F46CF5569A67588B43E4134D88A1aDC40e4dc6D",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x95cED938F7991cd0dFcb48F0a06A5Dd051d7CC1C",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x3E5e9111Ae8eB78Fe1CC3bb89e84269D7aA5A296",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x28a8746e75304c0780E011B41825785639C52814",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x71f0B67FdA57F68dC5D928d0Ec775F8eF135fae6",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x1dF62f291b2E969fB0849d99D9Ce41e2F137006e",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4b",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x95cED938F7991cd0dFcb48F0a06A5Dd051d7CC1C",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x3E5e9111Ae8eB78Fe1CC3bb89e84269D7aA5A296",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x28a8746e75304c0780E011B41825785639C52814",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
  {
    wallet: "0x71f0B67FdA57F68dC5D928d0Ec775F8eF135fae6",
    numSent: "20",
    frequency: "2.7",
    amount: "200 MATIC",
    donated: "2 MATIC",
  },
];

const sortedGifter = gifterData
  .sort((a, b) => {
    return parseFloat(b.numSent) - parseFloat(a.numSent);
  })
  .slice(0, 10);

const sortedGiftee = gifteeData
  .sort((a, b) => {
    return parseFloat(b.numSent) - parseFloat(a.numSent);
  })
  .slice(0, 10);

const Leaderboard: NextPage = () => {
  const [scores, setScores] = useState<ScoreData[]>(sortedGifter);
  const [selected, setSelected] = useState<string>("gifter");
  const traits = ["numSent", "frequency", "amount", "donated"];

  const handleSwitch = (selected: string) => {
    setSelected(selected);
    const selectedScores = selected === "gifter" ? sortedGifter : sortedGiftee;
    setScores(selectedScores);
  };

  function handleSortByTrait(e: any) {
    const newScores = JSON.parse(JSON.stringify(scores));
    if (e.target.value === "numSent") {
      newScores.sort(
        (a: ScoreData, b: ScoreData) => Number(b.numSent) - Number(a.numSent)
      );
    }
    if (e.target.value === "frequency") {
      newScores.sort(
        (a: ScoreData, b: ScoreData) =>
          Number(b.frequency) - Number(a.frequency)
      );
    }
    if (e.target.value === "amount") {
      newScores.sort(
        (a: ScoreData, b: ScoreData) => Number(b.amount) - Number(a.amount)
      );
    }
    if (e.target.value === "donated") {
      newScores.sort(
        (a: ScoreData, b: ScoreData) => Number(b.donated) - Number(a.donated)
      );
    }
    setScores(newScores);
  }

  return (
    <VStack className={styles.container}>
      <HStack className={styles.titleContainer}>
        <Text className={styles.title}>Leaderboard</Text>
        <ButtonGroup isAttached>
          <Button
            isDisabled={selected === "gifter"}
            className={styles.groupButton}
            onClick={() => handleSwitch("gifter")}
          >
            Gifter
          </Button>
          <Button
            isDisabled={selected === "giftee"}
            className={styles.groupButton}
            onClick={() => handleSwitch("giftee")}
          >
            Giftee
          </Button>
        </ButtonGroup>
      </HStack>
      <HStack className={styles.filterSection}>
        <Text paddingLeft="1rem">Sort By:</Text>
        <Select
          placeholder="Select option"
          w="200px"
          onChange={handleSortByTrait}
        >
          {traits.map((trait) => (
            <option key={trait} value={trait}>
              {trait}
            </option>
          ))}
        </Select>
      </HStack>
      <HStack className={styles.headerSection}>
        <Text>Rank</Text>
        <Text className={styles.walletAddressHeader}>Account</Text>

        <HStack className={styles.scoreSection}>
          <Text className={styles.XPscore}>Total Cards</Text>
          <Text className={styles.XPscore}>Frequency</Text>
          <Text className={styles.XPscore}>Total Amount</Text>
          <Text className={styles.XPscore}>Total Donated</Text>
        </HStack>
      </HStack>
      <VStack className={styles.leaderboardSection}>
        {scores.map((item, idx) => (
          <HStack key={idx} className={styles.nftContainer}>
            <Text className={styles.title}>{idx + 1}</Text>
            <Text className={styles.walletAddress}>{item.wallet}</Text>
            <HStack className={styles.scoresSection2}>
              <Text className={styles.subtitle}>{item.numSent}</Text>
              <Text className={styles.subtitle}>{item.frequency}</Text>
              <Text className={styles.subtitle}>{item.amount}</Text>
              <Text className={styles.subtitle}>{item.donated}</Text>
            </HStack>
            {/* <HStack className={styles.thirdSection2}>
              <Text className={styles.subtitle}>{item.github}</Text>
              <Text className={styles.subtitle}>{item.discord}</Text>
              <Text className={styles.subtitle}>{item.tier}</Text>
            </HStack> */}
            <ExternalLinkIcon />
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default withTransition(Leaderboard);
