import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Category } from '../types';

const CATEGORY_COLORS: Record<Category, string> = {
  '仕事': '#1A56DB', '個人': '#0E9F6E', '勉強': '#E3A008', 'その他': '#6B7280'
};

export default function SettingsScreen() {
  const isDark = useColorScheme() === 'dark';

  useEffect(() => {
    return () =>console.log('exited useEffect in SettingsScreen');
  });

  return (
    <SafeAreaView style={[styles.container, isDark && styles.dark]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, isDark && styles.textLight]}>TodoApp</Text>
        <Text style={[styles.version, isDark && styles.textMuted]}>バージョン 1.0.0</Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.textLight]}>使い方</Text>
          <Text style={[styles.item, isDark && styles.textMuted]}>・タップでタスクの完了/未完了を切り替え</Text>
          <Text style={[styles.item, isDark && styles.textMuted]}>・長押しでタスクを削除</Text>
          <Text style={[styles.item, isDark && styles.textMuted]}>・右下の＋ボタンでタスクを追加</Text>
          <Text style={[styles.item, isDark && styles.textMuted]}>・上部のタブでカテゴリを絞り込み</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.textLight]}>カテゴリ</Text>
          {(Object.keys(CATEGORY_COLORS) as Category[]).map(cat => (
            <View key={cat} style={styles.categoryRow}>
              <View style={[styles.dot, { backgroundColor: CATEGORY_COLORS[cat] }]} />
              <Text style={[styles.item, isDark && styles.textMuted]}>{cat}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  dark: { backgroundColor: '#111827' },
  content: { padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  version: { fontSize: 13, color: '#6B7280', marginTop: 4, marginBottom: 24 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#111827', marginBottom: 8 },
  item: { fontSize: 14, color: '#374151', marginBottom: 6 },
  categoryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 8 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  textLight: { color: '#F9FAFB' },
  textMuted: { color: '#9CA3AF' },
});
