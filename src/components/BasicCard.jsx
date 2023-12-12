import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { useRouter } from 'next/router';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  </Box>
);

export default function BasicCard(props) {
  const { id, name, address, latitude, longitude, rating, image, duration, origin, tags } = props;
  const router = useRouter()
  const queryParams = `origin=${encodeURIComponent(JSON.stringify(origin))}`;
  const isContactPage = router.pathname.includes("/spots/[id]");


  if (isContactPage) {
    const regex = /[^0-9]/g;
    const result = duration ? duration.replace(regex, "") : "";
    const durationTime = parseInt(result);

    const aryMax = (a, b) => {return Math.max(a, b);}
    const aryMin = (a, b) => {return Math.min(a, b);}
    const stayTimeAry = tags.map((tag) => tag.stay_time);
    const max = stayTimeAry.reduce(aryMax);
    const min = stayTimeAry.reduce(aryMin);
    const ave = ( max + min ) / 2;


    return (
      <Card sx={{ width: 288 , display: 'flex', padding: '4px auto', margin: '4px auto'}}>
        <CardContent sx={{width: 266}}>
          <Typography variant="h5" component="div" sx={{fontSize: 16}}>
            {name}
            <br />
            { durationTime ? `所要時間:${durationTime + ave}分` : "所要時間:Loading..."}
            <br />
            { duration ? `移動時間:${duration}` : "移動時間:Loading..."}
            <br />
            { max === min ? `滞在時間:${ave}分` : `滞在時間:${min}分~${max}分` }
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
            {rating}
          </Typography>
          <Typography variant="body2">
            {address}
          </Typography>
        </CardContent>
      </Card>
    );
  }


  return (
    <Card sx={{ width: 288 , display: 'flex', padding: '4px auto', margin: '4px auto'}}>
      <CardContent sx={{width: 266}}>
        <Typography variant="h5" component="div" sx={{fontSize: 16}}>
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
          {rating}
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions sx={{width: 32}}>
        <NextLink href={`spots/${id}?${queryParams}`} >
          <ArrowForwardIosSharpIcon />
        </NextLink>
      </CardActions>
    </Card>
  );
}