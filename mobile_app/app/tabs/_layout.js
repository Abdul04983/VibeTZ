import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="post" options={{ title: 'Post' }} />
      <Tabs.Screen name="chat" options={{ title: 'Chat' }} />
      <Tabs.Screen name="follow" options={{ title: 'Follow' }} />
      <Tabs.Screen name="search" options={{ title: 'Search' }} />
      <Tabs.Screen name="comment" options={{ title: 'Comment' }} />
      <Tabs.Screen name="tictactoe" options={{ title: 'TicTacToe' }} />
      <Tabs.Screen name="voicepost" options={{ title: 'VoicePost' }} />
      <Tabs.Screen name="mpesapayment" options={{ title: 'M-Pesa' }} />
      <Tabs.Screen name="notification" options={{ title: 'Notification' }} />
      <Tabs.Screen name="autotranslate" options={{ title: 'AutoTranslate' }} />
    </Tabs>
  );
}
