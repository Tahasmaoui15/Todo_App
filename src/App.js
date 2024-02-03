import React, { useState } from 'react';
import {
  ChakraProvider,
  CSSReset,
  Box,
  Heading,
  Input,
  Button,
  List,
  ListItem,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedTodo, setEditedTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo('');
    }
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    if (editTodoId === id) {
      setEditTodoId(null);
      setEditedTodo('');
    }
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditTodoId(id);
      setEditedTodo(todoToEdit.text);
    }
  };

  const updateTodo = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editTodoId) {
        return { ...todo, text: editedTodo };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditTodoId(null);
    setEditedTodo('');
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="purple.100">
        <Box bg="purple.200" p={8} rounded="lg" shadow="xl" w="500px">
          <Heading
            mb={6}
            textAlign="center"
            fontSize="3xl"
            fontWeight="bold"
            color="purple.700"
          >
            Get Things Done!
          </Heading>
          <Flex mb={4}>
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter a new task"
              pr="4.5rem"
              roundedLeft="md"
              border="2px solid"
              borderColor="purple.300"
              _focus={{ borderColor: 'purple.500' }}
            />
            <Button
              onClick={addTodo}
              colorScheme="purple"
              roundedRight="md"
              ml="-4.5rem"
              _hover={{ backgroundColor: 'purple.500' }}
              _active={{ backgroundColor: 'purple.600' }}
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              color="white"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add
            </Button>
          </Flex>
          <List spacing={3}>
            {todos.map((todo) => (
              <ListItem
                key={todo.id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                display="flex"
                justifyContent="space-between"
                _hover={{ boxShadow: 'lg' }}
                bg="purple.300"
              >
                {editTodoId === todo.id ? (
                  <Input
                    value={editedTodo}
                    onChange={(e) => setEditedTodo(e.target.value)}
                    onBlur={updateTodo}
                    autoFocus
                    variant="flushed"
                    bg="purple.200"
                  />
                ) : (
                  <Text color="purple.800">{todo.text}</Text>
                )}
                <Flex>
                  {editTodoId !== todo.id && (
                    <IconButton
                      icon={<FontAwesomeIcon icon={faEdit} />}
                      colorScheme="green"
                      onClick={() => editTodo(todo.id)}
                      _hover={{ color: 'green.500' }}
                      backgroundColor="transparent"
                    />
                  )}
                  <IconButton
                    icon={<FontAwesomeIcon icon={faTrash} />}
                    colorScheme="red"
                    onClick={() => removeTodo(todo.id)}
                    _hover={{ color: 'red.500' }}
                    backgroundColor="transparent"
                  />
                </Flex>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;

