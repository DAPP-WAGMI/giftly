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

const CardCreator: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [publishedContract, setPublishedContract] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("midnight");
  const [uploadedLogoFile, setUploadedLogoFile] = useState<any>("");
  const [uploadedLogoURL, setUploadedLogoURL] = useState<string>("");
  const [communityName, setCommunityName] = useState<string>("");
  const [communityDescription, setCommunityDescription] = useState<string>("");
  const [protocolAddress, setProtocolAddress] = useState<string>("");
  const [tokenSupply, setTokenSupply] = useState<string>("1");
  const [githubURL, setGithubURL] = useState<string>("");
  const [showRank, setShowRank] = useState<boolean>(true);
  const [showTier, setShowTier] = useState<boolean>(true);
  const [selectedSocial, setSelectedSocial] = useState<string>("");

  const saveContract = useCallback(async (address: string) => {
    // const docRef = doc(db, "contracts", address.toLowerCase());
    // await setDoc(docRef, {
    //   address: address.toLowerCase(),
    //   name: communityName,
    //   description: communityDescription,
    //   users: [],
    //   protocolAddress:
    //     protocolAddress ?? "0x48adbf604c7ff9e2b2e8c01b243ba446538972ea", // TODO: dynamic
    //   githubRepoURL: githubURL ?? "https://github.com/iamminci/verbsdao",
    // });
  }, []);

  const publishNFT = useCallback(async () => {
    setLoading(true);
    // try {
    //   const response = await fetch("http://localhost:3001/deploy", {
    //     method: "POST",
    //     body: JSON.stringify({ tokenSupply: 100 }),
    //     headers: {
    //       "content-type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   });
    //   const data = await response.json();
    //   console.log("data: ", data);
    //   setPublishedContract(data.contractAddress);
    //   const logoURL = handleLogoFileUpload();
    //   saveContract(data.contractAddress);
    // } catch (err) {
    //   console.log("Error request: ", err);
    // }
    setLoading(false);
  }, []);

  const handleFileChange = (event: any) => {
    console.log("loaded file: ", event.target.files[0]);
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setUploadedLogoURL(url);
    setUploadedLogoFile(event.target.files[0]);
  };

  //   const handleLogoFileUpload = async () => {
  //     const formData = new FormData();
  //     // formData.append("myFile", uploadedLogoFile, uploadedLogoFile.name);

  //     console.log(uploadedLogoFile);

  //     // Request made to the backend api
  //     // await axios.post("api/uploadfile", formData);
  //     console.log("logo file successfully uploaded");
  //     // return uploadedLogoURL;
  //   };

  const handleNameChange = (event: any) => {
    console.log("name: ", event.target.value);
    // setCommunityName(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    console.log("name: ", event.target.value);
    // setCommunityDescription(event.target.value);
  };

  const handleProtocolChange = (event: any) => {
    console.log("protocol: ", event.target.value);
    // setProtocolAddress(event.target.value);
  };

  const handleGithubURLChange = (event: any) => {
    console.log("github: ", event.target.value);
    // setGithubURL(event.target.value);
  };

  const handleTokenSupplyChange = (event: any) => {
    console.log("token supply: ", event.target.value);
    // setTokenSupply(event.target.value);
  };

  const toggleRank = (event: any) => {
    console.log("event: ", event.target.checked);
    // setShowRank(event.target.checked);
  };

  const toggleTier = (event: any) => {
    console.log("event: ", event.target.checked);
    // setShowTier(event.target.checked);
  };

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
            publishNFT={publishNFT}
            // setSelectedTheme={setSelectedTheme}
            // selectedTheme={selectedTheme}
            // uploadedLogoFile={uploadedLogoFile}
            handleNameChange={handleNameChange}
            handleDescriptionChange={handleDescriptionChange}
            handleProtocolChange={handleProtocolChange}
            handleGithubURLChange={handleGithubURLChange}
            handleTokenSupplyChange={handleTokenSupplyChange}
            // handleSelectSocial={handleSelectSocial}
            // selectedSocial={selectedSocial}
            toggleRank={toggleRank}
            // toggleTier={toggleTier}
            isLoading={loading}
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

