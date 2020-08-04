/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/js";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([172,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(173);
module.exports = __webpack_require__(330);


/***/ }),

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(196);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(198)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 196:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(118)(false);
// Imports
exports.i(__webpack_require__(197), "");

// Module
exports.push([module.i, "body {\n    margin: 0;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n    monospace;\n}\n", ""]);



/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(19);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./node_modules/react-router/esm/react-router.js
var react_router = __webpack_require__(333);

// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 22 modules
var es = __webpack_require__(62);

// EXTERNAL MODULE: ./src/index.css
var src = __webpack_require__(195);

// EXTERNAL MODULE: ./node_modules/history/esm/history.js + 2 modules
var esm_history = __webpack_require__(43);

// CONCATENATED MODULE: ./src/history.js

const history_history = Object(esm_history["a" /* createBrowserHistory */])();
/* harmony default export */ var src_history = (history_history);
// EXTERNAL MODULE: ./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js + 2 modules
var redux_toolkit_esm = __webpack_require__(85);

// EXTERNAL MODULE: ./node_modules/redux-thunk/es/index.js
var redux_thunk_es = __webpack_require__(78);

// EXTERNAL MODULE: ./node_modules/redux/es/redux.js
var redux = __webpack_require__(30);

// CONCATENATED MODULE: ./src/utils/ResponseHandler.js
const ERROR_TYPE = {
  409: 'ConflictError',
  400: 'BadRequestError',
  422: 'UnprocessableError'
};
const ResponseHandler = {
  handleResponse: async response => {
    const json = await response.json();

    if (response.ok) {
      return json;
    }

    const error = Error(json.message ? json.message : response.status);
    const type = ERROR_TYPE[response.status] || 'CommonError';
    error.name = type;
    throw error;
  }
};
/* harmony default export */ var utils_ResponseHandler = (ResponseHandler);
// CONCATENATED MODULE: ./src/models/HelloModel.js

const log = {
  console
};
/* harmony default export */ var HelloModel = ({
  list(params = {}) {
    const url = `/api/hello?page=${params.page - 1}&size=${params.size}`;
    return fetch(url).then(response => response.json()).catch(err => log(err));
  },

  get(helloId) {
    const url = `/api/hello/${helloId}`;
    return fetch(url).then(utils_ResponseHandler.handleResponse);
  },

  add(params) {
    const url = '/api/hello';
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(params)
    }).then(utils_ResponseHandler.handleResponse);
  }

});
// CONCATENATED MODULE: ./src/features/appSlice.js


const {
  actions,
  reducer
} = Object(redux_toolkit_esm["b" /* createSlice */])({
  name: 'app',
  initialState: {
    greeting: '',
    greetings: [],
    pagination: {
      pageSize: 5,
      current: 1,
      total: 0
    },
    loading: false
  },
  reducers: {
    setGreeting: (state, {
      payload: greeting
    }) => ({ ...state,
      greeting
    }),
    setGreetings: (state, {
      payload: greetings
    }) => ({ ...state,
      greetings: [...greetings]
    }),
    setPagination: (state, {
      payload: {
        current,
        total,
        pageSize
      }
    }) => ({ ...state,
      pagination: { ...state.pagination,
        pageSize,
        current,
        total
      }
    }),
    setLoading: (state, {
      payload: loading
    }) => ({ ...state,
      loading
    })
  }
});
const {
  setGreeting,
  setGreetings,
  setPagination,
  setLoading
} = actions;
function getGreeting() {
  return async dispatch => {
    const {
      greetings
    } = await HelloModel.get(1);
    dispatch(setGreeting(greetings));
  };
}
function getGreetings() {
  return async (dispatch, getState) => {
    const {
      app: {
        pagination
      }
    } = getState();
    dispatch(setLoading(true)); // eslint-disable-next-line camelcase

    const {
      _embedded: {
        hello_list
      },
      page
    } = await HelloModel.list({
      size: pagination.pageSize,
      page: pagination.current
    });
    dispatch(setGreetings(hello_list));
    dispatch(setLoading(false));
    dispatch(setPagination({
      current: page.number + 1,
      total: page.total_elements,
      pageSize: pagination.pageSize
    }));
  };
}
function registerGreeting(values) {
  return async dispatch => {
    await HelloModel.add(values);
    dispatch(getGreetings());
  };
}
/* harmony default export */ var appSlice = (reducer);
// CONCATENATED MODULE: ./src/reducer.js


/* harmony default export */ var src_reducer = (Object(redux["c" /* combineReducers */])({
  app: appSlice
}));
// CONCATENATED MODULE: ./src/store.js




const store = Object(redux_toolkit_esm["a" /* configureStore */])({
  reducer: src_reducer,
  middleware: [redux_thunk_es["a" /* default */].withExtraArgument({
    history: src_history
  }), ...Object(redux_toolkit_esm["c" /* getDefaultMiddleware */])()]
});
/* harmony default export */ var src_store = (store);
// EXTERNAL MODULE: ./node_modules/antd/es/layout/index.js
var layout = __webpack_require__(332);

// CONCATENATED MODULE: ./src/components/MainLayout.js


const {
  Content,
  Footer
} = layout["a" /* default */];
function MainLayout({
  children
}) {
  return react_default.a.createElement(layout["a" /* default */], {
    style: {
      minHeight: '100vh'
    }
  }, react_default.a.createElement(Content, {
    style: {
      padding: '0 50px'
    }
  }, children), react_default.a.createElement(Footer, {
    style: {
      textAlign: 'center'
    }
  }, "Spring Boot, React Boilerplate \xA92020 Created by sogoagain"));
}
// EXTERNAL MODULE: ./node_modules/antd/es/result/index.js + 3 modules
var result = __webpack_require__(338);

