// This component is built taking sticky footer as an example in Free React Template under MUI documentation
// https://mui.com/getting-started/templates/
// https://mui.com/getting-started/templates/sticky-footer/
// https://github.com/mui/material-ui/tree/master/docs/data/material/getting-started/templates/sticky-footer
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://together.md/">
        mdTogether
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          mdTogether — Your Theme-able Online Collaborative Markdown Editor
        </Typography>
        <br/>
        <Copyright />
      </Container>
    </Box>
  );
}