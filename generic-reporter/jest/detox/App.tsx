import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const PASSWORD = "currents";

function App() {
  const [user, setUser] = useState<string | null>(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {user ? (
          <Counter user={user} onLogout={() => setUser(null)} />
        ) : (
          <Login onLogin={setUser} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function Login({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const submit = () => {
    if (email && password === PASSWORD) {
      onLogin(email);
    } else {
      setError(true);
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Sign in</Text>
      <TextInput
        testID="email"
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        testID="password"
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && (
        <Text testID="login-error" style={styles.error}>
          Wrong email or password
        </Text>
      )}
      <Button testID="login" title="Sign in" onPress={submit} />
    </View>
  );
}

function Counter({ user, onLogout }: { user: string; onLogout: () => void }) {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.screen}>
      <Text testID="welcome" style={styles.title}>
        Hi, {user}
      </Text>
      <Text testID="count" style={styles.count}>
        {count}
      </Text>
      <Button
        testID="increment"
        title="Add one"
        onPress={() => setCount(count + 1)}
      />
      <Button testID="reset" title="Reset" onPress={() => setCount(0)} />
      <Button testID="logout" title="Sign out" onPress={onLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  screen: { flex: 1, justifyContent: "center", padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: "600", textAlign: "center" },
  count: { fontSize: 48, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 10 },
  error: { color: "#c00", textAlign: "center" },
});

export default App;
