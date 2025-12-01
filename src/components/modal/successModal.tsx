// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//   closeRegistrationSuccessModal,
//   registerSuccessSelector,
//   regSuccessSelector
// } from '../../services/Slices/register-slice/register.slice';
// import { useDispatch, useSelector } from '../../services/store/store';
// import { SuccessModalButtonUI } from '../ui/success-modal-button/successModalButtonUI';

// export const SuccessModalButton = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const from = location.state?.from?.pathname || '/login';
//   const onModal = useSelector(regSuccessSelector);
//   const isSucess = useSelector(registerSuccessSelector);

//   // useEffect(() => {
//   //   if (!onModal && isSucess) {
//   //     navigate('/login', { replace: true });
//   //   }
//   // }, [onModal, isSucess]);

//   const handleNavigate = () => {
//     navigate('/login', { replace: true });
//     setTimeout(() => {
//       dispatch(closeRegistrationSuccessModal());
//     }, 100);
//   };

//   return (
//     <SuccessModalButtonUI onClick={handleNavigate}>Войти</SuccessModalButtonUI>
//   );
// };
