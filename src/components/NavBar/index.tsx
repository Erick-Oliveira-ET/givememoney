import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useRouter } from "next/router";
import Link from "next/link";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { CartContext } from "@/contexts/CartContext";
import Badge from "@mui/material/Badge";
import { Slide, useScrollTrigger } from "@mui/material";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const pages = [{ label: "Produtos", route: "/products" }];

const NavBar = () => {
  const { toggleColorMode } = useContext(ThemeContext);
  const { cartQuantity } = useContext(CartContext);
  const router = useRouter();
  const theme = useTheme();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (route: string) => {
    setAnchorElNav(null);
    router.push(`${route}`);
  };

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <HideOnScroll>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <Link href={`/`}>????Give???Erick???Money????</Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleCloseNavMenu(item.route)}
                  >
                    <Typography textAlign="center">{item.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              ???????
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => handleCloseNavMenu(item.route)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                color: "text.primary",
                borderRadius: 1,
                p: 3,
              }}
            >
              <IconButton
                sx={{ ml: 1 }}
                onClick={toggleColorMode.onCLick}
                color="inherit"
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
              <IconButton>
                {cartQuantity ? (
                  <Badge
                    badgeContent={cartQuantity}
                    color="primary"
                    onClick={handleCartClick}
                  >
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                ) : (
                  <ShoppingCartOutlinedIcon onClick={handleCartClick} />
                )}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};
export default NavBar;
