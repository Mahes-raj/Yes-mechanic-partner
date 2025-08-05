// import { useState, useRef } from 'react';
// import { useForm } from 'react-hook-form';
// import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
// import { Link, useNavigate } from 'react-router-dom';
// import LoginImage from '../../../src/assets/login-pg-img/login-video.mp4';
// // import { FONTS } from '../../constants/constants';

// type ResetFormData = {
// 	email: string;
// 	newPassword: string;
// 	confirmPassword: string;
// };

// const generateOtp = () =>
// 	Math.floor(100000 + Math.random() * 900000).toString();

// const ResetPassword = () => {
// 	const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
// 	const [storedOtp, setStoredOtp] = useState('');
// 	const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
// 	const [showPassword, setShowPassword] = useState(false);
// 	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// 	const otpRefs = useRef<HTMLInputElement[]>([]);
// 	const navigate = useNavigate();

// 	const {
// 		register,
// 		handleSubmit,
// 		getValues,
// 		setError,
// 		clearErrors,
// 		formState: { errors },
// 	} = useForm<ResetFormData>();

// 	const handleEmailSubmit = () => {
// 		const email = getValues('email');
// 		if (!email) {
// 			setError('email', { message: 'Please enter your email' });
// 			return;
// 		}
// 		clearErrors('email');
// 		const generatedOtp = generateOtp();
// 		setStoredOtp(generatedOtp);
// 		setStep('otp');
// 		console.log('Generated OTP:', generatedOtp); // simulate OTP send
// 	};

// 	const handleOtpChange = (index: number, value: string) => {
// 		if (!/^\d?$/.test(value)) return; // Only allow digits
// 		const updated = [...otpDigits];
// 		updated[index] = value;
// 		setOtpDigits(updated);
// 		if (value && index < 5) {
// 			otpRefs.current[index + 1]?.focus();
// 		}
// 	};

// 	const handleOtpKeyDown = (
// 		e: React.KeyboardEvent<HTMLInputElement>,
// 		index: number
// 	) => {
// 		if (e.key === 'Backspace') {
// 			e.preventDefault();
// 			const updated = [...otpDigits];
// 			if (otpDigits[index]) {
// 				updated[index] = '';
// 			} else if (index > 0) {
// 				updated[index - 1] = '';
// 				otpRefs.current[index - 1]?.focus();
// 			}
// 			setOtpDigits(updated);
// 		}
// 	};

// 	const handleOtpVerify = () => {
// 		const enteredOtp = otpDigits.join('');
// 		if (enteredOtp === storedOtp) {
// 			setStep('reset');
// 			clearErrors('otp');
// 		} else {
// 			setError('otp', { message: 'Invalid OTP' });
// 		}
// 	};

// 	const onSubmit = (data: ResetFormData) => {
// 		if (data.newPassword !== data.confirmPassword) {
// 			setError('confirmPassword', { message: 'Passwords do not match' });
// 			return;
// 		}
// 		console.log('Password reset for:', data.email);
// 		navigate('/login');
// 		// API call to reset password here
// 	};

// 	return (
// 		<div className='relative min-h-screen flex justify-end items-center font-sans bg-black'>
// 			<video
// 				className='absolute inset-0 w-full h-full object-cover z-0'
// 				autoPlay
// 				loop
// 				muted
// 				playsInline
// 			>
// 				<source src={LoginImage} type='video/mp4' />
// 				Your browser does not support the video tag.
// 			</video>

// 			<div className='relative z-20 w-full md:w-1/2 flex items-center justify-center px-6'>
// 				<div className='w-full max-w-md shadow-2xl rounded-3xl p-10 border border-white/30 bg-white/25 backdrop-blur-md'>
// 					<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
// 						<h2 className='text-3xl font-bold text-white text-center'>
// 							{step === 'email'
// 								? 'Verify Email'
// 								: step === 'otp'
// 								? 'Enter OTP'
// 								: 'Reset Password'}
// 						</h2>

// 						{/* Email Step */}
// 						{step === 'email' && (
// 							<div className='flex flex-col space-y-2'>
// 								<label className='text-sm font-semibold text-white'>
// 									Email Address
// 								</label>
// 								<input
// 									type='email'
// 									placeholder='Enter your email address'
// 									{...register('email', { required: 'Email is required' })}
// 									className={`w-full mb-5 px-4 py-3 border text-[#7c0c0c] rounded-lg bg-white/70 placeholder:text-[#9f3f3f] focus:ring-2 focus:ring-[#9b111e] text-sm ${
// 										errors.email ? 'border-red-500' : 'border-[#d77c7c]'
// 									}`}
// 								/>
// 								{errors.email && (
// 									<span className='text-xs text-red-500'>
// 										{errors.email.message}
// 									</span>
// 								)}
// 								<button
// 									type='button'
// 									onClick={handleEmailSubmit}
//                                     style={{}}
// 									className='w-full py-2 mt-2 text-white font-semibold rounded-full bg-gradient-to-r from-[#9b111e] to-[#d23c3c] text-sm'
// 								>
// 									Send OTP
// 								</button>
// 							</div>
// 						)}