const themes = [
  {
    id: "midnight",
    name: "Midnight Dark",
    foregroundColor: "#1a1820",
    backgroundColor: "#100e14",
    foregroundClassname: "midnightDarkFg",
    foregroundClassname2: "midnightDarkPreviewFg",
    backgroundClassname: "midnightDarkBg",
  },
  {
    id: "cream",
    name: "Solid Cream",
    foregroundColor: "#ffffff",
    backgroundColor: "#f8f8f8",
    foregroundClassname: "solidCreamFg",
    foregroundClassname2: "solidCreamPreviewFg",
    backgroundClassname: "solidCreamBg",
  },
  {
    id: "pastel",
    name: "Pastel Lavender",
    foregroundColor: "#d4c8f5",
    backgroundColor: "#ad9dce",
    foregroundClassname: "pastelLavenderFg",
    foregroundClassname2: "pastelLavenderPreviewFg",
    backgroundClassname: "pastelLavenderBg",
  },
];

type FormProps = {
  publishNFT: () => void;
  handleNameChange: (event: any) => void;
  handleDescriptionChange: (event: any) => void;
  handleProtocolChange: (event: any) => void;
  handleGithubURLChange: (event: any) => void;
  handleTokenSupplyChange: (event: any) => void;
  toggleRank: (event: any) => void;
  isLoading: boolean;
};

const Form = ({
  publishNFT,
  handleNameChange,
  handleDescriptionChange,
  handleProtocolChange,
  handleGithubURLChange,
  handleTokenSupplyChange,
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
            onChange={handleNameChange}
          />
        </VStack>
        <VStack className={styles.section}>
          <Text className={styles.editorHeader}>From</Text>
          <Input
            className={styles.editorInput}
            placeholder="Gifter Name (Optional)"
            onChange={handleDescriptionChange}
          />
          <HStack>
            <Switch defaultChecked colorScheme="pink" onChange={toggleRank} />
            <Text className={styles.editorText}>
              Display Wallet Address if name is not specified
            </Text>
          </HStack>
        </VStack>

        <VStack className={styles.section}>
          <Text className={styles.editorHeader}>Message</Text>
          <Textarea
            className={styles.messageInput}
            placeholder="Enter Contract Address"
            onChange={handleProtocolChange}
          />
        </VStack>
        <VStack className={styles.section}>
          <Text className={styles.editorHeader}>Gift Amount</Text>
          <HStack>
            <Input
              className={styles.editorInput}
              placeholder="20"
              onChange={handleGithubURLChange}
            />
            <Select placeholder="Select option" className={styles.editorSelect}>
              <option value="MATIC">MATIC</option>
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
            {/* <Select
            placeholder="Select option"
            className={styles.editorSelect}
            onChange={handleSelectSocial}
          >
            <option value="discord">Discord</option>
            <option value="option2">Twitter</option>
            <option value="option3">Telegram</option>
          </Select>
          <a
            href="https://discord.com/api/oauth2/authorize?client_id=1004630657886072833&permissions=8591056896&scope=bot"
            rel="noreferrer"
            target="_blank"
          >
            <Button
              disabled={selectedSocial !== "discord"}
              className={styles.editorButton}
            >
              Link
            </Button>
          </a> */}
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
            - A 2% of the gift amount will be added as a fee to send a gift card
          </Text>
          <Text className={styles.noteBullet}>
            - Half of this fee will be sent to this month’s donation
          </Text>
          <Text className={styles.noteBullet}>
            - The remaining half will be sent to the Giftly Treasury
          </Text>
          <Text className={styles.noteBullet}>
            - A scheduled send will require an additional upfront gas fee
            payment
          </Text>
        </VStack>
        <VStack>
          <Button className={styles.sendButton} onClick={publishNFT}>
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
  const selected = themes.find((theme) => theme.id === selectedTheme)!;

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
