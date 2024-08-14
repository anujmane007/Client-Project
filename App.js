import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Welcome from './src/screens/Welcome';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectDetailsModal from './src/screens/Homepage';
import Verification from './src/screens/Verification';
import GenericBodyCard from './src/GenericComponent/GenericBodyCard';
import { Users } from './src/screens/Users';
import { Projects } from './src/screens/Projects';
import { NestedModal } from './src/screens/NestedModal';
import { PaperProvider, MD3LightTheme as DefaultTheme, } from 'react-native-paper';
//import { ShowTableFiles } from './src/GenericComponent/ShowTableFiles';
import { ProjectModal } from './src/GenericComponent/ProjectModal';
import Details from './src/screens/details';
import InteriorForm from './src/screens/InteriorForm';
import {InteriorProjects} from './src/screens/InteriorProjects';
import InteriorDetails from './src/screens/interiorDetails';

const lightTheme = {
  "colors": {
    "primary": "rgb(120, 69, 172)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(240, 219, 255)",
    "onPrimaryContainer": "rgb(44, 0, 81)",
    "secondary": "rgb(102, 90, 111)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(237, 221, 246)",
    "onSecondaryContainer": "rgb(33, 24, 42)",
    "tertiary": "rgb(128, 81, 88)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(255, 217, 221)",
    "onTertiaryContainer": "rgb(50, 16, 23)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(255, 251, 255)",
    "onBackground": "rgb(29, 27, 30)",
    "surface": "rgb(255, 251, 255)",
    "onSurface": "rgb(29, 27, 30)",
    "surfaceVariant": "rgb(233, 223, 235)",
    "onSurfaceVariant": "rgb(74, 69, 78)",
    "outline": "rgb(124, 117, 126)",
    "outlineVariant": "rgb(204, 196, 206)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(50, 47, 51)",
    "inverseOnSurface": "rgb(245, 239, 244)",
    "inversePrimary": "rgb(220, 184, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(248, 242, 251)",
      "level2": "rgb(244, 236, 248)",
      "level3": "rgb(240, 231, 246)",
      "level4": "rgb(239, 229, 245)",
      "level5": "rgb(236, 226, 243)"
    },
    "surfaceDisabled": "rgba(29, 27, 30, 0.12)",
    "onSurfaceDisabled": "rgba(29, 27, 30, 0.38)",
    "backdrop": "rgba(51, 47, 55, 0.4)"
  }
}

const theme = {
  ...DefaultTheme,
  colors: lightTheme.colors, // Copy it from the color codes scheme and then use it here
};

const Stack = createNativeStackNavigator();

const UserComponent = ({ navigation }) => {
  return (
    <GenericBodyCard>
      <Users navigation={navigation} />
    </GenericBodyCard>
  )
}
const AccountComponent = ({ navigation }) => {
  return (
    <GenericBodyCard>
      <Projects navigation={navigation} />
    </GenericBodyCard>
  )
}
const AccountComponentInterior = ({ navigation }) => {
  return (
    <GenericBodyCard>
      <InteriorProjects navigation={navigation} />
    </GenericBodyCard>
  )
}
const FormComponent = ({ navigation, route }) => {
  return (
    <GenericBodyCard>
      <NestedModal navigation={navigation} route={route}/>
    </GenericBodyCard>
  )
}
const HomepageComponent = ({ navigation, route }) => {
  return (
    <GenericBodyCard>
      < ProjectDetailsModal navigation={navigation} route={route} />
    </GenericBodyCard>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Stack.Navigator initialRouteName='welcome'>
          <Stack.Screen name="welcome" component={Welcome}
            options={
              {
                headerShown: true,
                headerBackButtonMenuEnabled: true
              }
            }
          />
          
          
          <Stack.Screen name="login" component={Login}
            options={
              {
                headerShown: true,
                headerBackButtonMenuEnabled: true

              }
            }
          />
          
          <Stack.Screen name="signup" component={Signup}
            options={
              {
                headerShown: true,
                headerBackButtonMenuEnabled: true

              }
            }

          />
          <Stack.Screen name="homepage" component={
            HomepageComponent
          }
            options={
              {
                headerShown: true,
                headerBackButtonMenuEnabled: true

              }
            }
            initialParams={{ id: undefined }}
          />
          <Stack.Screen name="Architecture Project" component={
            FormComponent}
            options={
              {
                headerShown: true,
                headerBackButtonMenuEnabled: true

              }
            }
          />
          <Stack.Screen name="Interior Project" component={InteriorForm}
            options={
              {
                headerShown: true,
                headerBackButtonMenuEnabled: true

              }
            }
          />
          <Stack.Screen name="View Interior Projects" component={AccountComponentInterior}
            options={
              {
                headerShown: true,
                headerBackButtonMenuEnabled: true

              }
            }
          />
          <Stack.Screen name="modal" component={
            ProjectModal
          }
            options={
              {
                headerShown: true,
                headerBackButtonMenuEnabled: true

              }
            }
            initialParams={{ data: undefined }}
          />

          <Stack.Screen name="Verification" component={Verification}
            options={
              {
                headerShown: true,
                headerBackButtonMenuEnabled: true

              }
            }
          />
          <Stack.Screen name="Employee Details" component={
            UserComponent}
            options={
              {
                headerShown: true,
                headerBackButtonMenuEnabled: true

              }
            }
          />
          <Stack.Screen name="View Architecture Projects" component={
            AccountComponent}
            options={
              {
                headerShown: true,
                headerBackButtonMenuEnabled: true

              }
            }
          />
          <Stack.Screen name="Details" component={
            Details}
            options={
              {
                headerShown: true,
                headerBackButtonMenuEnabled: true

              }
            }
          />
          <Stack.Screen name="InteriorDetails" component={
            InteriorDetails}
            options={
              {
                headerShown: true,
                headerBackButtonMenuEnabled: true

              }
            }
          />

          
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
});