import { StateSchema } from 'app/providers/StoreProvider';
import { Notification } from 'entities/Notification';

export const getUnreadMessagesAmount = (notifications?: Notification[]) => (state: StateSchema) => {
  let amount = 0;

  notifications?.forEach((notification) => {
    if (!notification.readed) {
      amount++;
    }
  });

  return amount;
};
