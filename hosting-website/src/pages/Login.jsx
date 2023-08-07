import logo from '../assets/images/Asset-1.png';
import LoginButton from '../components/LoginButton';

export default function Login() {

    return (
        <div className='h-[calc(100vh-80px)] grid place-content-center'>
            <div className='border border-[var(--primary-dark)] rounded-lg p-10 w-96'>
                <div className='h-20 w-20 border border-[var(--primary-dark)] rounded-full grid place-content-center'>
                    <img src={logo} alt="" className='h-8 -translate-y-[2px]' />
                </div>

                <div className='mt-5 mb-10'>
                    <p className='text-2xl font-semibold'>Welcome to arsync</p>
                    <p className='text-sm text-[var(--text-secondary)] mt-1'>Please login with github to continue deploying your repositories</p>
                </div>

                <LoginButton />
            </div>
        
        </div>
    );
}