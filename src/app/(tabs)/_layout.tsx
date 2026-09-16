import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="education">
        <NativeTabs.Trigger.Label>Education</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="graduationcap" md="school" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="sermons">
        <NativeTabs.Trigger.Label>Sermons</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="scroll" md="history_edu" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house" md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="devotion">
        <NativeTabs.Trigger.Label>Devotion</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="calendar.badge.plus"
          md="calendar_add_on"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person" md="person" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
