import React, { Component } from 'react';
import { Provider, defaultTheme, Button, TextField, View, Flex, Heading, ListView, Item, ActionButton } from '@adobe/react-spectrum';
import './App.css'; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newItem: ''
    };
  }

  handleInputChange = (value) => {
    this.setState({ newItem: value });
  }

  addItem = () => {
    if (this.state.newItem.trim() !== '') {
      this.setState((prevState) => ({
        items: [...prevState.items, prevState.newItem],
        newItem: ''
      }));
    }
  }

  deleteItem = (index) => {
    this.setState((prevState) => ({
      items: prevState.items.filter((_, i) => i !== index)
    }));
  }

  render() {
    return (
      <Provider theme={defaultTheme}>
        <View padding="size-200" className="App">
          <Heading level={1}>Todo List</Heading>
          <Flex direction="column" gap="size-200">
            <TextField
              label="New Item"
              value={this.state.newItem}
              onChange={this.handleInputChange}
            />
            <Button variant="cta" onPress={this.addItem}>Add Item</Button>
            <ListView
              aria-label="Todo List"
              selectionMode="none"
              items={this.state.items}
              renderItem={(item, index) => (
                <Item key={index}>
                  <Flex justifyContent="space-between" alignItems="center" className="item">
                    <span>{item}</span>
                    <ActionButton className="button" onPress={() => this.deleteItem(index)}>Delete</ActionButton>
                  </Flex>
                </Item>
              )}
            />
          </Flex>
        </View>
      </Provider>
    );
  }
}

export default App;
