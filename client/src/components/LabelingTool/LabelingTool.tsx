import React, { useState } from "react";
import { Collection, LabelShortCuts, LabelingBody } from "./components";
import { Body, CollectionWrap, Container, LabelingWrap, Menu } from "./styles";
import { IconArrowRight } from "@tabler/icons-react";
import { useTheme } from "styled-components";
import { FlexRow } from "../BaseStyle";

export const LabelingTool: React.FC = () => {
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState(true);

  const handleCollapsed = (currentCollapsed: boolean) => {
    setCollapsed(currentCollapsed);
  };

  return (
    <Container>
      <Menu
        collapsed={collapsed}
        onMouseEnter={() => handleCollapsed(false)}
        onMouseLeave={() => handleCollapsed(true)}
      >
        {collapsed ? (
          <FlexRow
            width="100%"
            justifyContent="center"
            style={{ marginTop: "16px" }}
          >
            <IconArrowRight color={theme.icon.primary} size={20} />
          </FlexRow>
        ) : (
          <LabelShortCuts />
        )}
      </Menu>
      <Body>
        <LabelingWrap>
          <LabelingBody />
        </LabelingWrap>
        <CollectionWrap>
          <Collection />
        </CollectionWrap>
      </Body>
    </Container>
  );
};

export default LabelingTool;
