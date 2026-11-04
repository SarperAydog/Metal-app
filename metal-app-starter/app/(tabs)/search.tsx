import { MessageScreen } from '@/components/MessageScreen';
import { strings } from '@/constants/strings';

export default function SearchScreen() {
  return <MessageScreen title={strings.empty.search.title} body={strings.empty.search.body} />;
}
