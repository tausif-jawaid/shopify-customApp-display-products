import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import {MediaCard, VideoThumbnail,Page} from '@shopify/polaris';

export default function NewPage() {
  const { t } = useTranslation();
  return (
    <Page>
      <TitleBar title={t("Home.title")}>
      </TitleBar>
      <MediaCard
      title="New is new Page Created"
      primaryAction={{
        content: 'Learn more',
        onAction: () => {},
      }}
      description={`New Page created by developer for after apps creations.`}
      popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
    >
      <VideoThumbnail
        videoLength={80}
        thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
        onClick={() => console.log('clicked')}
      />
    </MediaCard>
    </Page>
  );
}
