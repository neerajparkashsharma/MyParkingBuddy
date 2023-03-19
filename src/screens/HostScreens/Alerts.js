import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const TaskList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([
  { task: 'Task 1', key: '1' },
  { task: 'Task 2', key: '2' },
  { task: 'Task 3', key: '3' },
  ]);


  const removeTask = (key) => {
    setTasks(tasks.filter((t) => t.key !== key));
  };

  return (
    <View style={styles.container}>

      <FlatList
        style={styles.list}
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.task}</Text>
            <TouchableOpacity onPress={() => removeTask(item.key)}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1f8ff',
  },
  input: {
    height: 40,
    marginBottom: 10,
    marginTop: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#ddd',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  list: {
    marginTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    margin: 5,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
  },
});

export default TaskList;
