import { RESPONSE_TYPE_ENUM } from '@/model/enum';
import { toast } from 'react-toastify';

export const apiResponseToast = (message: string, type?: RESPONSE_TYPE_ENUM) => {
  switch (type) {
    case RESPONSE_TYPE_ENUM.SUCCESS:
      toast.success(message);
      break;
    case RESPONSE_TYPE_ENUM.ERROR:
      toast.error(message);
      break;
    case RESPONSE_TYPE_ENUM.WARNING:
      toast.warning(message);
      break;
    default:
      toast(message);
  }
};

