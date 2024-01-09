import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { locationState } from '@/state/atoms';
import styles from '@/styles/BasicCard.module.css';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  </Box>
);

export default function BasicCard(props) {
  const { id, name, address, latitude, longitude, rating, image, duration, tags } = props;
  const origin = useRecoilValue(locationState);
  const router = useRouter()
  const queryParams = `origin=${encodeURIComponent(JSON.stringify(origin))}`;
  const isContactPage = router.pathname.includes("/spots/[id]");


  const textContainerStyles = {
    paddingLeft: 2,  // テキストコンテナと画像の間隔
  };

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
          <img src={image} />
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
            <br />
            {tags.map((tag) => (`/${tag.name}`))}
          </Typography>
        </CardContent>
      </Card>
    );
  }


  return (
      <Card className={styles.container}>
        <CardContent component="div" className={styles.item1}>
          <Typography variant="h5" sx={{fontSize: 16}}>
            {name}
          </Typography>
        </CardContent>
        <CardContent component="div" className={styles.item2}>
          <img src={image} width={120} height={120} />
        </CardContent>
        <CardContent component="div" className={styles.item3}>
          <CardContent sx={{display: 'flex', padding: '0px'}}>
            <StarIcon sx={{height: '20px', width: '20px'}} />
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {rating}
            </Typography>
          </CardContent>
          <Typography sx={{ fontSize: 14 }}>
            {tags.map((tag) => (`滞在時間 約${tag.stay_time}分`))}
          </Typography>
          <Typography variant='body2' sx={{ fontSiz: 12 }}>
            {tags.map((tag) => (`/${tag.name}`))}
          </Typography>
        </CardContent>
        <CardActions className={styles.item4}>
          <NextLink href={`spots/${id}?${queryParams}`} >
            <ArrowForwardIosSharpIcon />
          </NextLink>
        </CardActions>
      </Card>
  );
}