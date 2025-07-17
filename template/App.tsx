/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import StackNavigation from '@app/navigation/StackNavigation';
import MyStatusBar from '@app/utils/helpers/MyStatusBar';

function App() {
  return (
    <>
      <MyStatusBar barStyle={'dark-content'} />
      <StackNavigation />
    </>
  );
}

export default App;
