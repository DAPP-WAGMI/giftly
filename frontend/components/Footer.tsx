import { HStack, VStack, Text, Spacer } from "@chakra-ui/react";
import styles from "@styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.centerEllipse} />
      <HStack className={styles.content}>
        <VStack className={styles.footerSubsection}>
          <h1 className={styles.header}>Made With ❤️ for Web3</h1>
          <Text className={styles.subheader}>CC0. No Rights Reserved.</Text>
          <Text className={styles.subheader} paddingTop="2rem">
            Giftly 2022
          </Text>
        </VStack>
        <HStack>
          <VStack className={styles.footerSubsection}>
            <h1 className={styles.header}>Docs</h1>
            <a
              href="https://github.com/tsukiji-seaport-protocol/tsukiji"
              target="
              _blank"
            >
              <Text className={styles.subheaderLink}>Github</Text>
            </a>
          </VStack>
          <Spacer style={{ width: "30px" }} />
          <VStack className={styles.footerSubsection}>
            <h1 className={styles.header}>Contact</h1>
            <a
              href="https://twitter.com/iamminci"
              target="
              _blank"
            >
              <Text className={styles.subheaderLink}>@iamminci</Text>
            </a>
          </VStack>
        </HStack>
      </HStack>
    </div>
  );
};

export default Footer;