// 						{/* OTP Step */}
// 						{step === 'otp' && (
// 							<div className='flex flex-col space-y-3'>
// 								<label className='text-sm font-semibold text-white'>
// 									Enter the 6-digit OTP
// 								</label>
// 								<div className='flex justify-between space-x-2'>
// 									{otpDigits.map((digit, idx) => (
// 										<input
// 											key={idx}
// 											type='text'
// 											maxLength={1}
// 											value={digit}
// 											onChange={(e) => handleOtpChange(idx, e.target.value)}
// 											onKeyDown={(e) => handleOtpKeyDown(e, idx)}
// 											ref={(el) => (otpRefs.current[idx] = el!)}
// 											className='w-10 h-12 text-center text-lg rounded-lg border border-[#d77c7c] bg-white/80 text-[#7c0c0c] focus:ring-2 focus:ring-[#9b111e]'
// 										/>
// 									))}
// 								</div>
// 								{errors.otp && (
// 									<span className='text-xs text-red-500'>
// 										{errors.otp.message}
// 									</span>
// 								)}
// 								<button
// 									type='button'
// 									onClick={handleOtpVerify}
// 									className='w-full py-2 mt-2 text-white font-semibold rounded-full bg-gradient-to-r from-[#9b111e] to-[#d23c3c] text-sm'
// 								>
// 									Verify OTP
// 								</button>
// 							</div>
// 						)}

// 						{/* Reset Password Step */}
// 						{step === 'reset' && (
// 							<>
// 								{/* New Password */}
// 								<div className='flex flex-col space-y-2'>
// 									<label className='text-sm font-semibold text-white'>
// 										New Password
// 									</label>
// 									<div className='relative'>
// 										<input
// 											type={showPassword ? 'text' : 'password'}
// 											placeholder='Enter new password'
// 											{...register('newPassword', {
// 												required: 'New password is required',
// 												minLength: {
// 													value: 8,
// 													message: 'Minimum 8 characters',
// 												},
// 												pattern: {
// 													value:
// 														/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
// 													message:
// 														'Include uppercase, lowercase, number & special char',
// 												},
// 											})}
// 											className={`w-full px-4 py-3 border text-[#7c0c0c] placeholder:text-[#9f3f3f] rounded-lg bg-white/70 pr-10 text-sm ${
// 												errors.newPassword
// 													? 'border-red-500'
// 													: 'border-[#d77c7c]'
// 											}`}
// 										/>
// 										<span
// 											className='absolute top-3 right-3 cursor-pointer'
// 											onClick={() => setShowPassword(!showPassword)}
// 										>
// 											{showPassword ? (
// 												<EyeIcon className='w-5 h-5 text-[#9b111e]' />
// 											) : (
// 												<EyeSlashIcon className='w-5 h-5 text-[#9b111e]' />
// 											)}
// 										</span>
// 									</div>
// 									{errors.newPassword && (
// 										<span className='text-xs text-red-500'>
// 											{errors.newPassword.message}
// 										</span>
// 									)}
// 								</div>

// 								{/* Confirm Password */}
// 								<div className='flex flex-col space-y-2'>
// 									<label className='text-sm font-semibold text-white'>
// 										Confirm New Password
// 									</label>
// 									<div className='relative'>
// 										<input
// 											type={showConfirmPassword ? 'text' : 'password'}
// 											placeholder='Confirm new password'
// 											{...register('confirmPassword', {
// 												required: 'Please confirm your password',
// 											})}
// 											className={`w-full px-4 py-3 border text-[#7c0c0c] placeholder:text-[#9f3f3f] rounded-lg bg-white/70 pr-10 text-sm ${
// 												errors.confirmPassword
// 													? 'border-red-500'
// 													: 'border-[#d77c7c]'
// 											}`}
// 										/>
// 										<span
// 											className='absolute top-3 right-3 cursor-pointer'
// 											onClick={() =>
// 												setShowConfirmPassword(!showConfirmPassword)
// 											}
// 										>
// 											{showConfirmPassword ? (
// 												<EyeIcon className='w-5 h-5 text-[#9b111e]' />
// 											) : (
// 												<EyeSlashIcon className='w-5 h-5 text-[#9b111e]' />
// 											)}
// 										</span>
// 									</div>
// 									{errors.confirmPassword && (
// 										<span className='text-xs text-red-500'>
// 											{errors.confirmPassword.message}
// 										</span>
// 									)}
// 								</div>

// 								{/* Submit Button */}
// 								<button
// 									type='submit'
// 									className='w-full py-3 text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:brightness-110 text-sm bg-gradient-to-r from-[#9b111e] to-[#d23c3c]'
// 								>
// 									Reset Password
// 								</button>
// 							</>
// 						)}

// 						<div className='text-center pt-1'>
// 							<Link to='/login' className='text-white hover:underline text-sm'>
// 								Back to Login
// 							</Link>
// 						</div>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default ResetPassword;
