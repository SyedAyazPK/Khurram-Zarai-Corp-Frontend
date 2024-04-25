import { Hidden } from '@mui/material';
import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    <Root className='flex items-center'>
      <Hidden lgDown>
        <img
          className='logo-icon'
          src='assets/images/logo/logo.png'
          alt='logo'
          width={100}
          height={100}
        />
      </Hidden>
      <Hidden lgUp>
        <img
          className='logo-icon'
          src='assets/images/logo/logo.png'
          alt='logo'
          width={50}
          height={50}
        />
      </Hidden>
    </Root>
  );
}

export default Logo;
