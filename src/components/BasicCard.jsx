import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  </Box>
);

export default function BasicCard({spot}) {
  return (
    <Card sx={{ width: 288 , display: 'flex', padding: '4px auto', margin: '4px auto'}}>
      <CardContent sx={{width: 266}}>
        <Typography variant="h5" component="div" sx={{fontSize: 16}}>
          {spot.name}
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
          {spot.rating}
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions sx={{width: 32}}>
        <NextLink href="/show" passHref>
          <MuiLink>
            <ArrowForwardIosSharpIcon />
          </MuiLink>
        </NextLink>
      </CardActions>
    </Card>
  );
}