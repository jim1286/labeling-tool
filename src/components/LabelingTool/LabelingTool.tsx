import React, { useState } from "react";
import { Collection, LabelShortCuts, LabelingBody } from "./components";
import { useLocation, useNavigate } from "react-router-dom";
import { Body, CollectionWrap, Container, LabelingWrap, Menu } from "./styles";
import { IconHome } from "@tabler/icons-react";
import { useTheme } from "styled-components";
import { FlexRow } from "../BaseStyle";

export const LabelingTool: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState(true);

  const handleNavigatePage = () => {
    if (!location.state) {
      return;
    }

    navigate("/");
  };

  const handleCollapsed = (currentCollapsed: boolean) => {
    setCollapsed(currentCollapsed);
  };

  return (
    <Container>
      <Menu
        collapsed={collapsed}
        onMouseEnter={() => handleCollapsed(false)}
        onMouseLeave={() => handleCollapsed(true)}
        onClick={handleNavigatePage}
      >
        {collapsed ? (
          <FlexRow
            width="100%"
            justifyContent="center"
            style={{ marginTop: "15px", cursor: "pointer" }}
          >
            <IconHome color={theme.icon.primary} />
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
