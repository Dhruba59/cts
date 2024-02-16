import { RESPONSE_TYPE_ENUM } from '@/model/enum';
import { toast } from 'react-toastify';

interface Response {
  data: any;
  type: number;
  message: string;
  details: string;
}

export const apiResponseToast = (response: Response) => {
  const message = response.message + ' ' + response.details;
  switch (response.type) {
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

