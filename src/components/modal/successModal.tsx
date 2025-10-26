import { useNavigate } from 'react-router-dom';
import { SuccessModalButtonUI } from '../ui/success-modal-button/successModalButtonUI';

export const SuccessModalButton = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/login', { replace: true });
  };

  return (
    <SuccessModalButtonUI onClick={handleNavigate}>Войти</SuccessModalButtonUI>
  );
};
