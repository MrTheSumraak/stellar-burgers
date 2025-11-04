import { useLocation, useNavigate } from 'react-router-dom';
import { SuccessModalButtonUI } from '../ui/success-modal-button/successModalButtonUI';

export const SuccessModalButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/login';

  const handleNavigate = () => {
    navigate(from, { replace: true });
  };

  return (
    <SuccessModalButtonUI onClick={handleNavigate}>Войти</SuccessModalButtonUI>
  );
};
