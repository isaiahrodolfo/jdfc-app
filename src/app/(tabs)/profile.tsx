import Account from "@/components/Account";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Text, View } from "react-native";

export default function Profile() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Please sign in.</Text>
      </View>
    );
  }

  return (
    <View>
      <Account key={user.id} userId={user.id} email={user.email} />
    </View>
  );

  // return (
  //   <View>
  //     <Text>Profile</Text>
  //   </View>
  // );
}
