import styles from "./Header.module.css"
import { Avatar } from '@mui/material';
import kingMakersLogo from '../../assets/images/k-red.png';
import Search from "../search/Search";

const Header = () => {
  return (
    <header className={styles.headerWrapper}>
      <Avatar alt="logo" src={kingMakersLogo}  sx={{ height: 'auto', borderRadius: "0px" }} />
      <h2>Campaigns Management</h2>
      <Search />
    </header>
  );
};

export default Header;