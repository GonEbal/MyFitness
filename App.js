import "react-native-gesture-handler"
import React from "react"
import { View, Platform, StatusBar } from "react-native"
import AddEntry from "./components/AddEntry"
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducer from "./reducers"
import History from "./components/History"
import { purple, white } from "./utils/colors"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import Constants from "expo-constants"
import EntryDetail from "./components/EntryDetail"
import Live from "./components/Live"
import { setLocalNotification } from "./utils/helpers"

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

const Tabs = createBottomTabNavigator()

function MyTabs() {
	return (
		<Tabs.Navigator
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
					} else if (route.name === "Live") {
						iconName = focused
							? "ios-speedometer"
							: "ios-speedometer-outline"
					}
					return <Ionicons name={iconName} size={30} color={color} />
				},
			})}
			tabBarOptions={{
				activeTintColor: "#00BBF2",
				inactiveTintColor: "gray",
			}}
		>
			<Tabs.Screen name="History" component={History} />
			<Tabs.Screen name="AddEntry" component={AddEntry} />
			<Tabs.Screen name="Live" component={Live} />
		</Tabs.Navigator>
	)
}

const StackNavigatorConfig = {
	headerMode: "screen",
}
const StackConfig = {
	MyTabs: {
		name: "Home",
		component: MyTabs,
		options: { headerShown: false },
	},
	EntryDetail: {
		name: "EntryDetail",
		component: EntryDetail,
		options: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: "#00BBF2",
			},
			title: "Entry Detail",
		},
	},
}
const Stack = createStackNavigator()
const MainNav = () => (
	<Stack.Navigator {...StackNavigatorConfig}>
		<Stack.Screen {...StackConfig["MyTabs"]} />
		<Stack.Screen {...StackConfig["EntryDetail"]} />
	</Stack.Navigator>
)

export default class App extends React.Component {
	componentDidMount() {
		setLocalNotification()
	}
	render() {
		return (
			<Provider store={createStore(reducer)}>
				<View style={{ flex: 1 }}>
					<MyStatusBar
						backgroundColor="#00BBF2"
						barStyle="light-content"
					/>
					<NavigationContainer>
						<MainNav />
					</NavigationContainer>
				</View>
			</Provider>
		)
	}
}
