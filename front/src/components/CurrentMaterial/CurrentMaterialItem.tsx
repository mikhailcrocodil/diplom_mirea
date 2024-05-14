import { InfoContent, InfoContentType } from "../../api/models";
import { FC } from "react";
import { TextContent } from "./CurrentMaterial.styled";
import { Flex } from "antd";

type Props = {
  content: InfoContent;
};

export const CurrentMaterialItem: FC<Props> = ({ content }) => {
  return (
    <TextContent>
      <h1>{content.title_block}</h1>
      <h2>{content.title_paragraph}</h2>
      {content.type === InfoContentType.IMG && (
        <Flex vertical align={"center"} gap={12}>
          <img src={content.content} alt={content.img_caption} />
          <span>{content.img_caption}</span>
        </Flex>
      )}
      {content.type === InfoContentType.TEXT && <span>{content.content}</span>}
      {content.type === InfoContentType.VIDEO && (
        <Flex vertical gap={12} align={"center"}>
          <span>{content.content}</span>
          <iframe width="700px" height="400px" src={content.video_url}></iframe>
        </Flex>
      )}
    </TextContent>
  );
};
