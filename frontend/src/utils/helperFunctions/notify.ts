import { toast, Bounce, ToastPosition, ToastTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastType = 'success' | 'error' | 'warn';

const defaultToastOptions = {
  position: 'top-center' as ToastPosition,
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Bounce as ToastTransition,
};

export const notify = (toastType: ToastType, toastMsg: string) => {
  switch (toastType) {
    case 'success':
      toast.success(toastMsg, {
        ...defaultToastOptions,
      });
      break;
    case 'error':
      toast.error(toastMsg, {
        ...defaultToastOptions,
      });
      break;
    case 'warn':
      toast.warn(toastMsg, {
        ...defaultToastOptions,
      });
      break;
    default:
      console.error('Unknown toast type');
      break;
  }
};