// CONCATENATED MODULE: ./src/components/NotFound.js


function NotFound() {
  return react_default.a.createElement(result["a" /* default */], {
    status: "404",
    title: "404",
    subTitle: "Sorry, the page you visited does not exist."
  });
}
// EXTERNAL MODULE: ./node_modules/antd/es/form/index.js + 50 modules
var es_form = __webpack_require__(335);

// EXTERNAL MODULE: ./node_modules/@ant-design/icons/es/icons/SmileOutlined.js + 16 modules
var SmileOutlined = __webpack_require__(336);

// CONCATENATED MODULE: ./src/components/MainTitle.js



function MainTitle({
  title
}) {
  return react_default.a.createElement(result["a" /* default */], {
    icon: react_default.a.createElement(SmileOutlined["a" /* default */], null),
    title: title,
    subTitle: "Say Hello!"
  });
}
// EXTERNAL MODULE: ./node_modules/antd/es/input/index.js + 6 modules
var input = __webpack_require__(337);

// EXTERNAL MODULE: ./node_modules/antd/es/button/index.js + 6 modules
var es_button = __webpack_require__(39);

// CONCATENATED MODULE: ./src/components/GreetingForm.js


function GreetingForm({
  form,
  onSubmit
}) {
  return react_default.a.createElement(es_form["a" /* default */], {
    layout: "inline",
    form: form,
    onFinish: onSubmit,
    style: {
      marginBottom: '3em',
      flexWrap: 'wrap',
      textAlign: 'center',
      justifyContent: 'center'
    }
  }, react_default.a.createElement(es_form["a" /* default */].Item, {
    name: "greetings",
    label: "greetings",
    rules: [{
      required: true,
      message: 'Please enter the information'
    }],
    hasFeedback: true
  }, react_default.a.createElement(input["a" /* default */], null)), react_default.a.createElement(es_form["a" /* default */].Item, null, react_default.a.createElement(es_button["a" /* default */], {
    type: "primary",
    htmlType: "submit"
  }, "Submit")));
}
// EXTERNAL MODULE: ./node_modules/antd/es/table/index.js + 132 modules
var table = __webpack_require__(334);

// CONCATENATED MODULE: ./src/components/Greetings.js


function Greetings({
  greetings,
  loading,
  pagination,
  onChange
}) {
  return react_default.a.createElement(table["a" /* default */], {
    columns: [{
      title: 'ID',
      dataIndex: 'id'
    }, {
      title: 'GREETINGS',
      dataIndex: 'greetings'
    }],
    rowKey: "id",
    dataSource: greetings,
    loading: loading,
    pagination: pagination,
    onChange: onChange,
    scroll: {
      y: 'calc(45vh)'
    }
  });
}
// CONCATENATED MODULE: ./src/containers/HelloWorldContainer.js







function HelloWorldContainer() {
  const dispatch = Object(es["b" /* useDispatch */])();
  const {
    greeting,
    greetings,
    pagination,
    loading
  } = Object(es["c" /* useSelector */])(state => state.app);
  const [form] = es_form["a" /* default */].useForm();

  const handleSubmit = async values => {
    dispatch(registerGreeting(values));
    form.resetFields();
  };

  const handleChange = ({
    current,
    pageSize
  }) => {
    dispatch(setPagination({
      current,
      pageSize,
      total: pagination.total
    }));
    dispatch(getGreetings());
  };

  return react_default.a.createElement("div", null, react_default.a.createElement(MainTitle, {
    title: greeting
  }), react_default.a.createElement(GreetingForm, {
    form: form,
    onSubmit: handleSubmit
  }), react_default.a.createElement(Greetings, {
    greetings: greetings,
    loading: loading,
    pagination: { ...pagination,
      defaultCurrent: 1,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
    },
    onChange: handleChange
  }));
}
// CONCATENATED MODULE: ./src/pages/HelloWorldPage.js




function HelloWorldPage() {
  const dispatch = Object(es["b" /* useDispatch */])();
  Object(react["useEffect"])(() => {
    dispatch(getGreetings());
    dispatch(getGreeting());
  }, []);
  return react_default.a.createElement(HelloWorldContainer, null);
}
// CONCATENATED MODULE: ./src/App.js






function renderWithLayout(component) {
  return react_default.a.createElement(MainLayout, null, component);
}

const App = () => react_default.a.createElement(react_router["c" /* Switch */], null, react_default.a.createElement(react_router["a" /* Route */], {
  exact: true,
  path: "/",
  render: () => renderWithLayout(react_default.a.createElement(HelloWorldPage, null))
}), react_default.a.createElement(react_router["a" /* Route */], {
  path: "/404",
  render: () => renderWithLayout(react_default.a.createElement(NotFound, null))
}), react_default.a.createElement(react_router["a" /* Route */], {
  render: () => renderWithLayout(react_default.a.createElement(NotFound, null))
}));

/* harmony default export */ var src_App = (App);
// CONCATENATED MODULE: ./src/index.js








react_dom_default.a.render(react_default.a.createElement(react_router["b" /* Router */], {
  history: src_history
}, react_default.a.createElement(es["a" /* Provider */], {
  store: src_store
}, react_default.a.createElement(src_App, null))), document.getElementById('root'));

/***/ })

/******/ });