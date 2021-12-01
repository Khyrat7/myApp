// ____________ used to ignore warnings____________
// import {LogBox} from 'react-native';

// LogBox.ignoreLogs([
//   'Non-serializable values were found in the navigation state', // passing the warning header ( all text before the : )
// ]);

//__________________________________________________________________________________________________________________________________________________
// ____________ Getting colors array for the product and setting the dorp down ____________
// import DropDownPicker from 'react-native-dropdown-picker';

// // _________ Colors Dropdown hooks _________
// const [colorDDopen, setColorDDOpen] = useState(false);
// const [color, setColor] = useState();
// const [colorDDitems, setColorDDItems] = useState();

// // getting the available colors for the dropdown
// getColorsArray = () => {
//   let colorsArray = [];
//   product.colors.map((color, index) => {
//     key = color;
//     colorsArray.push({label: color, value: color});
//     setColorDDItems(colorsArray);
//   });
// };

// {
//   /* <View // Colors View
//             style={{
//               paddingLeft: 10,
//               marginBottom: 10,
//               flexDirection: 'row',
//               width: Constants.screenWidth,
//               height: Constants.screenHeight * 0.03,
//               alignContent: 'center',
//             }}>
//             <Text style={styles.textHeader}>Availabel Colors: </Text>
//             <DropDownPicker
//               placeholder={product.colors[0]}
//               style={styles.dropDown}
//               theme={theme === 'dark' ? 'DARK' : 'LIGHT'}
//               open={colorDDopen}
//               value={color}
//               items={colorDDitems}
//               setOpen={setColorDDOpen}
//               setValue={setColor}
//               setItems={setColorDDItems}
//               onChangeValue={() => {
//                 setEdited(true);
//               }}
//               dropDownDirection="AUTO"
//               bottomOffset={100}
//               listMode="SCROLLVIEW"
//               textStyle={{fontSize: RFPercentage(2)}}
//             />
//           </View> */
// }

//_______________________________________________________________________________________________________________________________________________________

// array moving function

// function array_move(arr, old_index, new_index) {
//   if (new_index >= arr.length) {
//     var k = new_index - arr.length + 1;
//     while (k--) {
//       arr.push(undefined);
//     }
//   }
//   arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
//   return arr; // for testing
// }

// // returns [2, 1, 3]
// console.log(array_move([1, 2, 3], 0, 1));
