import { MenuItem } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const CustomMenuItem = ({ to, active, children }) => {
  if (active) {
    return null; // Don't render the MenuItem if it's active
  }
  return (
    <MenuItem>
      <NavLink to={to} activeClassName="active">
        {children}
      </NavLink>
    </MenuItem>
  );
};

export default CustomMenuItem;
