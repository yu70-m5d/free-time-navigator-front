import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useRouter } from "next/router";


export default function DrawerMenu() {
  const router = useRouter();

  const menuList = ['トップページ', 'お問い合わせ', '利用規約', 'プライバシーポリシー']

  const handleMenuClick = (text) => {
    // クリックされたメニューに応じて遷移
    switch (text) {
      case 'トップページ':
        router.push('/');
        break;
      case 'お問い合わせ':
        router.push('/#');
        break;
        case '利用規約':
          router.push('/#');
          break;
        case 'プライバシーポリシー':
          router.push('/#');
          break;
      default:
        break;
    }
  };

  return (
    <Box
      role='presentation'
      onClick={()=>{}}
      onKeyDown={()=>{}}
    >
      <List>
        {menuList.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleMenuClick(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}