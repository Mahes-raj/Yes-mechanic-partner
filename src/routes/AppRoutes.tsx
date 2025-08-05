import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../pages/auth/AuthContext';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import NotificationsPage from '../pages/Notificationspages/NotificationsPage';
import ProfileManagement from '../pages/Profile Management/ProfileManagement';
import Bookings from '../pages/Bookings/Bookings';
import CustomerManagement from '../pages/Customer Management/CustomerManagement';
import SpareParts from '../pages/Spare Parts/SpareParts';
import SettingsPage from '../pages/SettingsPage/SettingsPage';

import FaqPage from '../pages/FAQpages/FaqPages';
import AnnouncementPage from '../pages//Announcements/Announcementspages';
// import ResetPassword from '../pages/auth/ResetPassword';
import LoginPage1 from '../pages/auth/LoginPage1';
import Order from '../pages/Orders/order';
import Service from '../pages/Service Management/Service';
import ServiceCatList from '../pages/serviceList/servicecatList';
import PrivacyPolicySettings from '../pages/SettingsPage/pages/PrivacyPolicyPage';
import TermsConditionsPage from '../pages/SettingsPage/pages/TermsContionsPage';
import EnquiryPage from '../pages/Enquiry/EnquiryPage';



const AppRoutes = () => {
	const { isAuthenticated } = useAuth();

	const AuthRoutes = () => (
		<Routes>
			<Route path='/login' element={<LoginPage1 />} />
			{/* <Route path='/reset-password' element={<ResetPassword />} /> */}
			<Route path='*' element={<Navigate to='/login' />} />
		</Routes>
	);

	const AdminRoutes = () => (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route index element={<Dashboard />} />
				<Route path='notifications' element={<NotificationsPage />} />
				<Route path='service' element={<Service/>} />
				<Route path='profile' element={<ProfileManagement />} />
				<Route path='bookings' element={<Bookings />} />
				<Route path='servicecatList' element={<ServiceCatList/>} />
				<Route path='customer' element={<CustomerManagement />} />
				<Route path='spare-parts' element={<SpareParts />} />
				<Route path='settings' element={<SettingsPage />} />
				<Route path='enquiry-page' element={<EnquiryPage />} />
				<Route path='faq' element={<FaqPage />} />
				<Route path='announcement' element={<AnnouncementPage />} />
				<Route path='*' element={<Navigate to='/' />} />
				<Route path='order' element={<Order />} />
				<Route path='privacy-policy' element={<PrivacyPolicySettings/>}/>
				<Route path='terms-conditions' element={<TermsConditionsPage />}/>
				<Route path='*' element={<Navigate to='/' />}/>
			</Route>
		</Routes>
	);

	return isAuthenticated ? <AdminRoutes /> : <AuthRoutes />;
};

export default AppRoutes;