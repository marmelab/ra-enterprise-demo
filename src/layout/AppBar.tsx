import React, { forwardRef } from "react";
import {
  AppBar,
  UserMenu,
  MenuItemLink,
  useTranslate,
  useQuery,
  useVersion,
} from "react-admin";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";

import {
  ToggleThemeButton,
  LanguageSwitcher,
} from "@react-admin/ra-preferences";

import SettingsIcon from "@material-ui/icons/Settings";
import TourIcon from "@material-ui/icons/HelpOutline";

import Logo from "./Logo";

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  spacer: {
    flex: 1,
  },
});

const ConfigurationMenu = forwardRef<any, any>((props, ref) => {
  const translate = useTranslate();
  return (
    <MenuItemLink
      ref={ref}
      to="/configuration"
      primaryText={translate("pos.configuration")}
      leftIcon={<SettingsIcon />}
      onClick={props.onClick}
    />
  );
});

const CustomUserMenu = (props: any) => (
  <UserMenu {...props}>
    <ConfigurationMenu />
  </UserMenu>
);

const CustomAppBar = (props: any) => {
  const classes = useStyles();

  const version = useVersion();
  const { data } = useQuery(
    {
      type: "getList",
      resource: "tours",
      payload: { filter: { playedOn: null } },
    },
    {
      version,
    }
  );

  let numberOfTours = 0;
  if (data) {
    numberOfTours = data.length;
  }

  return (
    <AppBar {...props} userMenu={<CustomUserMenu />}>
      <Typography
        variant="h6"
        color="inherit"
        className={classes.title}
        id="react-admin-title"
      />
      <Logo />
      <span className={classes.spacer} />
      <IconButton to="/tours" component={Link} color="inherit">
        <Badge badgeContent={numberOfTours} color="error" variant="dot">
          <TourIcon />
        </Badge>
      </IconButton>
      <ToggleThemeButton />
      <LanguageSwitcher
        languages={[
          { locale: "en", name: "English" },
          { locale: "fr", name: "Français" },
        ]}
        defaultLanguage="English"
      />
    </AppBar>
  );
};

export default CustomAppBar;
