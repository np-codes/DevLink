import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import { appStore, persistor } from "./utils/appStore";
import Feed from "./components/Feed";
import { PersistGate } from "redux-persist/integration/react";
import MyLinks from "./components/MyLinks";
import AuthPage from "./components/AuthPage";
import ChatBox from "./components/ChatBox";
import ChatLists from "./components/ChatLists";

function App() {

  return (
    <>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/feed" element={<Feed />} />
                <Route path="/signin" element={<AuthPage section={"Sign In"} />} />
                <Route  path="/signup" element={<AuthPage section={"Sign Up"} />}/>
                <Route path="/profile" element={<Profile />} />
                <Route path="/mylinks" element={<MyLinks />} />
                <Route path="/chats" element={<ChatLists />} />
                <Route path="/chats/:recipientId" element={<ChatBox />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App
