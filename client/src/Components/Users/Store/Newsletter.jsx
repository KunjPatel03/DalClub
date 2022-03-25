import { Send } from '@mui/icons-material';
import { styled } from '@mui/system';

const Container = styled('div')({
  height: '50vh',
  backgroundColor: '#edf6ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const Title = styled('h1')({
  fontSize: '48px',
  marginBottom: '20px',
});

const Description = styled('p')({
  fontSize: '16px',
  fontWeight: 300,
  marginBottom: '20px',
});

const InputContainer = styled('div')({
  width: '50%',
  height: '40px',
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  border: '1px solid black',
});

const Input = styled('input')({
  border: 'none',
  flex: 9,
  paddingLeft: '20px',
});

const Button = styled('button')({
  flex: 1,
  border: 'none',
  backgroundColor: '#437FC7',
  color: 'white',
});

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>
        Signup for at DALClub. Newsletter and get 15% off first purchase.
      </Description>
      <InputContainer>
        <Input placeholder='Your Email' />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
