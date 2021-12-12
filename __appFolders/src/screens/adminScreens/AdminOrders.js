import React, {
  useContext,
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

//
//_________ Redux imports _________
import {useSelector, useDispatch} from 'react-redux';
import * as adminActions from '../../../store/actions/adminActions';

import CustomHeaderButton from '../../components/HeaderButton';
import {ThemeContext} from '../../../context/LayoutContext';
import AdminOrderCard from '../../components/adminComponents/AdminOrderCard';

export default function AdminOrders(props) {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.admin.allOrders);
  const doneOrders = useSelector(state => state.admin.doneOrders);
  const activeOrders = useSelector(state => state.admin.activeOrders);

  const userID = auth().currentUser.uid;

  // ____ Props & Hooks ____

  const {navigation, route} = props;
  const {themeColors} = useContext(ThemeContext);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [data, setData] = useState(orders);

  // console.log(data);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,

      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Home"
            iconSize={23}
            iconName="notification-clear-all"
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
      // headerRight: () => (
      //   <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      //     <Item
      //       title="Cart"
      //       iconSize={23}
      //       iconName="cart-outline"
      //       onPress={() => navigation.navigate('CartScreen')}
      //     />
      //   </HeaderButtons>
      // ),
    });
  });

  useEffect(() => {
    setIsLoading(true);
    getOrdersData();
    setIsLoading(false);
  }, []);

  // _____________ Functions ____________

  //  Swipeable function and variables
  let row = data;
  let prevOpenedRow;
  const RightActions = (dragX, orderID) => {
    // still missing the function to close opened swipes when other one is opened

    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.9, 0],
    });

    deleteAction = () => {
      console.log('deleteAction : ', orderID);
    };

    archiveAction = () => {
      console.log('archiveAction : ', orderID);
    };

    return (
      <>
        <View // Main View
          style={{
            flexDirection: 'column',
            height: '90%',
            alignSelf: 'center',
            marginHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 10,
            paddingVertical: '23%',
            width: '30%',
          }}>
          <View>
            <TouchableOpacity // 1st Button
              onPress={() => {
                deleteAction();
              }}>
              <View
                style={{
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  height: '60%',
                  marginHorizontal: 3,
                  borderRadius: 8,
                  paddingHorizontal: 3,
                  marginVertical: 10,
                  width: '100%',
                }}>
                <Animated.Text
                  style={{
                    color: 'white',
                    paddingHorizontal: 10,
                    fontWeight: 'bold',
                    fontSize: RFPercentage(2),
                    textAlign: 'center',
                    width: 100,
                    // transform: [{scale}],
                  }}>
                  Delete
                </Animated.Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity // 2nd Button
              onPress={() => {
                archiveAction();
              }}>
              <View
                style={{
                  backgroundColor: 'green',
                  justifyContent: 'center',
                  height: '60%',
                  marginHorizontal: 3,
                  borderRadius: 8,
                  paddingHorizontal: 3,
                  marginVertical: 10,
                  width: '100%',
                }}>
                <Animated.Text
                  style={{
                    color: 'white',
                    paddingHorizontal: 10,
                    fontWeight: 'bold',
                    fontSize: RFPercentage(2),
                    textAlign: 'center',
                    width: 100,
                    // transform: [{scale}],
                  }}>
                  Archive
                </Animated.Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  const getOrdersData = () => {
    try {
      setIsRefresh(true);
      dispatch(adminActions.getAdminOrders(userID));
      setIsRefresh(false);
    } catch (e) {
      console.log(e);
      setIsRefresh(false);
    }
  };

  // _____________ Styles ____________

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerView: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: themeColors.header,
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    headerText: {
      fontSize: RFPercentage(2),
      textAlign: 'center',
      color: themeColors.headerFont,
      paddingHorizontal: 20,
      borderColor: themeColors.headerFont,
      borderWidth: 1,
      borderRadius: 4,
      width: '100%',
    },
    headerResultView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: themeColors.header,

      paddingBottom: 3,
      paddingHorizontal: 20,
    },
    headerResultText: {
      color: themeColors.headerFont,
      paddingHorizontal: 20,
    },
  });

  if (!data || isLoading) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: themeColors.background,
          flex: 1,
        }}></SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{backgroundColor: themeColors.background, flex: 1}}>
        <View>
          <View // Header section
            style={styles.headerView}>
            <View style={{width: '25%'}}>
              <TouchableOpacity
                onPress={() => {
                  setIsLoading(true);
                  setData(orders);
                  setActiveTab('All');
                  setIsLoading(false);
                }}>
                <Text style={styles.headerText}>All</Text>
              </TouchableOpacity>
            </View>

            <View style={{width: '25%'}}>
              <TouchableOpacity
                onPress={() => {
                  setIsLoading(true);
                  setData(activeOrders);
                  setActiveTab('Active');
                  setIsLoading(false);
                }}>
                <Text style={styles.headerText}>Active</Text>
              </TouchableOpacity>
            </View>

            <View style={{width: '25%'}}>
              <TouchableOpacity
                onPress={() => {
                  setIsLoading(true);
                  setData(doneOrders);
                  setActiveTab('Done');
                  setIsLoading(false);
                }}>
                <Text style={styles.headerText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerResultView}>
            <Text style={styles.headerResultText}>{activeTab}</Text>

            <Text style={styles.headerResultText}>
              Total Result : {data.length}
            </Text>
          </View>
        </View>

        {isLoading ? (
          <View
            style={{paddingVertical: 10, backgroundColor: themeColors.header}}>
            <ActivityIndicator size="large" color={themeColors.headerFont} />
          </View>
        ) : null}
        <View style={styles.container}>
          <FlatList
            // onRefresh={getOrdersData}
            // refreshing={isRefresh}
            data={data}
            ItemSeparatorComponent={() => <View></View>}
            keyExtractor={(item, index) => item.orderID}
            renderItem={order => {
              return (
                <Swipeable
                  ref={ref => (row[order.index] = ref)}
                  renderRightActions={progress =>
                    RightActions(progress, order.item.orderID)
                  }
                  onSwipeableWillOpen={() => {
                    console.log('order index :', order.index);

                    if (prevOpenedRow && prevOpenedRow !== order.item) {
                      prevOpenedRow.close();
                    }
                    prevOpenedRow = row[order.index];
                  }}>
                  <AdminOrderCard
                    style={{overflow: 'hidden'}}
                    product={order.item}
                    handleCardPressed={() => {}}
                  />
                </Swipeable>
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
