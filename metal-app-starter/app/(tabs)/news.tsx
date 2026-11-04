import { MessageScreen } from '@/components/MessageScreen';
import { strings } from '@/constants/strings';

export default function NewsScreen() {
  return <MessageScreen title={strings.empty.news.title} body={strings.empty.news.body} />;
}
