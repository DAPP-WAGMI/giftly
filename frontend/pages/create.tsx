import type { NextPage } from "next";
import styles from "@styles/Create.module.css";
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
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
//   import { doc, setDoc } from "firebase/firestore";
//   import db from "@firebase/firebase";
import Link from "next/link";
import withTransition from "@components/withTransition";
import CIDs from "@data/cid.json";
import { Web3Storage } from "web3.storage";
import GiftlyProtocol from "@data/GiftlyProtocol.json";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import { ethers } from "ethers";

const cards = [
  "/1.png",
  "/2.png",
  "/3.png",
  "/4.png",
  "/5.png",
  "/6.png",
  "/7.png",
  "/8.png",
];

const WEB3_STORAGE_TOKEN =
  process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERjNTkyMTc3NjlhNjFkMjU1NzliMDlmNzhBQWMyYkNGMTY0NDcxMmQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjEwNTcyNzU5NDMsIm5hbWUiOiJnaWZ0bHkifQ.0behxUifkGPImkPNiaZOFw-61QP8NszNvw6UOEd1Eyo";

// Construct with token and endpoint
const client = new Web3Storage({
  token: WEB3_STORAGE_TOKEN,
  endpoint: new URL("https://api.web3.storage"),
});

const CardCreator: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [publishedContract, setPublishedContract] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("midnight");
  const [uploadedLogoFile, setUploadedLogoFile] = useState<any>("");
  const [uploadedLogoURL, setUploadedLogoURL] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [gifterName, setGifterName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [tokenSupply, setTokenSupply] = useState<string>("1");
  const [githubURL, setGithubURL] = useState<string>("");
  const [showRank, setShowRank] = useState<boolean>(true);
  const [showTier, setShowTier] = useState<boolean>(true);
  const [selectedSocial, setSelectedSocial] = useState<string>("");

  const [tokenURI, setTokenURI] = useState<string>("");

  const { address } = useAccount();

  function getFilesObject() {
    const obj = {
      name: "Giftly Card Collection #1",
      description: `This is a gift card created by Giftly. \n${message}`,
      image:
        "https://bafkreigmxaglcivuzullazjnwvmtbzo3ioqeqp54azgw2lr66oy6rpvowa.ipfs.nftstorage.link/",
      image_url:
        "https://bafkreigmxaglcivuzullazjnwvmtbzo3ioqeqp54azgw2lr66oy6rpvowa.ipfs.nftstorage.link/",
      message: message,
      date: new Date(),
      amount: ethers.utils.parseEther(amount),
      token: "MATIC",
      gifter: gifterName ?? address,
    };
    const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });

    const files = [new File([blob], "metadata.json")];
    return files;
  }

  const uploadMetadata = async () => {
    const files = getFilesObject();
    const cid = await client.put(files);
    console.log("stored files with cid:", cid);
    const uri = `https://${cid}.ipfs.w3s.link/metadata.json`;
    setTokenURI(uri);
    return uri;
  };

  const handleFileChange = (event: any) => {
    console.log("loaded file: ", event.target.files[0]);
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setUploadedLogoURL(url);
    setUploadedLogoFile(event.target.files[0]);
  };

  const { config } = usePrepareContractWrite({
    addressOrName: "0x8Dec478C52c63552708559340B6Cc4456a454d49",
    contractInterface: GiftlyProtocol.abi,
    functionName: "gift",
    args: [recipient, tokenURI, ethers.utils.parseEther(".01")],
    overrides: {
      value: ethers.utils.parseEther(".012"),
    },
  });

  const {
    data: txn,
    isLoading,
    isSuccess,
    write: giftNFT,
  } = useContractWrite(config);

  const handleRecipientChange = (event: any) => {
    console.log("name: ", event.target.value);
    setRecipient(event.target.value);
  };

  const handleGifterNameChange = (event: any) => {
    console.log("name: ", event.target.value);
    setGifterName(event.target.value);
  };

  const handleMessageChange = (event: any) => {
    console.log("protocol: ", event.target.value);
    setMessage(event.target.value);
  };

  const handleAmountChange = (event: any) => {
    console.log("github: ", event.target.value);
    setAmount(event.target.value);
  };

  const handleSelectToken = (e: any) => {
    e.preventDefault();
    setToken(e.target.value);
  };

  //   const handleSelectToken = (event: any) => {
  //     console.log("token supply: ", event.target.value);
  //     // setTokenSupply(event.target.value);
  //   };

  //   const toggleRank = (event: any) => {
  //     console.log("event: ", event.target.checked);
  //     // setShowRank(event.target.checked);
  //   };

  //   const toggleTier = (event: any) => {
  //     console.log("event: ", event.target.checked);
  //     // setShowTier(event.target.checked);
  //   };

  return (
    <HStack className={styles.container}>
      {!publishedContract ? (
        <>
          <Preview
            handleFileChange={handleFileChange}
            selectedTheme={selectedTheme}
            uploadedLogoFile={uploadedLogoFile}
            uploadedLogoURL={uploadedLogoURL}
            tokenSupply={tokenSupply}
            showRank={showRank}
            showTier={showTier}
          />
          <Box className={styles.spacer}></Box>
          <Form
            handleRecipientChange={handleRecipientChange}
            handleGifterNameChange={handleGifterNameChange}
            handleMessageChange={handleMessageChange}
            handleAmountChange={handleAmountChange}
            handleSelectToken={handleSelectToken}
            isLoading={loading}
            giftNFT={giftNFT}
            uploadMetadata={uploadMetadata}
          />
        </>
      ) : (
        <VStack w="100%">
          <Image
            src="/nft2.png"
            alt="nft sample"
            cursor="pointer"
            className={styles.logo}
          ></Image>
          <Text>Community NFT has been successfully published!</Text>
          <a
            href={`https://rinkeby.etherscan.io/address/${publishedContract}`}
            rel="noreferrer"
            target="_blank"
          >
            <Text>{`Etherscan: https://rinkeby.etherscan.io/address/${publishedContract}`}</Text>
          </a>
          <Link href={`/mint/${publishedContract}`}>
            <Text>{`Shareable Link: http://app.credly.dev/mint/${publishedContract}`}</Text>
          </Link>
        </VStack>
      )}
    </HStack>
  );
};

