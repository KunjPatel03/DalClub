import { styled } from '@mui/system';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';

const Container = styled('div')({ display: 'flex' });

const Left = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2vh',
});

const Center = styled('div')({
  flex: 1,
  padding: '2vh',
});

const Right = styled('div')({
  flex: 1,
  padding: '2vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const Logo = styled('h1')({
  fontSize: '2rem',
  fontWeight: 700,
});

const SocialContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Icon = styled('div')({
  display: 'flex',
  width: '5vh',
  height: '5vh',
  borderRadius: '50%',
  margin: '2vh',
});

const ListContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-evenly',
});

const List = styled('ul')({
  margin: '1vh',
  listStyle: 'none',
});

const ListItem = styled('li')({ width: '100%', marginBottom: '2vh' });

const Title = styled('h3')({ marginBottom: '3vh' });

const ContactItem = styled('div')({
  marginBottom: '2vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>DALClub.</Logo>
        <SocialContainer>
          <Icon>
            <FacebookIcon />
          </Icon>
          <Icon>
            <InstagramIcon />
          </Icon>
          <Icon>
            <TwitterIcon />
          </Icon>
          <Icon>
            <PinterestIcon />
          </Icon>
        </SocialContainer>
      </Left>
      <Center>
        <ListContainer>
          <List>
            <ListItem style={{ fontWeight: 700, margin: '25px 0px' }}>
              Support Links
            </ListItem>
            <ListItem>FAQ</ListItem>
            <ListItem>Gift Cards</ListItem>
            <ListItem>Student Discounts</ListItem>
            <ListItem>COVID-19 Updates</ListItem>
          </List>
          <List>
            <ListItem style={{ fontWeight: 700, margin: '25px 0px' }}>
              About Us
            </ListItem>
            <ListItem>Our Story</ListItem>
            <ListItem>Store Locator</ListItem>
            <ListItem>Careers</ListItem>
            <ListItem>Terms of Use</ListItem>
          </List>
        </ListContainer>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <LocationOnOutlinedIcon style={{ marginRight: '10px' }} /> 6299 South
          St, Halifax, NS, Canada - B3H 3R2
        </ContactItem>
        <ContactItem>
          <LocalPhoneOutlinedIcon style={{ marginRight: '10px' }} /> +1 234 567
          8900
        </ContactItem>
        <ContactItem>
          <MailOutlinedIcon style={{ marginRight: '10px' }} />{' '}
          contact@dalclub.ca
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
