// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import React from 'react'

// styles
import clsx from 'clsx'
import { fade, createStyles, Theme, withTheme, withStyles } from '@material-ui/core/styles';

// components
import AppBar from '@material-ui/core/AppBar'
import Badge from '@material-ui/core/Badge'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import PeopleSearchBox from './PeopleSearchBox';

// icon
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MenuIcon from '@material-ui/icons/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'
import Assessment from '@material-ui/icons/Assessment';
import Book from '@material-ui/icons/Book';
import Event from '@material-ui/icons/Event';

// images
import logo from "../../assets/images/header_logo.png"

// ----------------------------------------------------------------------------
// STYLES


const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarColor: {
    background: "#fff",
    color: "#1976d2"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(6),
    },
  },
  content: {
    maxHeight: 'calc(100% - 64px)',
    flex: 1,
  },
  grow: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  main: {
    flexGrow: 1,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 'calc(100% - 48px)'
  },
  mainOpen: {
    maxWidth: 'calc(100% - 240px)'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  root: {
    height: '100vh',
    width: '100%',
    display: 'flex',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    [theme.breakpoints.down(600)]: {
      display: 'none'
    },
  },
  show: {
    display: 'block'
  },
  hide: {
    display: 'none'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toogleSearchButton: {
    padding: 0
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  hamBurgerIcon: {
    marginLeft: '-20px'
  },
  mainLogo: {
    "& img": {
      height: theme.spacing(4)
    }
  }
}
)

// ----------------------------------------------------------------------------
// CONFIG

const routes = [
  {
    icon: <Event />,
    path: '/course',
    name: 'Courses',
  },
  {
    icon: <Book />,
    path: '/tests',
    name: 'Tests',
  },
  {
    icon: <Assessment />,
    path: '/points',
    name: 'Points',
  },
]

// ----------------------------------------------------------------------------

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      anchor: null,
      mobile_anchor: null,
      open: false,
      showMobileSearchBar: false,
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchor: event.currentTarget })
  }

  handleMobileSearchToggle = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ showMobileSearchBar: !this.state.showMobileSearchBar })
  }

  handleMobileMenuClose = () => {
    this.setState({ mobile_anchor: null })
  }

  handleMenuClose = () => {
    this.setState({ anchor: null })
    this.handleMobileMenuClose();
  }

  handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ mobile_anchor: event.currentTarget })
  }

  render () {
    const { children, classes, theme } = this.props

    const { open } = this.state;

    const menu_id = 'primary-search-account-menu';
    const mobile_menu_id = 'primary-search-account-menu-mobile';

    return (
      <div className={classes.root}>
        <AppBar
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          position="fixed"
          classes={{
            colorPrimary: classes.appBarColor
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
              classes={{
                edgeStart: classes.hamBurgerIcon
              }}
            >
              <MenuIcon />
            </IconButton>
            <div className={clsx(classes.mainLogo, {
                [classes.hide]: this.state.showMobileSearchBar
              })}
            >
              <img src={logo} alt="logo" />
            </div>
            <div className={classes.grow} />
            <div className={clsx(classes.search, {
              [classes.show]: this.state.showMobileSearchBar
             })}
            >
              <PeopleSearchBox />
            </div>
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="Account of current user"
                aria-controls={menu_id}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="search"
                onClick={this.handleMobileSearchToggle}
                color="inherit"
                classes={{
                  root: classes.toogleSearchButton
                }}
              >
                {this.state.showMobileSearchBar ? (
                  <CloseIcon />
                ) : (
                  <SearchIcon />
                )}
              </IconButton>
              <IconButton
                aria-label="Show more"
                aria-controls={mobile_menu_id}
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          open={open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {routes.map(({ icon, path, name }) => (
              <ListItem
                button
                key={path}
                onClick={() => {
                  
                }}
                title={name}
              >
                <ListItemIcon>
                  {icon}
                </ListItemIcon>

                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={clsx(classes.main, open ? classes.mainOpen : '')}>
          <div className={classes.toolbar} />
          <div className={classes.content}>
            {children}
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(withTheme(App));
