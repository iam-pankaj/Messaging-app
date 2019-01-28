var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;} //Data
var data = {
  baseURL: "https://day-7-messaging.firebaseio.com/",
  profileImage: "https://pbs.twimg.com/media/Diz0a9BWAAEol5v.jpg",
  messages: {},
  prevChats: [
  {
    lastText: "",
    sender: {
      name: "Public Chatroom",
      profileImage: "https://zephyo.github.io/22Days/code/7/graphics/users.svg" } },


  {
    lastText: "Hey, wanna get boba? 😊 I found a really cool place that u might like",
    sender: {
      name: "Madie 💗",
      profileImage: "https://pbs.twimg.com/media/DiPs3H7V4AAvnmT.jpg" } },


  {
    lastText: "k I'm off to procure sustenance",
    sender: {
      name: "best bench",
      profileImage: "https://pbs.twimg.com/media/Ds89x98UUAA_7xY.jpg" } },


  {
    lastText: "Lia sent a photo.",
    sender: {
      name: "Lia",
      profileImage: "https://pbs.twimg.com/media/DupPZcMXgAY339e.jpg" } }] },




msgName = "messages",
// My database - on the free plan
config = {
  apiKey: "AIzaSyBnWbqZC0wncY06pWlHX8DCbIM_EM9zrE8",
  authDomain: "day-7-messaging.firebaseapp.com",
  databaseURL: "https://day-7-messaging.firebaseio.com",
  projectId: "day-7-messaging",
  storageBucket: "day-7-messaging.appspot.com",
  messagingSenderId: "307150346579" };


firebase.initializeApp(config);

//Components

//App Container
var App = function (_React$Component) {_inherits(App, _React$Component);
  function App(props) {_classCallCheck(this, App);var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
    props));_this.









    update = function ()
    {
      _this.state.firebaseRef.on("value",
      function (snapshot) {
        _this.setState({
          messages: snapshot.val() },
        function () {
          if (_this.state.messages)
          {
            var last = Object.keys(_this.state.messages)[Object.keys(_this.state.messages).length - 1];
            var prev = _this.state.prevChats;
            prev[0].lastText = _this.state.messages[last].message;
            _this.setState({
              prevChats: prev });

            _this.scrollWindow();
          }
        });
      });
    };_this.

    login = function () {
      var user = {
        name: $("#name").val(),
        email: $("#email").val() };

      if (user.name && user.email) {
        _this.setState({ thisUser: user });
      }
    };_this.

    handleSubmit = function () {
      var value = $(".messageInput").val();
      if (value.length === 0) {

        return;
      }
      var message = {
        sender: _this.state.thisUser,
        message: value };


      _this.postMessage(message);
      $(".messageInput").val("");
    };_this.








    scrollWindow = function () {
      var windowHeight = $(".Messages").height();
      $(".container").animate(
      { scrollTop: $(".container")[0].scrollHeight },
      500);

    };_this.state = data;return _this;}_createClass(App, [{ key: "componentWillMount", value: function componentWillMount() {this.setState({ firebaseRef: firebase.database().ref(msgName) }, this.update);} }, { key: "postMessage", value: function postMessage(message) {// Get a key for a new Post.
      var newPostRef = this.state.firebaseRef.push();newPostRef.set(message, this.scrollWindow);} }, { key: "render", value: function render()
    {
      return (
        React.createElement("div", { className: "App" },
          React.createElement(Conversation, {
            messages: this.state.messages,
            recipient: this.state.recipient,
            onSubmit: this.handleSubmit,
            thisUser: this.state.thisUser }),

          React.createElement(Profile, {
            thisUser: this.state.thisUser,
            prevChats: this.state.prevChats,
            profileImage: this.state.profileImage }),

          !this.state.thisUser ? React.createElement(LoginForm, { login: this.login }) : null));


    } }]);return App;}(React.Component);


