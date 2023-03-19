import {useState, useRef} from 'react';
import {TextInput, View, Pressable, Text} from 'react-native';
function AddRemoveInputField({navigation}) {
  // this will be attached with each input onChangeText
  const [textValue, setTextValue] = useState('');
  // our number of inputs, we can add the length or decrease the length
  const [numInputs, setNumInputs] = useState(1);
  // all our input fields are tracked with this array
  const refInputs = useRef([textValue]);
  const setInputValue = (index, value) => {
    // first, we are storing input value to refInputs array to track them
    const inputs = refInputs.current;
    inputs[index] = value;
    // we are also setting the text value to the input field onChangeText
    setTextValue(value);
  };
  const addInput = () => {
    // add a new element in our refInputs array
    refInputs.current.push('');
    // increase the number of inputs
    setNumInputs(value => value + 1);
  };

  const removeInput = i => {
    // remove from the array by index value
    refInputs.current.splice(i, 1)[0];
    // decrease the number of inputs
    setNumInputs(value => value - 1);
  };

  const inputs = [];
  for (let i = 0; i < numInputs; i++) {
    inputs.push(
      <View key={i} style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>{i + 1}.</Text>
        <TextInput
          style={{
            borderWidth: 2,
            borderColor: 'black',
            width: 200,
            height: 40,
            margin: 10,
            borderRadius: 10,
          }}
          onChangeText={value => setInputValue(i, value)}
          value={refInputs.current[i]}
          placeholder="placeholder"
        />
        {/* To remove the input */}
        <Pressable onPress={() => removeInput(i)} style={{marginLeft: 5}}>
          <Text style={{color: 'red'}}>X</Text>
        </Pressable>
      </View>,
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      }}>
      {inputs}
      <Pressable onPress={addInput} style={{}}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>
          + Add a new input
        </Text>
      </Pressable>
      <View style={{marginTop: 25}}>
        <Text>You have answered:</Text>
        {refInputs.current.map((value, i) => {
          return <Text key={i} style={{}}>{`${i + 1} - ${value}`}</Text>;
        })}
      </View>
    </View>
  );
}

export default AddRemoveInputField;
