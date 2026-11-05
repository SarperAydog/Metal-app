import { useRouter } from 'expo-router';

import { GenreForm } from '@/components/GenreForm';

export default function EditGenresScreen() {
  const router = useRouter();
  return <GenreForm onSaved={() => router.back()} />;
}
