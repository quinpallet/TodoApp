import React, { useState } from 'react';
import {
  Modal, View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
  Pressable
} from 'react-native';
import { Category } from '../types';

const CATEGORY_COLORS: Record<Category, string> = {
  '仕事': '#1A56DB', '個人': '#0E9F6E', '勉強': '#E3A008', 'その他': '#6B7280'
};

interface AddTaskModalProps {
  visible: boolean;
  categories: Category[];
  onClose: () => void;
  onAdd: (title: string, category: Category, description?: string) => void;
}

export default function AddTaskModal({ visible, categories, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>(categories[0]);

  const reset = () => {
    setTitle('');
    setDescription('');
    setCategory(categories[0]);
  };

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title.trim(), category, description.trim() || undefined);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
    <KeyboardAvoidingView
    style={styles.overlay}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
    <View style={styles.sheet}>
    <Text style={styles.heading}>新しいタスク</Text>

    <TextInput
    style={styles.input}
    placeholder="タスク名"
    value={title}
    onChangeText={setTitle}
    autoFocus
    />
    <TextInput
    style={[styles.input, styles.multiline]}
    placeholder="メモ（任意）"
    value={description}
    onChangeText={setDescription}
    multiline
    />

    <View style={styles.categoryRow}>
    {categories.map(cat => (
      // <TouchableOpacity
      //   key={cat}
      //   style={[
      //     styles.categoryChip,
      //     { borderColor: CATEGORY_COLORS[cat] },
      //     category === cat && { backgroundColor: CATEGORY_COLORS[cat] },
      //   ]}
      //   onPress={() => setCategory(cat)}
      // >
      //   <Text style={[
      //     styles.categoryChipText,
      //     category === cat && styles.categoryChipTextActive,
      //   ]}>
      //     {cat}
      //   </Text>
      // </TouchableOpacity>
      <Pressable
      key={cat}
      style={({ pressed }) => ({
        backgroundColor: pressed ? '#0056b3' : '#007AFF', // 押下中は色を変える
      })}
      onPress={() => setCategory(cat)}
      >
      <Text style={[
        styles.categoryChipText,
        category === cat && styles.categoryChipTextActive,
      ]}>
      {cat}
      </Text>
      </Pressable>
    ))}
    </View>

    <View style={styles.buttonRow}>
    <TouchableOpacity style={styles.cancelBtn} onPress={handleClose}>
    <Text style={styles.cancelBtnText}>キャンセル</Text>
    </TouchableOpacity>
    <TouchableOpacity
    style={[styles.addBtn, !title.trim() && styles.addBtnDisabled]}
    onPress={handleAdd}
    disabled={!title.trim()}
    >
    <Text style={styles.addBtnText}>追加</Text>
    </TouchableOpacity>
    </View>
    </View>
    </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  heading: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, padding: 12,
    fontSize: 15, marginBottom: 12, color: '#111827' },
    multiline: { minHeight: 60, textAlignVertical: 'top' },
    categoryRow: { flexDirection: 'row', gap: 8, marginBottom: 20, flexWrap: 'wrap' },
    categoryChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1.5 },
    categoryChipText: { fontSize: 13, color: '#374151' },
    categoryChipTextActive: { color: '#FFFFFF', fontWeight: 'bold' },
    buttonRow: { flexDirection: 'row', gap: 12 },
    cancelBtn: { flex: 1, padding: 14, borderRadius: 10, alignItems: 'center', backgroundColor: '#E5E7EB' },
    cancelBtnText: { color: '#374151', fontWeight: '600' },
    addBtn: { flex: 1, padding: 14, borderRadius: 10, alignItems: 'center', backgroundColor: '#1A56DB' },
    addBtnDisabled: { backgroundColor: '#9CA3AF' },
    addBtnText: { color: '#FFFFFF', fontWeight: '600' },
  });
