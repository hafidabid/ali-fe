// ** React Imports
import { Fragment, useState } from "react";

// ** MUI Imports
import Badge from "@mui/material/Badge";
import MuiAvatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box, { BoxProps } from "@mui/material/Box";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Custom Components Import
import ChatLog from "./ChatLog";
import SendMsgForm from "src/views/apps/chat/SendMsgForm";
import CustomAvatar from "src/@core/components/mui/avatar";
import OptionsMenu from "src/@core/components/option-menu";
import UserProfileRight from "src/views/apps/chat/UserProfileRight";

// ** Types
import {
  ChatContentType,
  ChatsObj,
  ChatType,
  ContactType,
  ProfileUserType,
  SendMsgParamsType,
} from "src/types/apps/chatTypes";

// ** Styled Components
const ChatWrapperStartChat = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  height: "100%",
  display: "flex",
  borderRadius: 1,
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: theme.palette.action.hover,
}));

const ChatContent = (props: ChatContentType) => {
  // ** Props
  const {
    store,
    hidden,
    sendMsg,
    mdAbove,
    dispatch,
    statusObj,
    getInitials,
    sidebarWidth,
    userProfileRightOpen,
    handleLeftSidebarToggle,
    handleUserProfileRightSidebarToggle,
  } = props;

  const [chats, setChats] = useState<ChatType[]>([
    {
      message: "halo",
      senderId: 0,
      time: new Date(),
      feedback: {
        isSent: true,
        isSeen: true,
        isDelivered: true,
      },
    },
    {
      message: "hai",
      senderId: 1,
      time: new Date(),
      feedback: {
        isSent: true,
        isSeen: true,
        isDelivered: true,
      },
    },
  ]);

  const handleChat = (chat: SendMsgParamsType) => {
    setChats((prevChats) => [
      ...prevChats,
      {
        message: chat.message,
        senderId: 0,
        time: new Date(),
        feedback: {
          isSent: true,
          isSeen: true,
          isDelivered: true,
        },
      },
    ]);
  };

  const handleStartConversation = () => {
    if (!mdAbove) {
      handleLeftSidebarToggle();
    }
  };

  const renderContent = () => {
    if (store) {
      return (
        <Box
          sx={{
            width: 0,
            flexGrow: 1,
            height: "100%",
            backgroundColor: "action.hover",
          }}
        >
          <Box
            sx={{
              py: 3,
              px: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {mdAbove ? null : (
                <IconButton onClick={handleLeftSidebarToggle} sx={{ mr: 2 }}>
                  <Icon icon="mdi:menu" />
                </IconButton>
              )}
              <Box
                onClick={handleUserProfileRightSidebarToggle}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Badge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  sx={{ mr: 4.5 }}
                  badgeContent={
                    <Box
                      component="span"
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        color: `GrayText`,
                        boxShadow: (theme) =>
                          `0 0 0 2px ${theme.palette.background.paper}`,
                        backgroundColor: `InfoBackground`,
                      }}
                    />
                  }
                >
                  {true ? (
                    <MuiAvatar
                      src={`/images/avatars/1.png`}
                      alt={`wong tulus`}
                      sx={{ width: 40, height: 40 }}
                    />
                  ) : (
                    <CustomAvatar
                      skin="light"
                      color={"primary"}
                      sx={{ width: 40, height: 40, fontSize: "1rem" }}
                    >
                      YIM
                    </CustomAvatar>
                  )}
                </Badge>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ color: "text.secondary" }}>
                    Konsultasi Bisnis
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.disabled" }}>
                    Yayasan Indonesia Maju
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <ChatLog
            hidden={hidden}
            data={{
              chat: {
                id: 0,
                userId: 1,
                chat: chats,
                unseenMsgs: 0,
              },
              contact: {
                id: 1,
                fullName: `Mentor Bisnis`,
                avatarColor: `primary`,
                status: `online`,
                role: "Mentor",
                about: "aku adalah mentor bisnis berbasis AI, aktif 24/7",
              },
              userContact: {
                id: 0,
                role: "pelaku usaha",
                about: "seorang pemilik bisnis",
                avatar: "/images/avatars/2.png",
                fullName: "Saya",
                status: "online",
                settings: {
                  isNotificationsOn: true,
                  isTwoStepAuthVerificationEnabled: false,
                },
              },
            }}
          />

          <SendMsgForm store={store} dispatch={dispatch} sendMsg={handleChat} />

          <UserProfileRight
            store={store}
            hidden={hidden}
            statusObj={statusObj}
            getInitials={getInitials}
            sidebarWidth={sidebarWidth}
            userProfileRightOpen={userProfileRightOpen}
            handleUserProfileRightSidebarToggle={
              handleUserProfileRightSidebarToggle
            }
          />
        </Box>
      );
    } else {
      return null;
    }
  };

  return renderContent();
};

export default ChatContent;
