import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2D2926',
        },
        headerTintColor: '#ffc629',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        title: 'Stadium Concessions',  // This replaces "Index"
      }}
    />
  );
}
