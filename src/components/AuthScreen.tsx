
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async () => {
    setMessage('');

    if (!email.trim() || password.length < 6) {
      setMessage('Enter a valid email and a password of at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const credentials = {
        email: email.trim(),
        password,
      };

      const { data, error } = isSignUp
        ? await supabase.auth.signUp(credentials)
        : await supabase.auth.signInWithPassword(credentials);

      if (error) {
        setMessage(error.message);
      } else if (isSignUp && !data.session) {
        setMessage('Account created. Check your email to confirm your account.');
      }
    } catch {
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LAND INTELLIGENCE</Text>
      <Text style={styles.subtitle}>KOSOVO</Text>

      <Text style={styles.heading}>
        {isSignUp ? 'Create an account' : 'Welcome back'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoComplete={isSignUp ? 'new-password' : 'current-password'}
        value={password}
        onChangeText={setPassword}
      />

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Pressable
        style={styles.button}
        onPress={() => void handleAuth()}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>
            {isSignUp ? 'Sign Up' : 'Login'}
          </Text>
        )}
      </Pressable>

      <Pressable
        onPress={() => {
          setIsSignUp(!isSignUp);
          setMessage('');
        }}
      >
        <Text style={styles.switchText}>
          {isSignUp
            ? 'Already have an account? Login'
            : "Don't have an account? Sign Up"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#17324D',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#3A9271',
    textAlign: 'center',
    letterSpacing: 3,
    marginBottom: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#17324D',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E8EDF3',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#2F6FE4',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  message: {
    color: '#B34747',
    fontSize: 12,
    marginBottom: 12,
  },
  switchText: {
    color: '#2F6FE4',
    textAlign: 'center',
    marginTop: 22,
    fontSize: 13,
  },
});