var LoginForm = function LoginForm(props) {
  return (
    React.createElement("div", { className: "LoginForm" },
      React.createElement("div", { className: "sign-up" },
        React.createElement("h1", null, "SIGN UP"),
        React.createElement("div", { className: "input" }, React.createElement("input", { id: "name", type: "text", placeholder: "Name" }), React.createElement("i", { "data-feather": "user" })),
        React.createElement("div", { className: "input" }, React.createElement("input", { id: "email", type: "email", placeholder: "Email" }), React.createElement("i", { "data-feather": "mail" })),
        React.createElement("button", { onClick: props.login }, "LET'S CHAT!"))));



};

//Conversation
var Conversation = function (_React$Component2) {_inherits(Conversation, _React$Component2);
  function Conversation(props) {_classCallCheck(this, Conversation);var _this2 = _possibleConstructorReturn(this, (Conversation.__proto__ || Object.getPrototypeOf(Conversation)).call(this,
    props));_this2.


    onChange = function () {
      if ($('.messageInput').val().length > 0) {
        $('#send-button').css({
          "background": "#fad0c4" });
      } else {
        $('#send-button').css({
          "background": "white" });
      }
    };return _this2;}_createClass(Conversation, [{ key: "render", value: function render()


    {return (
        React.createElement("div", { className: "Conversation" },
          React.createElement(Header, { name: "Public Chatroom" }),
          React.createElement("div", { className: "container" },
            React.createElement(Messages, { messages: this.props.messages, thisUser: this.props.thisUser })),

          React.createElement("input", {
            className: "messageInput",
            name: "message",
            type: "text",
            placeholder: "type something",
            onChange: this.onChange }),

          React.createElement("button", { id: "send-button", onClick: this.props.onSubmit },
            React.createElement("i", { "data-feather": "send" }))));



    } }]);return Conversation;}(React.Component);


//Profile
var Profile = function Profile(props) {
  var prevchats = props.prevChats.map(function (chat, i) {
    return React.createElement(PastChat, { lastText: chat.lastText, sender: chat.sender });
  });
  return (
    React.createElement("div", { className: "Profile" },
      React.createElement("div", { className: "top-half" },
        React.createElement("h1", null, props.thisUser ? props.thisUser.name : "", " "),
        React.createElement("p", { className: "email" }, props.thisUser ? props.thisUser.email : ""),
        React.createElement("img", { className: "profileImage main", src: props.profileImage }),
        React.createElement("div", { className: "icons" },
          React.createElement("a", { href: "#" }, React.createElement("i", { "data-feather": "alert-circle" })),
          React.createElement("a", { href: "#", className: "active" }, React.createElement("i", { "data-feather": "message-circle" })),
          React.createElement("a", { href: "#" }, React.createElement("i", { "data-feather": "home" })),
          React.createElement("a", { href: "#" }, React.createElement("i", { "data-feather": "activity" })))),


      React.createElement("div", { className: "prev-chats" }, prevchats)));


};

var PastChat = function PastChat(props) {
  return (
    React.createElement("div", { className: "prev-chat" },
      React.createElement("img", { className: "profileImage", src: props.sender.profileImage }),
      React.createElement("h2", null, props.sender.name),
      React.createElement("p", null, props.lastText)));


};

//Header
var Header = function Header(props) {
  return (
    React.createElement("header", null,
      React.createElement("i", { "data-feather": "chevron-left" }),
      React.createElement("div", { className: "name" }, props.name)));


};


//Messages
var Messages = function Messages(props) {
  var messages = [];
  for (var key in props.messages) {
    var message = props.messages[key];
    messages.push(
    React.createElement(Message, {
      message: message.message,
      sender: message.sender,
      thisUser: props.thisUser }));


  }

  return React.createElement("div", { className: "Messages" }, messages);
};

//Message
var Message = function Message(props) {
  var classNames = "";
  if (props.thisUser && props.sender.name == props.thisUser.name && props.sender.email == props.thisUser.email) {
    classNames = "Message you";
  } else {
    classNames = "Message them";
  }

  return (
    React.createElement("div", { className: classNames },
      React.createElement("span", null, props.message),
      React.createElement("p", null, props.sender.name)));


};

//Render
ReactDOM.render(React.createElement(App, null), document.getElementById("app"));

feather.replace();