import { MessageScreen } from '@/components/MessageScreen';
import { strings } from '@/constants/strings';

export default function EventsScreen() {
  return <MessageScreen title={strings.empty.events.title} body={strings.empty.events.body} />;
}
