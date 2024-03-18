import { useSignOut } from "@/hooks/useSignOut";
import { loggedInState, signingInState } from "@/state/atoms";
import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";


export default function DrawerMenu() {
  const router = useRouter();

  const loggedIn = Cookies.get("loggedIn");

  const menuList = ['トップページ', 'お問い合わせ', '利用規約', 'プライバシーポリシー', 'ログイン'];
  const loggedInMenuList = ['トップページ', 'お問い合わせ', '利用規約', 'プライバシーポリシー', 'ログアウト'];

  const { signOut } = useSignOut();

  const handleMenuClick = (text) => {
    // クリックされたメニューに応じて遷移
    switch (text) {
      case 'トップページ':
        router.push('/');
        break;
      case 'お問い合わせ':
        router.push('/contact/input');
        break;
      case '利用規約':
        window.open('https://www.kiyac.app/termsOfService/pIdEs0GXmPGjVT7UMnUa');
        break;
      case 'プライバシーポリシー':
        window.open('https://www.kiyac.app/privacypolicy/VfYPLKTsPDuvjwh4AAMM');
        break;
      case 'ログイン':
        router.push('/auth/signin');
        break;
      case 'ログアウト':
        const isConfirmed = window.confirm("ログアウトしてよろしいですか？");
        if (!isConfirmed) {
          break;
        }
        handleSignOut();
        alert("ログアウトしました。");
        break;
      default:
        break;
    }
  };

  const handleSignOut = async() => {
    await signOut();
    router.push('/');
  }

  return (
    <Box
      role='presentation'
      onClick={()=>{}}
      onKeyDown={()=>{}}
    >
      { loggedIn ? (
        <List>
        {loggedInMenuList.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleMenuClick(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        </List>
      ) : (
        <List>
        {menuList.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleMenuClick(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        </List>
      ) }
    </Box>
  )
}