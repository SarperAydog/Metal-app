import { MessageScreen } from '@/components/MessageScreen';
import { strings } from '@/constants/strings';

export default function NotificationsScreen() {
  return (
    <MessageScreen
      title={strings.empty.notifications.title}
      body={strings.empty.notifications.body}
    />
  );
}
