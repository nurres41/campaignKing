import React from 'react';
import { Container, Typography, Link, Box } from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Box py={3}>
          <Typography variant="body2" color="textSecondary" align="center">
            © {new Date().getFullYear()} Nuri Onur Kurtulus
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            <Link color="inherit" href="#">
              Privacy Policy
            </Link>{' '}
            |{' '}
            <Link color="inherit" href="#">
              Terms of Service
            </Link>
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
