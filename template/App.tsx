/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import StackNavigation from '@app/navigation/StackNavigation';
import { StatusBar } from 'react-native';

function App() {
  return (
    <>
      <StatusBar barStyle={'default'} translucent />
      <StackNavigation />
    </>
  );
}

export default App;