type FormProps = {
  handleRecipientChange: (event: any) => void;
  handleGifterNameChange: (event: any) => void;
  handleMessageChange: (event: any) => void;
  handleAmountChange: (event: any) => void;
  handleSelectToken: (event: any) => void;
  toggleRank: (event: any) => void;
  uploadMetadata: () => Promise<string>;
  giftNFT: any;
  isLoading: boolean;
};

const Form = ({
  handleRecipientChange,
  handleGifterNameChange,
  handleMessageChange,
  handleAmountChange,
  handleSelectToken,
  uploadMetadata,
  giftNFT,
  toggleRank,
  isLoading,
}: FormProps) => {
  return (
    <HStack className={styles.formContainer}>
      <VStack className={styles.editorContainer} gap={3}>
        <VStack className={styles.section}>
          <Text className={styles.editorHeader}>To</Text>
          <Input
            className={styles.editorInput}
            placeholder="Giftee Address (Required)"
            onChange={handleRecipientChange}
          />
        </VStack>

        <VStack className={styles.section}>
          <Text className={styles.editorHeader}>From</Text>
          <Input
            className={styles.editorInput}
            placeholder="Gifter Name (Optional)"
            onChange={handleGifterNameChange}
          />
          <HStack>
            <Switch defaultChecked colorScheme="pink" onChange={() => {}} />
            <Text className={styles.editorText}>
              Display Wallet Address if name is not specified
            </Text>
          </HStack>
        </VStack>

        <VStack className={styles.section}>
          <Text className={styles.editorHeader}>Message</Text>
          <Textarea
            className={styles.messageInput}
            placeholder="Enter Message"
            onChange={handleMessageChange}
          />
        </VStack>
        <VStack className={styles.section}>
          <Text className={styles.editorHeader}>Gift Amount</Text>
          <HStack>
            <Input
              className={styles.editorInput}
              placeholder="20"
              onChange={handleAmountChange}
            />
            <Select
              placeholder="MATIC"
              className={styles.editorSelect}
              onChange={handleSelectToken}
            >
              <option value="USDC">USDC</option>
              <option value="USDT">USDT</option>
              <option value="WBTC">WBTC</option>
              <option value="LINK">LINK</option>
            </Select>
          </HStack>
        </VStack>
        <HStack>
          <hr className={styles.divider}></hr>
          <Text className={styles.dividerText}>Advanced Settings</Text>
          <hr className={styles.divider}></hr>
        </HStack>
        <VStack className={styles.section}>
          <Text className={styles.editorHeader}>Schedule Send</Text>
          <HStack w="100%">
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
            />
          </HStack>
        </VStack>
        <VStack className={styles.section}>
          <Text className={styles.editorHeader}>Choose Charity</Text>
          <Select placeholder="Select option" className={styles.editorSelect}>
            <option value="MATIC">MATIC</option>
            <option value="USDC">USDC</option>
            <option value="USDT">USDT</option>
            <option value="WBTC">WBTC</option>
            <option value="LINK">LINK</option>
          </Select>
        </VStack>
      </VStack>
      <VStack className={styles.noteContainer}>
        <VStack className={styles.noteTextContainer} gap={3}>
          <Text className={styles.noteHeader}>Note</Text>
          <Text className={styles.noteBullet}>
            • A 2% of the gift amount will be added as a fee to send a gift card
          </Text>
          <Text className={styles.noteBullet}>
            • Half of this fee will be sent to this month’s donation
          </Text>
          <Text className={styles.noteBullet}>
            • The remaining half will be sent to the Giftly Treasury
          </Text>
          <Text className={styles.noteBullet}>
            • A scheduled send will require an additional upfront gas fee
            payment
          </Text>
        </VStack>
        <VStack>
          <Button className={styles.saveButton} onClick={uploadMetadata}>
            {isLoading ? <Spinner color="white" /> : "Save Details"}
          </Button>
          <Button className={styles.sendButton} onClick={giftNFT}>
            {isLoading ? <Spinner color="white" /> : "Send Gift"}
          </Button>
        </VStack>
      </VStack>
    </HStack>
  );
};

