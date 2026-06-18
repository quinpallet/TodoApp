import React, { useEffect, useState } from 'react';
import {
  View, FlatList, TouchableOpacity, Text,
  StyleSheet, Alert, useColorScheme
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTasks } from '../hooks/useTasks';
import { Category } from '../types';
import AddTaskModal from '../components/AddTaskModal';

const CATEGORIES: Category[] = ['仕事', '個人', '勉強', 'その他'];
const CATEGORY_COLORS: Record<Category, string> = {
  '仕事': '#1A56DB', '個人': '#0E9F6E', '勉強': '#E3A008', 'その他': '#6B7280'
};

export default function HomeScreen() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<Category | 'すべて'>('すべて');
  const [modalVisible, setModalVisible] = useState(false);
  const isDark = useColorScheme() === 'dark';

  const filtered = filter === 'すべて'
    ? tasks
    : tasks.filter(t => t.category === filter);

  const handleDelete = (id: string) => {
    Alert.alert('削除確認', 'このタスクを削除しますか？', [
      { text: 'キャンセル', style: 'cancel' },
      { text: '削除', style: 'destructive', onPress: () => deleteTask(id) },
    ]);
  };

  useEffect(() => {
    return () => console.log('exited useEffect in HomeScreen');
  }, []);

  return (
    <SafeAreaView style={[styles.container, isDark && styles.dark]}>
      {/* フィルタータブ */}
      <View style={styles.filterRow}>
        {['すべて', ...CATEGORIES].map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.filterBtn, filter === cat && styles.activeFilter]}
            onPress={() => setFilter(cat as Category | 'すべて')}
          >
            <Text style={[styles.filterText, filter === cat && styles.activeFilterText]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* タスクリスト */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.taskCard}
            onLongPress={() => handleDelete(item.id)}
            onPress={() => toggleTask(item.id)}
          >
            <View style={[styles.categoryTag, { backgroundColor: CATEGORY_COLORS[item.category] }]}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            <Text style={[styles.taskTitle, item.completed && styles.completed]}>
              {item.completed ? '✅ ' : '⬜ '}{item.title}
            </Text>
            {item.description && (
              <Text style={styles.taskDesc}>{item.description}</Text>
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>タスクがありません。＋ボタンで追加しましょう！</Text>
        }
      />

      {/* 追加ボタン（FAB） */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      {/* タスク追加モーダル */}
      <AddTaskModal
        visible={modalVisible}
        categories={CATEGORIES}
        onClose={() => setModalVisible(false)}
        onAdd={async (title, category, description) => {
          await addTask(title, category, description);
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  dark: { backgroundColor: 'rgb(17, 24, 39)' },
  filterRow: { flexDirection: 'row', padding: 12, gap: 8, flexWrap: 'wrap' },
  filterBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
               backgroundColor: '#E5E7EB' },
  activeFilter: { backgroundColor: '#1A56DB' },
  filterText: { fontSize: 13, color: '#374151' },
  activeFilterText: { color: '#FFFFFF', fontWeight: 'bold' },
  taskCard: { margin: 8, marginHorizontal: 16, padding: 16, backgroundColor: '#FFFFFF',
              borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08, shadowRadius: 4, elevation: 3 },
  categoryTag: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2,
                 borderRadius: 8, marginBottom: 6 },
  categoryText: { color: '#FFFFFF', fontSize: 11, fontWeight: 'bold' },
  taskTitle: { fontSize: 16, color: '#111827', fontWeight: '500' },
  completed: { textDecorationLine: 'line-through', color: '#9CA3AF' },
  taskDesc: { fontSize: 13, color: '#6B7280', marginTop: 4 },
  emptyText: { textAlign: 'center', marginTop: 80, fontSize: 15, color: '#9CA3AF' },
  fab: { position: 'absolute', bottom: 32, right: 24, width: 60, height: 60,
         borderRadius: 30, backgroundColor: '#1A56DB', alignItems: 'center',
         justifyContent: 'center', elevation: 8, shadowColor: '#1A56DB',
         shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8 },
  fabText: { fontSize: 32, color: '#FFFFFF', lineHeight: 36 },
});
