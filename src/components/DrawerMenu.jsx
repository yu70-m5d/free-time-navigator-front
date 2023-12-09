import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";


export default function DrawerMenu() {
  const menuList = ['お問い合わせ', '利用規約', 'プライバシーポリシー']

  return (
    <Box
      role='presentation'
      onClick={()=>{}}
      onKeyDown={()=>{}}
    >
      <List>
        {menuList.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}