type PreviewProps = {
  handleFileChange: (event: any) => void;
  selectedTheme: string;
  uploadedLogoFile: any;
  uploadedLogoURL: string;
  tokenSupply: string;
  showRank: boolean;
  showTier: boolean;
};

const Preview = ({
  handleFileChange,
  selectedTheme,
  uploadedLogoFile,
  uploadedLogoURL,
  tokenSupply,
  showRank,
  showTier,
}: PreviewProps) => {
  return (
    <VStack className={styles.previewContainer}>
      <VStack className={styles.previewTitleContainer}>
        <Text className={styles.previewTitle}>Create Gift Card</Text>
        <Text className={styles.previewSubtitle}>
          The perfect gift, for every occasion. Edit this.
        </Text>
      </VStack>
      <Image
        src={uploadedLogoURL ? uploadedLogoURL : "/main.png"}
        alt="main sample card"
        cursor="pointer"
        className={styles.previewCard}
      ></Image>
      <Box className={styles.previewSpacer}></Box>
      <VStack className={styles.previewCardSelectionContainer}>
        <HStack className={styles.previewCardSelectionHeaderContainer}>
          <Text className={styles.previewCardSelectionHeaderTitle}>
            Choose a new design
          </Text>
          <Text className={styles.previewCardSelectionHeaderSubtitle}>
            Explore
          </Text>
        </HStack>
        <HStack className={styles.previewCarouselContainer}>
          {cards.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="Card"
              className={styles.previewCarouselImage}
            />
          ))}
        </HStack>
      </VStack>

      <Box className={styles.previewSpacer}></Box>

      <HStack className={styles.previewUploadContainer}>
        <VStack className={styles.previewUploadTitleContainer}>
          <Text className={styles.previewUploadTitle}>
            Upload your own design
          </Text>
          <Text className={styles.previewUploadSubtitle}>
            Please upload an image with the right dimensions.
          </Text>
        </VStack>
        <input
          type="file"
          id="logoInput"
          accept="image/png, image/jpg"
          onChange={handleFileChange}
          className={styles.uploadButton}
        />
      </HStack>
    </VStack>
  );
};

export default withTransition(CardCreator);

//   const handleLogoFileUpload = async () => {
//     const formData = new FormData();
//     // formData.append("myFile", uploadedLogoFile, uploadedLogoFile.name);

//     console.log(uploadedLogoFile);

//     // Request made to the backend api
//     // await axios.post("api/uploadfile", formData);
//     console.log("logo file successfully uploaded");
//     // return uploadedLogoURL;
//   };

//   const giftNFT = useCallback(async () => {
//     setLoading(true);
//     try {
//       const tokenURI = await uploadMetadata();

//       const response = await fetch("http://localhost:3001/gift", {
//         method: "POST",
//         body: JSON.stringify({
//           recipient: "0xC33003bcEF8DB78167EC77f6ed3B904f8C814649",
//           tokenURI,
//           amount: ethers.utils.parseEther(".01"),
//           value: ethers.utils.parseEther(".012"),
//         }),
//         headers: {
//           "content-type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//       });

//       const data = await response.json();
//       console.log("data: ", data);
//       //   setPublishedContract(data.contractAddress);
//       //   const logoURL = handleLogoFileUpload();
//       //   saveContract(data.contractAddress);
//     } catch (err) {
//       console.log("Error request: ", err);
//     }
//     setLoading(false);
//   }, []);
