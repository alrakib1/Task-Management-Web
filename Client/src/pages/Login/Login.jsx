import Lottie from 'react-lottie-player'
import loginanimation from "../../assets/animations/loginanimation.json"
import Container from '../../components/shared/Container/Container';

const Login = () => {
    return (
        <Container>
          
            <Lottie
      loop
      animationData={loginanimation}
      play
    className='w-[500px] h-[500px] object-contain'
    />
        </Container>
    );
};

export default Login;