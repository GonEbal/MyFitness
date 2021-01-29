import React from "react"
import { View, Platform, StatusBar } from "react-native"
import AddEntry from "./components/AddEntry"
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducer from "./reducers"
import History from "./components/History"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import Constants from "expo-constants"

function MyStatusBar({ backgroundColor, ...props }) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar
				translucent
				backgroundColor={backgroundColor}
				{...props}
			/>
		</View>
	)
}

const Tab = createBottomTabNavigator()

export default class App extends React.Component {
	render() {
		return (
			<Provider store={createStore(reducer)}>
				<View style={{ flex: 1 }}>
					<MyStatusBar
						backgroundColor="#00BBF2"
						barStyle="light-content"
					/>
					<NavigationContainer>
						<Tab.Navigator
							screenOptions={({ route }) => ({
								tabBarIcon: ({ focused, color, size }) => {
									let iconName

									if (route.name === "History") {
										iconName = focused
											? "ios-bookmarks"
											: "ios-bookmarks-outline"
									} else if (route.name === "AddEntry") {
										iconName = focused
											? "add-circle"
											: "add-circle-outline"
									}
									return (
										<Ionicons
											name={iconName}
											size={30}
											color={color}
										/>
									)
								},
							})}
							tabBarOptions={{
								activeTintColor: "#00BBF2",
								inactiveTintColor: "gray",
							}}
						>
							<Tab.Screen name="History" component={History} />
							<Tab.Screen name="AddEntry" component={AddEntry} />
						</Tab.Navigator>
					</NavigationContainer>
				</View>
			</Provider>
		)
	}
}
