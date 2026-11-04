import { SymbolView } from 'expo-symbols';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { strings } from '@/constants/strings';
import { colors, fontSize, minTouchTarget } from '@/constants/theme';

function NotificationBell() {
  return (
    <Link href="/notifications" asChild>
      <Pressable
        accessibilityLabel={strings.notifications.open}
        accessibilityRole="button"
        style={{
          minWidth: minTouchTarget,
          minHeight: minTouchTarget,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <SymbolView
          name={{ ios: 'bell', android: 'notifications', web: 'notifications' }}
          size={26}
          tintColor={colors.text}
        />
      </Pressable>
    </Link>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { height: 78 + insets.bottom, paddingTop: 6, paddingBottom: 10 + insets.bottom },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 13, fontWeight: '600' },
        headerTitleStyle: { fontSize: fontSize.title, fontWeight: '700' },
        headerRight: () => <NotificationBell />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: strings.tabs.events,
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'calendar', android: 'event', web: 'event' }}
              size={26}
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: strings.tabs.news,
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'newspaper', android: 'newspaper', web: 'newspaper' }}
              size={26}
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: strings.tabs.search,
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
              size={26}
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: strings.tabs.profile,
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'person', android: 'person', web: 'person' }}
              size={26}
              tintColor={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
