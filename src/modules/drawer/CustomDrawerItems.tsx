import { usePathname } from "@hooks";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ImageSearchOutlinedIcon from "@mui/icons-material/ImageSearchOutlined";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { navigate } from "gatsby";
import React from "react";
import StyledListItem from "../../styledComponents/StyledListItem";
import routeNames from "../../utils/routeNames";

const CustomDrawerItems = () => {
  const currentPathName = usePathname();

  return (
    <List component="nav">
      <StyledListItem
        selected={currentPathName === "/"}
        onClick={() => navigate("/")}
      >
        <ListItemIcon>
          <HomeOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </StyledListItem>
      <StyledListItem
        selected={currentPathName.includes(routeNames.learnMore)}
        onClick={() => navigate(routeNames.learnMore)}
      >
        <ListItemIcon>
          <InsertEmoticonIcon />
        </ListItemIcon>
        <ListItemText primary="Introduction" />
      </StyledListItem>
      <StyledListItem
        selected={currentPathName.includes(routeNames.imageGallery)}
        onClick={() => navigate(routeNames.imageGallery)}
      >
        <ListItemIcon>
          <PhotoLibraryIcon />
        </ListItemIcon>
        <ListItemText primary="Image Gallery" />
      </StyledListItem>
      <StyledListItem
        selected={currentPathName.includes(routeNames.products)}
        onClick={() => navigate(routeNames.products)}
      >
        <ListItemIcon>
          <ImageSearchOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </StyledListItem>
      <StyledListItem
        selected={currentPathName.includes(routeNames.feedbackForm)}
        onClick={() => navigate(routeNames.feedbackForm)}
      >
        <ListItemIcon>
          <SpeakerNotesIcon />
        </ListItemIcon>
        <ListItemText primary="Feedback" />
      </StyledListItem>
      {/* <ListItem selected={currentPathName === '/sharingCorner'}>
          <ListItemIcon>
            <ChatOutlined />
          </ListItemIcon>
          <ListItemText primary="Sharing Corner" />
        </ListItem> */}
      {/* <ListItem selected={currentPathName === '/faq'}>
          <ListItemIcon>
            <LiveHelpOutlined />
          </ListItemIcon>
          <ListItemText primary="FAQ" />
        </ListItem> */}
    </List>
  );
};

export default CustomDrawerItems;
