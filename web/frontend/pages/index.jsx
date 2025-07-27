import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import { Orders } from "../components";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Page>
      <TitleBar title={t("HomePage.title")} />
      <Orders />
    </Page>
  );
}
